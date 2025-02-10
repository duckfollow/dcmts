import {
    checkDCMTKVersion,
    readDICOMMetadata,
    convertDICOMToPNG,
    convertJPGToDICOM,
    sendDICOMToPACS
  } from "../src/index";
  
  (async () => {
    try {
      console.log(await checkDCMTKVersion());
      console.log(await readDICOMMetadata("./test/example.dcm"));
      console.log(await convertDICOMToPNG("./test/example.dcm", "./test/output.png"));
      console.log(await convertJPGToDICOM("./test/input.jpg", "./test/output.dcm", { PatientName: "John^Doe" }));
      // console.log(await sendDICOMToPACS("192.168.1.100", "104", "./test/example.dcm"));
    } catch (error) {
      console.error("Error:", error);
    }
  })();