<script>
	import Header from './Header.svelte';
	import Stats from './Stats.svelte';
	import Footer from './Footer.svelte';
	const src = "../Grungy03-byGhostlyPixels.png" 
</script>


<main>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<div class="container">
		<img src={src} alt="background image" />
		<Header />
		<Stats />
		<Footer />
	</div>
</main>

<style>
.container {
	position: relative;
 	min-height: 100vh;
}
img {
	position: absolute;
	z-index: -100;
	background-repeat: repeat-y;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-size: cover;
}
</style>