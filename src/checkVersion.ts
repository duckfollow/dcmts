import { exec } from "child_process";

export const checkDCMTKVersion = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec("dcmdump --version", (error, stdout, stderr) => {
      if (error) reject(stderr);
      else resolve(stdout.trim());
    });
  });
};