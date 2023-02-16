//Comando de consola para instalar la libreria crypto:
// npm install crypto -save //o si no funciona: npm install crypto --save


const crypto = require('crypto');//Import del crypto module
const algorithm = 'aes-256-cbc'; //Using AES encryption

 //key de 32 bytes
const keyValue = 'key-ultra-segura-proyectoTVersus'
const key = keyValue;

//funcion a la que pasada una string la encripta usando aes-256-cbc
function encrypt(text) {
   let iv = crypto.randomBytes(16); //random gen key de 16 bytes
   let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
   let encrypted = cipher.update(text);

   encrypted = Buffer.concat([encrypted, cipher.final()]);

   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

//funcion que a partir de un iv i una string encriptada..
//devuelve una variable del tipo que usa la funcion "decrypt()"
function convert(iv, encrypted){
   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

//funcion que desencripta dada la salida de la funcion encrypt
function decrypt(text) {
   let iv = Buffer.from(text.iv, 'hex');
   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
   let decrypted = decipher.update(encryptedText);

   decrypted = Buffer.concat([decrypted, decipher.final()]);

   return decrypted.toString();
}

//// EJEMPLO DE USO
////   |       |
////   V       V
//var string = "No se, una frase random cualquiera"
//var encrypted = encrypt(string)
//
////resultado de encriptar
//console.log("Resultado de encriptar > ")
//console.log(encrypted)
//
////conseguir solo el iv
//console.log("\nPara conseguir el iv > ")
//var ivTest = encrypted.iv;
//console.log(ivTest)
//
////conseguir solo la string encriptada
//console.log("\nPara conseguir la string encriptada > ")
//var encryptedDataTest = encrypted.encryptedData
//console.log(encryptedDataTest)
//
////a partir de un iv y sus datos encriptados,
////conseguir una variable del tipo que usa la funcion "decrypt()" 
//var converted = convert(ivTest, encryptedDataTest)
//
////desencriptar
//console.log("\nDesencriptar > ")
//var decryptedString = decrypt(converted)
//console.log(decryptedString)