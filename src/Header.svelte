<script>
    import { fly } from 'svelte/transition';
    export let themeEnabled;
    function switchTheme(){
		if(themeEnabled){
			themeEnabled = false
		}else {
        	themeEnabled = true;
    	}
	}
</script>
<div class="header">
    <h1>Odd stats</h1>

    {#if themeEnabled}
	    <i transition:fly="{{ y: 20, duration: 2000 }}" on:click={switchTheme} class="far fa-sun sun"></i>
    {:else}
	    <i transition:fly="{{ y: 20, duration: 2000 }}" on:click={switchTheme} class="far fa-moon moon"></i>
    {/if}
</div>

<style>

.sun{
    position: absolute; 
    display: flex;
    float:right;
    color: #69A197;
    font-size: 20px;
	}

.moon{
    position: absolute;
    display: flex;
    float:right;
    color: #E9CE2C;
    font-size: 20px;
}
</style>

