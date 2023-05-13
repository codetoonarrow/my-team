<script>
 
    import Chart from './Chart.svelte';
    import { onMount, onDestroy, afterUpdate } from 'svelte';
    import { writable } from 'svelte/store';
    import { fly, fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    export let teamName;
    export let id;
    export let rank;
    export let points;
    let gameResults = [];

    let wins = getWins();
    let yAxis = 0
    let selectedYear = 2018
    let items = [2018, 2019, 2020, 2021]
    let datesArray = [0]

    async function getWins(combinedSeasonYear = 20212022){
        const res = await fetch(`https://statsapi.web.nhl.com/api/v1/schedule?season=${combinedSeasonYear}`)
        const wins = await res.json()
        const results = wins.dates
        gameResults = []
        yAxis = 0
        for (let i = 0; i  < results.length; i++){
            let obj = results[i].games
            for (let j = 0; j < obj.length; j++){
                if (obj[j].teams.home.team.id === id && obj[j].teams.home.score > obj[j].teams.away.score || obj[j].teams.away.team.id === id && obj[j].teams.away.score > obj[j].teams.home.score) {
                    updateOutcome("WIN")
                }else if (obj[j].teams.home.team.id === id && obj[j].teams.home.score < obj[j].teams.away.score || obj[j].teams.away.team.id === id && obj[j].teams.away.score < obj[j].teams.home.score){
                    updateOutcome("LOSS")
                }
            }
        }
    }

    // The NHL API requires that if a season is to be returned it needs to be the year and the year following
    // For example: Season of 2018 would be "20182019"
    // This function takes a selected year as a string and appends the next year
    function seasonYear(selectedYear){
        let seasonYearStart = selectedYear
        let seasonYearEnd = selectedYear + 1
        let addSeason = seasonYearStart.toString() + seasonYearEnd.toString()
        let combinedSeasonYear = Number(addSeason)
        return combinedSeasonYear
    }

    //Plots the results of the wins and losses to  chart
    // TODO Simplify this function
    function updateOutcome(gameOutcome){
        let movePoint
        let chartCoordinates
        if (gameOutcome === "WIN") {
            //Moves the yAxis 5 points up the yaxis
            movePoint = parseInt(yAxis) + 5
            // Chart function only takes type of str not num, convert the calculated num
            // A win is represented by being at the "0" of the xAxis
            chartCoordinates = `${movePoint.toString()}, 0`
            // Store the result, when the loop iterates again it will refrence this yaxis to move it forward 
            yAxis = movePoint
            gameResults.push(chartCoordinates)
        } else if (gameOutcome === "LOSS"){
            movePoint = parseInt(yAxis) + 5
            chartCoordinates = `${movePoint.toString()}, 100`
            yAxis = movePoint
            gameResults.push(chartCoordinates)   
        }
    }
    
    async function cleanDateString(str){
        const result = await str.split("T")[0]
        datesArray.push(result)
    }
function handleRender(){
    return getWins(20192020)
}
    // Custom event for when the close button is clicked within the Modal
    const dispatch = createEventDispatcher();
    
</script>

<div class="modal-bg" transition:fade>
    <div class="modal" transition:fly={{ y: -100 }}>
        <h1 class="team-name">{teamName}</h1>
        <img class="team-logo" src="https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/{id}.svg" alt="{teamName} Logo">
        
        {#await wins}
            loading...
        {:then}
            <h2>{selectedYear} Season</h2>
            <h3>League Rank: {rank}</h3>
            <h3>Points: {points}</h3>
            <Chart outcome={gameResults} />
        {/await}

        <h3>Outcome: {selectedYear}</h3>
        
        <button on:click={ () => dispatch('close')}>Close</button>  

        <select bind:value={selectedYear} on:change="{(event) => getWins(seasonYear(parseInt(event.target.value)))}">
            {#each items as item}
                <option value={item}>{item}</option>
            {/each}
        </select>   
    </div>
</div>

<style>
    .modal-bg{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left:0;
        background: rgba(0, 0, 0, 0.8)
    }
    .modal {
        background: white;
        padding: 20px;
        border-radius: 15px;
    }
    .team-name{
        display: inline;
        padding-left: 50px;
    }
    .team-logo{
        max-width: 5%;
        float: left;
    }
</style>