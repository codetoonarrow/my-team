<script>
import Card from './Team-Card.svelte';
import DivisionCard from './DivisionCard.svelte';
import Modal from './Modal.svelte';

let stats = getStats()
let modalIsOpen = false
let search
let teamName
let rank
let points
let id

// https://statsapi.web.nhl.com/api/v1/schedule?season=20212022
// API for past schedule
// Loop over the dates compare the home and away score
// Return the winner

   async function getStats(){
        const res = await fetch("https://statsapi.web.nhl.com/api/v1/standings?hydrate=record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))&season=20212022&site=en_nhl")
        const stats = await res.json();
        return stats;
    }

    function closeModal(){
        modalIsOpen = false
    }

    function handleClick(name, ranking, pointTally, logoId){
        modalIsOpen = true
        teamName = name
        rank = ranking
        points = pointTally
        id = logoId
    }

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
                    <div  class="card-wrapper" on:click={(handleClick(
                            teamName = team.team.name, 
                            rank = team.leagueRank, 
                            points = team.points, 
                            id = team.team.id
                        ))}>
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
{#if modalIsOpen}
<Modal on:close={closeModal} teamName={teamName} rank={rank} points={points} id={id}/>  
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