<script>
    import { fly } from 'svelte/transition';
    import { themeEnabled } from './stores.js';
   
    // Toggle function for the light and dark mode
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
            <i transition:fly="{{ y: 20, duration: 500 }}" on:click={switchTheme} class="far fa-sun sun"></i>
        {:else}
            <i transition:fly="{{ y: 20, duration: 500 }}" on:click={switchTheme} class="far fa-moon moon"></i>
        {/if}
    </div>

</div>

<style>
.logo{
    margin: 0;
    padding-right: 50px;
    color:white;
    font-family: 'Pacifico', cursive;
    padding: 10px;
    margin-left: 20px;
    margin-right: 50px;
}
.button-wrapper{
    display:flex;
    justify-content:center;
    align-items:center;
}
.header{
    display: inline-flex;
    background:#1985A1;
    width: 100%;
    border-bottom: 1px solid #272729;
}
.sun{
    display: inline-flex;
    float:right;
    color: #E9CE2C;
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

