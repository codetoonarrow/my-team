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
	min-height: 100%;
  	min-width: 1024px;
	width: 100%;
  	height: auto;
 	top: 0;
  	left: 0;
}
</style>