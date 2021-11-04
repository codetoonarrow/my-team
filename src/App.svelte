<script>
	import Stats from './Stats.svelte';
	import { fly } from 'svelte/transition';
	let theme = false

	function switchTheme(){
		if(theme){
			theme = false
		}else {
        theme = true;
    	}
	}
</script>

{#if theme}
	<i transition:fly="{{ y: 20, duration: 2000 }}" on:click={switchTheme} class="far fa-sun light"></i>
{:else}
	<i transition:fly="{{ y: 20, duration: 2000 }}" on:click={switchTheme} class="far fa-moon dark"></i>
{/if}




<main>
	<Stats />
</main>


<style>
	.dark{
		position: absolute; 
		color: blue;
		font-size: 20px;
	}
	.light{
		position: absolute;
		color: orange;
		font-size: 20px;
	}
</style>
