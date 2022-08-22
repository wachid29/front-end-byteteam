import CryptoJS from "crypto-js";

export const encryptData = (data) => {
	return CryptoJS.AES.encrypt(JSON.stringify(data), "byte-ticketing").toString();
};

export const decryptData = (ciphertext) => {
	return JSON.parse(CryptoJS.AES.decrypt(ciphertext, "byte-ticketing").toString(CryptoJS.enc.Utf8));
};
