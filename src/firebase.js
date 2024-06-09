import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const config = {
    apiKey: "AIzaSyAIId2ByN9c0RX9_R71EbJJoV-lB1RDADc",
    authDomain: "test-technique-beeldi.firebaseapp.com",
    databaseURL: "https://test-technique-beeldi.firebaseio.com",
    projectId: "test-technique-beeldi",
    storageBucket: "test-technique-beeldi.appspot.com",
    messagingSenderId: "937748581892"
};
const app = initializeApp(config);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);