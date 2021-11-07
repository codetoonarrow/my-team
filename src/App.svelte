<script>
	import Header from './Header.svelte';
	import Stats from './Stats.svelte';
	let themeEnabled;
</script>


<main>
	<Header />
	<Stats bind:themeEnabled/>
</main>

