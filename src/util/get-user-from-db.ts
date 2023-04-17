import type { User } from 'firebase/auth';
// import localforage from 'localforage';

export async function getUserFromIndexedDB(): Promise<User | null> {
	if (!indexedDB) {
		console.log("This browser doesn't support IndexedDB.");
		return null;
	}
	// const localUser = await localforage.getItem('firebaseLocalStorageDb');
	// console.log('User from localstorage', localUser);
	const fbLocalStorage = indexedDB.open('firebaseLocalStorageDb');
	fbLocalStorage.onsuccess = function () {
		const db = this.result;
		const transaction = db.transaction(['firebaseLocalStorage'], 'readonly');
		const objectStore = transaction.objectStore('firebaseLocalStorage');
		objectStore.getAll().onsuccess = function () {
			const userData = this.result[0].value as User;
			console.log('User from localstorage', userData);
			return userData;
		};
		objectStore.getAll().onerror = function () {
			console.log('Error getting user from localstorage');
		};
	};
	return null;
}
