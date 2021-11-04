<script>
import Card from './Team-Card.svelte';
import DivisionCard from './DivisionCard.svelte';
import { fade } from 'svelte/transition';
let checkBoxStatus = false;

let stats = getStats();
let search;

   async function getStats(){
        const res = await fetch("https://statsapi.web.nhl.com/api/v1/standings?hydrate=record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))&season=20212022&site=en_nhl")
        const stats = await res.json();
        return stats;
    }


// When the checkbox is checked check to see what  
function isChecked(){
    if(checkBoxStatus){
        checkBoxStatus = false;
    }else {
        checkBoxStatus = true;
    }
}
</script>
<input class="search-bar" bind:value={search} type="text">
    
    {#if checkBoxStatus === true}
         <h1>I am checked</h1>
    {/if}
{#await stats}
    loading
{:then response}

     {#each response.records as division}
        <DivisionCard>
            <h1>Division: {division.division.name}</h1>
            {#each division.teamRecords as team ,i}
                {#if !search || team.team.name.toLowerCase().includes(search.toLowerCase())}
                    <div transition:fade>
                        <Card>
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
</style>