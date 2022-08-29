// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAld0z5ude__QZF932uFpSnPgkYbqxb3Sw",
	authDomain: "test-database-82bb1.firebaseapp.com",
	databaseURL: "https://test-database-82bb1-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "test-database-82bb1",
	storageBucket: "test-database-82bb1.appspot.com",
	messagingSenderId: "22316489493",
	appId: "1:22316489493:web:4b26c8a6b3b2d5aad8671c",
	measurementId: "G-B1NW63JSF0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const database = getDatabase(app);

export { database };
