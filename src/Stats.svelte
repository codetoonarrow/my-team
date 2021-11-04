<script>

import Card from './Team-Card.svelte';
import DivisionCard from './DivisionCard.svelte';
import { fade, fly } from 'svelte/transition';
let themeEnabled;

let stats = getStats();
let search;

   async function getStats(){
        const res = await fetch("https://statsapi.web.nhl.com/api/v1/standings?hydrate=record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))&season=20212022&site=en_nhl")
        const stats = await res.json();
        return stats;
    }


// When in darkmode:
//Switch the CSS class of DivisionCard and Team-Card to darkmode
function switchTheme(){
		if(themeEnabled){
			themeEnabled = false
		}else {
        	themeEnabled = true;
    	}
	}
</script>

{#if themeEnabled}
	<i transition:fly="{{ y: 20, duration: 2000 }}" on:click={switchTheme} class="far fa-sun sun"></i>
{:else}
	<i transition:fly="{{ y: 20, duration: 2000 }}" on:click={switchTheme} class="far fa-moon moon"></i>
{/if}

<input class="search-bar" bind:value={search} type="text">
    

{#await stats}
    loading
{:then response}

     {#each response.records as division}
        <DivisionCard bind:themeEnabled >
            <h1>Division: {division.division.name}</h1>
            {#each division.teamRecords as team ,i}
                {#if !search || team.team.name.toLowerCase().includes(search.toLowerCase())}
                    <div transition:fade>
                        <Card bind:themeEnabled>
                        Team: {team.team.name}
                        Wins: {team.leagueRecord.wins}
                        Losses: {team.leagueRecord.losses}
                        OT: {team.leagueRecord.ot}
                        </Card>
                    </div>
                    <br> 
                {/if}
            {/each}
        </DivisionCard> 
     {/each}
{/await}

<style>
    .search-bar {
        display:flexbox;
        float:inline-end;
    }

	.sun{
		position: absolute; 
		color: #69A197;
		font-size: 20px;
	}

    .moon{
		position: absolute;
		color: #E9CE2C;
		font-size: 20px;
	}
</style>