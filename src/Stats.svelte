<script>
let stats = getStats();

   async function getStats(){
        const res = await fetch("https://statsapi.web.nhl.com/api/v1/standings?hydrate=record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))&season=20212022&site=en_nhl")
        const stats = await res.json();
        return stats;
    }


</script>
 <button on:click={getStats}>Get Stats</button>

{#await stats}
    loading
{:then value}
    <h1>{value.records[0].teamRecords[0].team.name)}</h1>
{/await}