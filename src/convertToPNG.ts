import { exec } from "child_process";

export const convertDICOMToPNG = (inputFile: string, outputFile: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(`dcm2pnm +on ${inputFile} ${outputFile}`, (error, stdout, stderr) => {
      if (error) reject(stderr);
      else resolve(`Converted to: ${outputFile}`);
    });
  });
};