<script>
import Card from './Team-Card.svelte';
import DivisionCard from './DivisionCard.svelte';
import Modal from './Modal.svelte';
import { fade } from 'svelte/transition';

let stats = getStats();
let modalToggle = false;

let search;

   async function getStats(){
        const res = await fetch("https://statsapi.web.nhl.com/api/v1/standings?hydrate=record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))&season=20212022&site=en_nhl")
        const stats = await res.json();
        return stats;
    }
    function handleClick(){
        console.log("I was clicked!")
    }


// On line item that is clicked:
    // Open Modal componentent and fade the background out
    // Modal Card for now will just show the teams name, add more stats later
</script>

<input class="search-bar" bind:value={search} type="text">
    
{#await stats}
    loading
{:then response}

     {#each response.records as division}
        <DivisionCard>
            <h1>Division: {division.division.name}</h1>
            {#each division.teamRecords as team}
                {#if !search || team.team.name.toLowerCase().includes(search.toLowerCase())}
                    <div  class="card-wrapper" on:click={handleClick} transition:fade>
                        <Card>
                        {team.team.name}
                        Wins: {team.leagueRecord.wins}
                        Losses: {team.leagueRecord.losses}
                        OT: {team.leagueRecord.ot}
                        </Card>
                    </div>
                    
                {/if}
            {/each}
        </DivisionCard> 
     {/each}
{/await}

{#if modalToggle}
     <Modal />
{/if}

<style>
    .search-bar {
        display:flex;
        float:inline-end;
    }
    .card-wrapper{
        cursor:pointer;
    }
</style>