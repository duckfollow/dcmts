import { exec } from "child_process";

export const readDICOMMetadata = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(`dcmdump ${filePath}`, (error, stdout, stderr) => {
      if (error) reject(stderr);
      else resolve(stdout);
    });
  });
};