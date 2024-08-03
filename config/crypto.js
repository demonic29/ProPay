
// ----------- encrypt the data ----------- 
const CrystoJs = require("crypto-js");

const secretKey = "2981999";
const data = {id:123, name : "alex"}

// Encrypt
const cipherText = CrystoJs.AES.encrypt(JSON.stringify(data), secretKey).toString();

// Decrypt (for testing)
const bytes = CrystoJs.AES.decrypt(cipherText, secretKey);
const decryptData = JSON.parse(bytes.toString(CrystoJs.enc.Utf8));

console.log(cipherText);
console.log(decryptData)

// ----------- generate Qrcode ----------- 
const QRCODE = require('qrcode');

QRCODE.toDataURL(cipherText, function(err, url){
    if(err) console.error(err);
    console.log(url);
})