import { exec } from "child_process";

export const sendDICOMToPACS = (
  serverIP: string,
  port: string,
  filePath: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(`storescu ${serverIP} ${port} ${filePath}`, (error, stdout, stderr) => {
      if (error) reject(stderr);
      else resolve(`File sent to PACS: ${serverIP}:${port}`);
    });
  });
};

export const sendUnCompressToPACS = async (
  serverIP: string,
  port: string,
  filePath: string
): Promise<void> => {
  try {
    // Step 1: Uncompress the DICOM file
    console.log("🔄 Uncompressing DICOM file...");
    await execPromise(`dcmdjpeg ${filePath} uncompressed_new.dcm`);
    console.log("✅ Uncompressed: uncompressed_new.dcm");

    // Step 2: Send to PACS
    console.log("📤 Sending file to PACS...");
    await execPromise(`storescu -v -aet TEST_AET -aec ORTHANC ${serverIP} ${port} uncompressed_new.dcm`);
    console.log(`✅ File sent to PACS at ${serverIP}:${port}`);

    // Step 3: Delete temporary file
    console.log("🗑️ Deleting temporary file...");
    await execPromise(`rm -rf uncompressed_new.dcm`);
    console.log("✅ Temporary file deleted");

  } catch (error) {
    console.error("❌ Error:", error);
  }
};

// Utility function to handle exec as a Promise
const execPromise = (command: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || stdout || "Unknown error");
      } else {
        resolve();
      }
    });
  });
};