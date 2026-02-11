import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDBmxQpQ-wsAd1RdYsPgNdxsfkmqaZ1OMs",
    authDomain: "alfesani-school.firebaseapp.com",
    projectId: "alfesani-school",
    storageBucket: "alfesani-school.firebasestorage.app",
    messagingSenderId: "26814206990",
    appId: "1:26814206990:web:5f45adc3d089d1a649585f",
    databaseURL: 'https://alfesani-school-default-rtdb.firebaseio.com',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);