<script>
    import { fly, fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    export let teamName;
    export let leagueRank;

    const dispatch = createEventDispatcher();
</script>

//User Clicks on the model item
// Model opens
//Stats passes the information to model to display
<div class="modal-bg" transition:fade>
    <div class="modal" transition:fly={{ y: -100 }}>
        <h2>{teamName}</h2>
        <h3>{leagueRank}</h3>
        <button on:click={ () => {
            dispatch('close');
        }}
        >Close</button>
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
</style>