<script>
    import { fly } from 'svelte/transition';
    import { themeEnabled } from './stores.js';
  
    function switchTheme(){
		if($themeEnabled){
			$themeEnabled = false
            console.log("false")
		}else {
        	$themeEnabled = true;
            console.log("true")
    	}
	}

</script>

<div class="header">
    <h1 class="logo">Odd stats</h1>
    <div class='test'>
        {#if $themeEnabled}
            <i transition:fly="{{ y: 20, duration: 2000 }}" on:click={switchTheme} class="far fa-sun sun"></i>
        {:else}
            <i transition:fly="{{ y: 20, duration: 2000 }}" on:click={switchTheme} class="far fa-moon moon"></i>
        {/if}
    </div>
</div>

<style>
.header{
    display: inline-flex;
}

.sun{
    display: inline-flex;
    float:right;
    color: #69A197;
    font-size: 20px;
	}

.moon{
    
    display: inline-flex;
    float:right;
    color: #E9CE2C;
    font-size: 20px;
}
</style>

