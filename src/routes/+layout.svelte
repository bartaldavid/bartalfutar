<script lang="ts">
	import { browser } from '$app/environment';
	import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';
	import FirebaseUi from '../components/FirebaseUI.svelte';
	import '../app.css';
	import { onMount } from 'svelte';
	import { user } from '../data/stores';
	import { signInAnonymously } from 'firebase/auth';
	import { auth } from '../util/firebaseSetup';
	import migrate from '../util/migrateToFirebase';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	onMount(async () => {
		if (!$user) {
			await signInAnonymously(auth);
		}
		await migrate();
	});
</script>

<QueryClientProvider client={queryClient}>
	<FirebaseUi />
	<main class="flex flex-row flex-wrap justify-center gap-4 bg-slate-900">
		<slot />
	</main>
</QueryClientProvider>
