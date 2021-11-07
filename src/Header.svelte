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
    <div class='test'>
        {#if themeEnabled}
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

