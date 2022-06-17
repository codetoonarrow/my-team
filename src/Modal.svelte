<script>
    import { fly, fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import Chart from './Chart.svelte';
    export let teamName;
    export let rank;
    export let points;
    export let id;
    let wins = getWins();
   
    function checkScore(home, away){
        if(home > away || away > home){
            return "Win!"
        } else{
            "Loss!"
        }
    }
    async function getWins(){
        const res = await fetch("https://statsapi.web.nhl.com/api/v1/schedule?season=20212022")
        const wins = await res.json()
        return wins
    }
    // Custom event for when the close button is clicked within the Modal
    const dispatch = createEventDispatcher();
</script>

<div class="modal-bg" transition:fade>
    <div class="modal" transition:fly={{ y: -100 }}>
        <h2 class="team-name">{teamName}</h2>
        <img class="team-logo" src="https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/{id}.svg" alt="{teamName} Logo">
        <h3>League Rank: {rank}</h3>
        <h3>Points: {points}</h3>
        <Chart />
        <button on:click={ () => {
            dispatch('close');
        }}
        >Close</button>
        {#await wins}
            loading
        {:then response} 
            {#each response.dates as date}
                {#each date.games as winner}
                    {#if winner.teams.home.team.id === id && winner.teams.home.score > winner.teams.away.score|| winner.teams.away.team.id === id && winner.teams.away.score > winner.teams.home.score}
                        {date.date}
                        WIN
                        {:else if  winner.teams.home.team.id === id && winner.teams.home.score < winner.teams.away.score|| winner.teams.away.team.id === id && winner.teams.away.score < winner.teams.home.score}
                        {date.date}
                        LOSS
                    {/if}
                {/each}
            {/each}
        {/await}
        <slot />
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
    }
    .team-logo{
        max-width: 5%;
        float: left;
    }
</style>