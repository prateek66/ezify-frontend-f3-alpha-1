import env from "react-dotenv";
import CryptoJS from "crypto-js";

export const encyption = (body) => {
  return CryptoJS.AES.encrypt(JSON.stringify(body), env.ENCRYPTION_KEY).toString();
};

export const decryption = (body) => {
  const bytes = CryptoJS.AES.decrypt(body, env.ENCRYPTION_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
