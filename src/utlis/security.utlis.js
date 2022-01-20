import CryptoJS from "crypto-js";
import { config } from "./constants";

export const encyption = (body) => {
  return CryptoJS.AES.encrypt(JSON.stringify(body), config.ENCRYPTION_KEY).toString();
};

export const decryption = (body) => {
  const bytes = CryptoJS.AES.decrypt(body, config.ENCRYPTION_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
