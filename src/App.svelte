<script>
	import Header from './Header.svelte';
	import Stats from './Stats.svelte';
	import Footer from './Footer.svelte';
	const src = "../Grungy03-byGhostlyPixels.png" 
</script>


<main>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img src={src} alt="background image" />
	<Header />
	<Stats />
	<Footer />
</main>

<style>

img {
	position: absolute;
	z-index: -100;
	background-repeat: repeat-y;
  background-size: auto 100%;
}
</style>