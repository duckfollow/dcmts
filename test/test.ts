import {
    checkDCMTKVersion,
    readDICOMMetadata,
    convertDICOMToPNG,
    convertJPGToDICOM,
    sendDICOMToPACS,
    sendUnCompressToPACS
  } from "../src/index";
  
  (async () => {
    try {
      console.log(await checkDCMTKVersion());
      console.log(await readDICOMMetadata("./test/CT000197.dcm"));
      console.log(await convertDICOMToPNG("./test/example.dcm", "./test/output.png"));
      console.log(await convertJPGToDICOM("./test/input1.jpg", "./test/output18.dcm", {
        PatientName: "Test CCCCXXXX",
        PatientID: "123465",
        PatientBirthDate: "19700102",
        PatientSex: "M",
        StudyInstanceUID: "1.2.3.4.5.6.7.10",
        StudyDate: "20250207",
        StudyTime: "120000",
        StudyDescription: "CT Head",
        SeriesInstanceUID: "1.2.3.4.5.6.7.18",
        SeriesDate: "20020628",
        SeriesDescription: "Brain Scan",
        Modality: "NM",
        BodyPartExamined: "HEAD",
        SOPInstanceUID: "1.2.3.4.5.6.7.10",
        InstanceNumber: "0",
        TransferSyntaxUID: "1.2.840.10008.1.2.1"
        // PhotometricInterpretation: "MONOCHROME2", //MONOCHROME2
        // "ScanningSequence": "GR",
      }));
      // console.log(await sendDICOMToPACS("localhost", "4242", "./test/output18.dcm"));
      console.log(await sendUnCompressToPACS("localhost", "4242", "./test/output18.dcm"));
    } catch (error) {
      console.error("Error:", error);
    }
  })();