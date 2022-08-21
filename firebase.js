// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAZ4u4TdvkwPuhJcKejZlSWr1MI3384Cns",
	authDomain: "realtime-database-byte.firebaseapp.com",
	databaseURL: "https://realtime-database-byte-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "realtime-database-byte",
	storageBucket: "realtime-database-byte.appspot.com",
	messagingSenderId: "43674647260",
	appId: "1:43674647260:web:28214fd8750f72add11219",
	measurementId: "G-D8RVD2LDTH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };
