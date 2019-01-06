import CryptoJS from "crypto-js";
import {
  password
} from "../../private/cryptoPassword";

const keySize = 256;
const iterations = 100;

function encrypt(msg) {
  const salt = CryptoJS.lib.WordArray.random(128 / 8);
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: keySize / 32,
    iterations
  });
  const iv = CryptoJS.lib.WordArray.random(128 / 8);
  const encrypted = CryptoJS.AES.encrypt(msg, key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  const transitmessage = salt.toString() + iv.toString() + encrypted.toString();
  return transitmessage;
}

function decrypt(transitmessage) {
  const salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
  const iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
  const encrypted = transitmessage.substring(64);
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: keySize / 32,
    iterations
  });
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
  return decryptedString;
}

function encryptData(object) {
  let encryptedData = {};
  for (const key of Object.keys(object)) {
    if (key.charAt(0) !== "_") {
      encryptedData[key] = encrypt(object[key]);
    } else {
      encryptedData[key] = object[key];
    }
  }
  return encryptedData;
}

function decryptData(obj) {
  // let decryption = array.map(obj => {
  let decryptedData = {};
  for (const key of Object.keys(obj)) {
    if (key.charAt(0) !== "_" && key.charAt(0) !== ".") {
      decryptedData[key] = decrypt(obj[key]);
    } else if (key === "_tasks") {
      continue;
    } else {
      decryptedData[key] = obj[key];
    }
  }
  return decryptedData;
  // });
  // return decryption;
}

// Recursion for nested data
export const decryptObject = (object, childObjectNamesArray) => {
  let obj = decryptData(object);
  let decryptedSubObject = {};
  childObjectNamesArray.forEach(name => {
    if (object.hasOwnProperty(name)) {
      const subObject = object[name];
      for (const key of Object.keys(subObject)) {
        decryptedSubObject[key] = decryptObject(subObject[key], childObjectNamesArray);
      }
      obj[name] = decryptedSubObject;
    }
  })
  return obj;
};

export {
  encrypt,
  encryptData,
  decrypt,
  decryptData
};