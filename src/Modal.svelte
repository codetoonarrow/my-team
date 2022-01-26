<script>
    import { fly, fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    export let teamName;
    export let rank;
    export let points;

    const dispatch = createEventDispatcher();
</script>

<div class="modal-bg" transition:fade>
    <div class="modal" transition:fly={{ y: -100 }}>
        <h2>{teamName}</h2>
        <h3>League Rank: {rank}</h3>
        <h3>Points: {points}</h3>
        <button on:click={ () => {
       
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