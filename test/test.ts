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
      console.log(await convertJPGToDICOM("./test/input.jpg", "./test/output.dcm", {
        PatientName: "John Test",
        PatientID: "123456",
        PatientBirthDate: "19700101",
        PatientSex: "M",
        StudyInstanceUID: "1.2.3.4.5.6.7.8",
        StudyDate: "20250207",
        StudyTime: "120000",
        StudyDescription: "CT Head",
        SeriesInstanceUID: "1.2.3.4.5.6.7.9",
        SeriesDate: "20020628",
        SeriesDescription: "Brain Scan",
        Modality: "CT",
        BodyPartExamined: "HEAD",
        SOPInstanceUID: "1.2.3.4.5.6.7.10",
        // PhotometricInterpretation: "RGB", //MONOCHROME2
        // "ScanningSequence": "GR",
      }));
      // console.log(await sendDICOMToPACS("192.168.1.100", "104", "./test/example.dcm"));
    } catch (error) {
      console.error("Error:", error);
    }
  })();