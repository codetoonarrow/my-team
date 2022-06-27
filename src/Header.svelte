<script>
    import { fly } from 'svelte/transition';
    import { themeEnabled } from './stores.js';
    import LeagueButton from './League-Button.svelte';
   
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
    <div class='button-wrapper'>
        {#if $themeEnabled}
            <i transition:fly="{{ y: 20, duration: 2000 }}" on:click={switchTheme} class="far fa-sun sun"></i>
        {:else}
            <i transition:fly="{{ y: 20, duration: 2000 }}" on:click={switchTheme} class="far fa-moon moon"></i>
        {/if}
    </div>
    <LeagueButton />
</div>

<style>
.logo{
    margin: 0;
    padding-right: 50px;
    color:white;
}
.button-wrapper{
    display:flex;
    justify-content:center;
    align-items:center;
}
.header{
    display: inline-flex;
}
.sun{
    display: inline-flex;
    float:right;
    color: #69A197;
    font-size: 20px;
    position: absolute;
	}
.moon{
    display: inline-flex;
    float:right;
    color: #E9CE2C;
    font-size: 20px;
    position: absolute;
}
</style>

