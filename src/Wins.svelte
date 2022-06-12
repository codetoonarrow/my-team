<script>
let dateString
let wins = getWins()

async function getWins(){
    const res = await fetch("https://statsapi.web.nhl.com/api/v1/schedule?season=20212022")
    const wins = await res.json()
    return wins
}

function handleClick(){

}

</script>

<input type="date" bind:value={dateString}>
<h1>{dateString}</h1>

{#await wins}
    loading
{:then response} 
    {#each response.dates as date}
        <h1>{date.date}</h1>
         {#each date.games as winner}
            <h2>{winner.teams.away.team.name} {winner.teams.away.score}</h2>
            <h2>Vs.</h2>
            <h2>{winner.teams.home.team.name} {winner.teams.home.score}</h2>
            {#if winner.teams.away.score > winner.teams.home.score}
                 <h1>{winner.teams.away.team.name}</h1>
            {:else}
                <h1>{winner.teams.home.team.name}</h1>
            {/if}
         {/each}
    {/each}
{/await}
