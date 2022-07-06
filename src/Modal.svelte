<script>
    import { fly, fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import Chart from './Chart.svelte';
    import { dataset_dev } from 'svelte/internal';
    export let teamName;
    export let rank;
    export let points;
    export let id;
    let wins = getWins();


    async function getWins(){
        const res = await fetch("https://statsapi.web.nhl.com/api/v1/schedule?season=20212022")
        const wins = await res.json()
        const results = wins.dates
        for (let i = 0; i  < results.length; i++){
            // console.log(results[i].games)
            let obj = results[i].games
            for (let j = 0; j < obj.length; j++){
                // console.log(obj[j].teams.away.score)
                // Get the id of the current team selected 
                if (obj[j].teams.home.team.id === id && obj[j].teams.home.score > obj[j].teams.away.score|| obj[j].teams.away.team.id === id && obj[j].teams.away.score > obj[j].teams.home.score) {
                    console.log("WIN")
                }else{
                    console.log("LOSE")
                }
            }
        }
    }

    let gameResults = []
    let yAxis = 0
    let testArray = ["30, 100", "30, 0", "30, 100"]
        //Todo save the result of the yaxis to a var so as to add
        // if it is a win have starting point that is 100
        // Push the starting point to the array
        // Turn the yaxis from a string to a number 
        // Add 30 to move the yaxis forward on chart
        // Turn the yaxis back to a string
        // Combine the yaxis as a string to the rest of the string 
    function updateOutcome(linePoint, moveLine){
        let result
        let addResult
        let finalResult
        let combineString

        if (linePoint === "WIN") {
            finalResult = yAxis + " ," + " 100"
            gameResults.push(finalResult)
            result = parseInt(yAxis)
            result += 30
            finalResult = result.toString()
            combineString = finalResult + " ," + " 100"
            gameResults.push(combineString)
            console.log(combineString)
        } else if (linePoint === "LOSS"){
            finalResult = yAxis + " ," + 0
            gameResults.push(finalResult)
            result = parseInt(yAxis)
            addResult = result + moveLine
            finalResult = addResult.toString()
            combineString = finalResult + " ," + " 0"
            gameResults.push(combineString)
            console.log(combineString)
        }
    }
  

    // Custom event for when the close button is clicked within the Modal
    const dispatch = createEventDispatcher();
    
</script>

<div class="modal-bg" transition:fade>
    <div class="modal" transition:fly={{ y: -100 }}>
        <h2 class="team-name">{teamName}</h2>
        <img class="team-logo" src="https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/{id}.svg" alt="{teamName} Logo">
        <!-- <h3>League Rank: {rank}</h3>
        <h3>Points: {points}</h3> -->
        <Chart outcome={testArray}/>
        <button on:click={ () => {
            dispatch('close');
        }}
        >Close</button>
        <!-- {#await wins}
            loading
        {:then response} 
            {#each response.dates as date}
                {#each date.games as winner}
                    {#if winner.teams.home.team.id === id && winner.teams.home.score > winner.teams.away.score|| winner.teams.away.team.id === id && winner.teams.away.score > winner.teams.home.score}
                        {date.date}
                        {updateOutcome("WIN")}
                        {:else if  winner.teams.home.team.id === id && winner.teams.home.score < winner.teams.away.score|| winner.teams.away.team.id === id && winner.teams.away.score < winner.teams.home.score}
                        {date.date}
                        {updateOutcome("LOSS")}
                    {/if}
                {/each}
            {/each}
        {/await} -->
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