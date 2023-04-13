<script>
 
    import Chart from './Chart.svelte';

    import { fly, fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    import { dataset_dev } from 'svelte/internal';
    export let teamName;
    export let id;
    // export let rank;
    // export let points;
    let wins = getWins();
    let gameResults = []
    let yAxis = 0
    let selectedYear = 2018
    let items = [2018, 2019, 2020, 2021]

    async function getWins(combinedSeasonYear = 20212022){
        console.log("Ran in getWins func" + " " + combinedSeasonYear)
        const res = await fetch(`https://statsapi.web.nhl.com/api/v1/schedule?season=${combinedSeasonYear}`)
        const wins = await res.json()
        const results = wins.dates
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
        console.log( "Hey I am running inside getWins, this is what is selected: " + combinedSeasonYear)
    }

    // The NHL API requires that if a season is to be returned it needs to be the year and the year following
    // For example: Season of 2018 would be "20182019"
    // This function takes a selected year as a string and appends the next year
    function seasonYear(selectedYear){
        let seasonYearStart = selectedYear
        let seasonYearEnd = selectedYear + 1
        let addSeason = seasonYearStart.toString() + seasonYearEnd.toString()
        let combinedSeasonYear = Number(addSeason)
        if(combinedSeasonYear > 0 ){
            getWins(combinedSeasonYear)
        }   
    }

    let result = seasonYear(2021)
    console.log(result)
// console.log(combinedSeasonYear)
    //Plots the results of the wins and losses to  chart
    function updateOutcome(linePoint){
        let result
        let finalResult
        let combineString

        if (linePoint === "WIN") {
            finalResult = yAxis + " ," + " 0"
            result = parseInt(yAxis)
            result += 5
            finalResult = result.toString()
            combineString = finalResult + " ," + " 0"
            yAxis = result
            gameResults.push(combineString)
        } else if (linePoint === "LOSS"){
            finalResult = yAxis + " ," + " 100"
            result = parseInt(yAxis)
            result += 5
            finalResult = result.toString()
            combineString = finalResult + " ," + " 100"
            yAxis = result
            gameResults.push(combineString)
        }
    }
  

    // Custom event for when the close button is clicked within the Modal
    const dispatch = createEventDispatcher();
    
</script>

<div class="modal-bg" transition:fade>
    <div class="modal" transition:fly={{ y: -100 }}>
        <h1 class="team-name">{teamName}</h1>
        <img class="team-logo" src="https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/{id}.svg" alt="{teamName} Logo">
        <!-- <h3>League Rank: {rank}</h3>
        <h3>Points: {points}</h3> -->
        {#await wins}
            loading
        {:then}
            <h3>{selectedYear} Season</h3>
            <Chart outcome={gameResults} />
        {/await}
        <button on:click={ () => {
            dispatch('close');
        }}
        
        >Close</button>  
        <select bind:value={selectedYear} on:change="{async (event) => await seasonYear(parseInt(event.target.value))}">
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