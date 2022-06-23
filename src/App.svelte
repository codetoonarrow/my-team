<script>
	import Header from './Header.svelte';
	import Stats from './Stats.svelte';
	import Footer from './Footer.svelte';
</script>


<main>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img src="../Grungy03-byGhostlyPixels.png" alt="background image" />
	<Header />
	<Stats />
	<Footer />
</main>

<style>

img {
	position: absolute;
	z-index: -100;
	width: 100vw;	
	
}
</style>