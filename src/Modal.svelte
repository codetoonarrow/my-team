<script>
    import Chart, {downloadSVG} from './Chart.svelte';
    import { fly, fade } from 'svelte/transition';
    // For the custom button Event
    import { createEventDispatcher } from 'svelte';

    export let teamName;
    export let id;
    export let rank;
    export let season;

    // Variables for the Chart
    let gameResults = [];
    let wins = getWins();
    let yAxis = 0
    
    // Variables for the Dropdown
    let seasonYears = [2022, 2021, 2020, 2019, 2018]

    async function getWins(combinedSeasonYear = 20212022){
        const res = await fetch(`https://statsapi.web.nhl.com/api/v1/schedule?season=${combinedSeasonYear}`)
        const wins = await res.json()
        const results = wins.dates

        // To reset the chart plotted points and reset the yaxis 
        gameResults = []
        yAxis = 0

        for (let i = 0; i  < results.length; i++){
            let obj = results[i].games
            for (let j = 0; j < obj.length; j++){
                // Check when the selected team played at home or away what the result of the game was
                if (obj[j].teams.home.team.id === id && obj[j].teams.home.score > obj[j].teams.away.score || obj[j].teams.away.team.id === id && obj[j].teams.away.score > obj[j].teams.home.score) {
                    updateOutcome("WIN")
                }else if (obj[j].teams.home.team.id === id && obj[j].teams.home.score < obj[j].teams.away.score || obj[j].teams.away.team.id === id && obj[j].teams.away.score < obj[j].teams.home.score){
                    updateOutcome("LOSS")
                }
            }
        }
    }


    /* 
    The NHL API requires that if a season is to be returned it needs to be the year and the year following
    For example: Season of 2018 would be "20182019"
    This function takes a selected year as a string and appends the next year
    */
    function seasonYear(selectedYear){
        let seasonYearStart = selectedYear
        let seasonYearEnd = selectedYear + 1
        let addSeason = seasonYearStart.toString() + seasonYearEnd.toString()
        let combinedSeasonYear = Number(addSeason)
        return combinedSeasonYear
    }

    //Plots the results of the wins and losses to  chart
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

    // Custom event for when the close button is clicked within the Modal
    const dispatch = createEventDispatcher()
    
  
</script>

<div class="modal-bg" transition:fade>
    <div class="modal" transition:fly={{ y: -100 }}>
        <h1 class="team-name">{teamName}</h1>
        <img class="team-logo" src="https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/{id}.svg" alt="{teamName} Logo">
        
        {#await wins}
            loading...
        {:then}
            <h2>{season} Season</h2>
            <Chart outcome={gameResults} /> 
        {/await}
        <button on:click={downloadSVG}>Download</button>
        <button on:click={ () => dispatch('close')}>Close</button>  

        <select bind:value={season} on:change={(event) => getWins(seasonYear(parseInt(event.target.value)))}>
            {#each seasonYears as year}
                <option value={year}>{year}</option>
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