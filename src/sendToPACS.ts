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