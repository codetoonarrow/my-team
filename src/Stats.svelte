<script>
let stats = getStats();
let search;
// let index = -1;
   async function getStats(){
        const res = await fetch("https://statsapi.web.nhl.com/api/v1/standings?hydrate=record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))&season=20212022&site=en_nhl")
        const stats = await res.json();
        // if(search && search.length > 0){
        //    index = stats.records.findIndex(division => {
        //         return division.teamRecords
        //             .find(team => team.team.name.toLowerCase().includes(search.toLowerCase())) ? 
        //             true : false
 
        //     });
        //     console.log(index);
        // }
        return stats;
    }

 function getIndex(){

 }
</script>

    <input bind:value={search} type="text">
{#await stats}
    loading
{:then response}

     {#each response.records as division}
 
        <h1>Division: {division.division.name}</h1>
        {#each division.teamRecords as team}
            {#if !search || team.team.name.toLowerCase().includes(search.toLowerCase())}
            Team: {team.team.name}
            Wins: {team.leagueRecord.wins}
            Losses: {team.leagueRecord.losses}
            OT: {team.leagueRecord.ot}
            <br> 
            {/if}
        {/each}
     {/each}
{/await}