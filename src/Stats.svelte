<script>
import { onMount } from 'svelte';
import { get, writable } from 'svelte/store';
import Card from './Team-Card.svelte';
import DivisionCard from './DivisionCard.svelte';
import Modal from './Modal.svelte';
import { each } from 'svelte/internal';

let modalIsOpen = false
let search
let teamName
let rank
let points
let id
let scroll
let standings = []

//Call the NHL API and put the response into localstorage as a JSON Object
async function fetchData(seasonEndDate = "2024-04-18"){
    
    console.log('Fetching data... ⏳');

    // const response = await fetch(`https://statsapi.web.nhl.com/api/v1/standings?hydrate=record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))&season=${selectedYear}`)
    const response = await fetch(`http://localhost:3000/api/nhl/standings/${seasonEndDate}`)

    const stats = await response.json()

    console.log('Data received: ✅');

    standings = stats.standings || []
    console.log()
}

fetchData()
 

    function onEvent(event, name, ranking, pointTally, logoId, season){
        if(event === "Enter" || event === "Click"){
            modalIsOpen = true
            teamName = name
            rank = ranking
            points = pointTally
            id = logoId
            season = season
        }
    }

</script>   

<svelte:window bind:scrollY={scroll}/>
<div class="search-box">
    <input class="search-bar" id="Search-bar" placeholder="Search for team" bind:value={search} type="search" name="search">
</div>

{#each standings as team }
    <DivisionCard>
        <h1 class="division-name">Division: {team.divisionName}</h1>
            {#if !search || team.teamName.default.toLowerCase().includes(search.toLowerCase())}
                <div  class="card-wrapper" on:click={(onEvent(
                        event = "Click",
                        teamName = team.teamName.default, 
                        // rank = team.leagueRank, 
                        // points = team.points, 
                        // id = team.team.id
                    ))}>
                    <Card>
                        <div tabindex="0" on:keydown={(event) => onEvent(
                            event.key,
                            teamName = team.teamName.default, 
                            // rank = team.leagueRank, 
                            // points = team.points, 
                            // id = team.team.id,
                            // season = division.division.season
                        )}> 
                            <img class="team-logo" src="https://assets.nhle.com/logos/nhl/svg/{team.teamAbbrev.default}_light.svg" alt="{team.teamName.default} Logo">
                            <h4>{team.teamName.default} | </h4>
                            <h4>Wins: {team.wins} | </h4>
                            <h4>Losses: {team.losses} | </h4>
                        </div>
                    </Card> 
                </div> 
            {/if}
    </DivisionCard> 
{/each}

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
    .team-logo{
        width: 3.5%;
        height: auto;
    }
    h4{
        display: inline-block;
        margin:0;
        padding: 0;
    }
</style>