import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import FormData from 'form-data';

// ตั้งค่า URL ของ DICOMweb STOW-RS
const dicomWebUrl: string = 'http://localhost:8042/dicom-web/studies';

// อ่านไฟล์ DICOM
const dicomFilePath: string = '/Users/tankps/Documents/project-github/dcmts/uncompressed_new.dcm';

const dicomFile = fs.createReadStream(dicomFilePath);


// สร้าง FormData สำหรับส่งไฟล์
const form = new FormData();
form.append('file', dicomFile, { filename: 'file.dcm' });

// กำหนด headers
const headers: Record<string, string> = {
  ...form.getHeaders(),
  'Accept': 'application/json',
  'Authorization': 'Basic ' + Buffer.from('orthanc:orthanc').toString('base64')
};

// ส่งคำขอ STOW-RS
axios.post(dicomWebUrl, form, { headers })
  .then((response: AxiosResponse) => {
    console.log('DICOM file uploaded:', response.status, response.data);
  })
  .catch((error: Error) => {
    console.error('Error uploading DICOM file:', error.message);
  });