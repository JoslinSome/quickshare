import CryptoJS from 'crypto-js';
import {secretKey} from '../config/config';

export function encrypt(plainText) {
  return CryptoJS.AES.encrypt(plainText, secretKey).toString();
}

export function decrypt(cipherText) {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
