import localforage from 'localforage';
import type { savedStop } from './client/savedStop';

const LF_STORE_NAME = 'bartalfutar-stops';

export async function saveStopsToLf(stops: savedStop[]) {
	await localforage.setItem(LF_STORE_NAME, stops);
}

export async function getStopsFromLf(): Promise<savedStop[]> {
	const stops = await localforage.getItem<savedStop[]>(LF_STORE_NAME);
	return stops || [];
}
