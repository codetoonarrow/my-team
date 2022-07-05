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
let scroll


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

<svelte:window bind:scrollY={scroll}/>
<div class="search-box">
    <input class="search-bar" placeholder="Search for team" bind:value={search} type="text">
</div>
{#await stats}
    loading
{:then response}

     {#each response.records as division}
        <DivisionCard>
            <h1 class="division-name">Division: {division.division.name}</h1>
            {#each division.teamRecords as team}
                {#if !search || team.team.name.toLowerCase().includes(search.toLowerCase())}
                    <div  class="card-wrapper" on:click={(handleClick(
                            teamName = team.team.name, 
                            rank = team.leagueRank, 
                            points = team.points, 
                            id = team.team.id
                        ))}>
                        <Card>
                            <h4>{team.team.name}</h4>
                            <h4>Wins: {team.leagueRecord.wins} | </h4>
                            <h4>Losses: {team.leagueRecord.losses} | </h4>
                            <h4>OT: {team.leagueRecord.ot}</h4>
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
    .search-box{
        text-align: center;
    }
    .division-name{
        margin-left: 20px;
    }
    .search-bar{
        display: block;
        margin : 0 auto;
        width: 584px;
        height: 44px;
        border-radius: 25px;
        margin-top: 100px;
        margin-bottom: 100px;
    }
    .card-wrapper{
        cursor:pointer;
    }
    h4{
        display: inline-block;
        margin:0;
        padding: 0;
    }
</style>