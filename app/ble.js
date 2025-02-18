const bleno = require('bleno');

const SERVICE_UUID = '12345678-1234-5678-1234-56789abcdef0';

bleno.on('stateChange', (state) => {
  if (state === 'poweredOn') {
    console.log("Starting BLE Advertising...");
    
    // ส่งข้อมูลออกแบบ Public Broadcast (ไม่มี Connection)
    bleno.startAdvertising("RaspberryPiBLE", [SERVICE_UUID]);
    
  } else {
    bleno.stopAdvertising();
    console.log("Bluetooth is off.");
  }
});

// ส่งข้อมูลใหม่ทุก 5 วินาที
setInterval(() => {
  const message = `Time: ${new Date().toLocaleTimeString()}`;
  console.log("Broadcasting:", message);

  bleno.stopAdvertising(() => {
    bleno.startAdvertising("RPi BLE", [SERVICE_UUID]);
  });
}, 5000);