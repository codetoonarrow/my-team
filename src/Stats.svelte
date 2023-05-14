<script>
// https://statsapi.web.nhl.com/api/v1/schedule?season=20212022
// API for past schedule
import { onMount } from 'svelte';
import { get, writable } from 'svelte/store';
import Card from './Team-Card.svelte';
import DivisionCard from './DivisionCard.svelte';
import Modal from './Modal.svelte';
import Showcase from './Showcase.svelte';
import { each } from 'svelte/internal';
import Puck from './Puck.svelte';

let modalIsOpen = false
let search
let teamName
let rank
let points
let id
let scroll
let stats = []
let years = [2018, 2019, 2020, 2021]
let selectedYear 

//Call the NHL API and put the response into localstorage as a JSON Object
async function fetchData(selectedYear = 20152016){
    
    console.log('Fetching data... ⏳');

    const response = await fetch(`https://statsapi.web.nhl.com/api/v1/standings?hydrate=record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))&season=${selectedYear}`)
    const stats = await response.json()

    console.log('Data received: ✅', stats);

    localStorage.setItem('stats', JSON.stringify(stats))
    console.log('Stats set:', stats);
}

// When the site loads check to make sure that the localstorage is not stale data or doubling up
onMount(async () => {
    const storedData = localStorage.getItem('stats')
    console.log()
    if (storedData) {
        fetchData()
        stats = JSON.parse(storedData)
    } else {

        await fetchData()
    }
})

function getStats(){
    let statsArray = []

    Object.keys(localStorage).forEach(function(key){
        if(key.startsWith('api_call_')){
            let apiCall = JSON.parse(localStorage.getItem(key))
            statsArray.push({
                endpoint: apiCall.endpoint,
                timestamp: apiCall.timestamp,
                responseTime: apiCall.responseTime
            })
        }
    })
    return statsArray
}
const statsArray = JSON.parse(localStorage.getItem('stats'));
getStats()
// const statsArray = getStats()
// localStorage.setItem('stats', JSON.stringify(statsArray))
// console.log(localStorage)
//    async function getStats(){
//         const res = await fetch("https://statsapi.web.nhl.com/api/v1/standings?hydrate=record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))&season=20212022&site=en_nhl")
//         const stats = await res.json();
//         return stats;
//     }

    let teamIds = []
    function getTeamIds(stats){
        for(let i = 0; i < stats.records.length; i++){
            for(let j = 0; j < stats.records[i].teamRecords.length; j++){
                const teamId = stats.records[i].teamRecords[j].team.id;
            if(!teamIds.includes(teamId)){
                teamIds.push(teamId);
            }
            }
        }
        return teamIds
    }

    async function generateRandomid(){
        const stats = JSON.parse(localStorage.getItem('stats'));
        const teamIds = getTeamIds(stats)
        const randomNumber = Math.floor(Math.random() * teamIds.length);
        const randomTeamID = teamIds[randomNumber]
        return randomTeamID
    }

    let result = writable(null);

        generateRandomid().then((randomTeamId) =>{
            result.set(randomTeamId) 
    })
     
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

<!-- {#if $result !== null}
    <Showcase>{$result}</Showcase>    
{/if} -->

<svelte:window bind:scrollY={scroll}/>
<div class="search-box">
    <label for="Search-Bar">Search</label>
    <input class="search-bar" id="Search-bar" placeholder="Search for team" bind:value={search} type="search" name="search">
</div>

    <select name="Year Select Dropdown" id="year-select" bind:value={selectedYear} on:change={(event) => fetchData(event.target.value) }>
        {#each years as year }
            <option value="{year}">{year}</option>
        {/each}
    </select>


{#await statsArray}
    loading
{:then response}

     {#each response.records as division}
        {#key selectedYear}
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
                                <img class="team-logo" src="https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/{team.team.id}.svg" alt="{teamName} Logo">
                                <h4>{team.team.name}</h4>
                                <h4>Wins: {team.leagueRecord.wins} | </h4>
                                <h4>Losses: {team.leagueRecord.losses} | </h4>
                                <h4>OT: {team.leagueRecord.ot}</h4>
                            </Card> 
                        </div>
                    {/if}
                {/each}
            </DivisionCard> 
        {/key}
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