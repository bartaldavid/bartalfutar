const firebaseConfig = {
	apiKey: 'AIzaSyD4remIrEwAp6iri5_uKQHmumgCsNoJJ8I',
	authDomain: 'bkk-svelte.firebaseapp.com',
	projectId: 'bkk-svelte',
	storageBucket: 'bkk-svelte.appspot.com',
	messagingSenderId: '656596007531',
	appId: '1:656596007531:web:5c79965bc76bb9a6168f2e',
	measurementId: 'G-1XG2KFL1H5'
};

// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
// const db = initializeFirestore(app, {
//   localCache: persistentLocalCache({
//     tabManager: persistentSingleTabManager({}),
//   }),
// });
export { auth, db };
