import { exec } from "child_process";

export const convertJPGToDICOM = (
  inputFile: string,
  outputFile: string,
  tags: Record<string, string> = {}
): Promise<string> => {
  return new Promise((resolve, reject) => {
    let tagParams = Object.entries(tags)
      .map(([key, value]) => `-k "${key}=${value}"`)
      .join(" ");

    let command = `img2dcm ${tagParams} ${inputFile} ${outputFile}`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) reject(stderr);
      else resolve(`DICOM file created: ${outputFile}`);
    });
  });
};