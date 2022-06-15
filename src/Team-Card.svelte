<script>
    import { themeEnabled } from './stores.js';

    let wins = getWins()
    export let teamHome
    export let teamAway

    async function getWins(){
        const res = await fetch("https://statsapi.web.nhl.com/api/v1/schedule?season=20212022")
        const wins = await res.json()
        return wins
    }
</script>

{#await wins}
    loading
{:then response} 
    {#each response.dates as date}
        <h1>{date.date}</h1>
         {#each date.games as winner}
            {teamHome = winner.teams.home.team.id}
            {teamAway = winner.teams.away.team.id}
         {/each}
    {/each}
{/await}

<div class={$themeEnabled ? 'dark' : 'light'}>
	<slot></slot>
</div>

<style>
div{
    padding-top: 13px;
    padding-bottom: 13px;
}

.dark{
    background: #1D1D1D;
    color: #E3E3E3;
}
div.dark:hover{
    background-color: #A6A6A8;
}
.light {
    background: white;
    color: #141414;
}
div.light:hover{
    background-color: #CECECE;
}
</style>