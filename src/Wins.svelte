<script>
let dateString
let wins = getWins()

async function getWins(){
    const res = await fetch("https://statsapi.web.nhl.com/api/v1/people/8471698/stats?stats=gameLog&season=20212022")
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
    {#each response.stats as stats}
         {#each stats.splits as winner}
              <h1>{winner.date}</h1>
              <h1>{winner.team.name}</h1>
              <h1>{winner.opponent.name}</h1>
              <h1>{winner.isWin}</h1>
        
         {/each}
    {/each}
{/await}
