<script>
    export let themeEnabled;
    import { fade } from 'svelte/transition';
</script>

<div class={themeEnabled ? 'dark' : 'light'} transition:fade>
    <slot></slot>
</div>

<style>
    div{
        box-shadow: 0 0 5px 2px grey;
        border-radius: 5px;
    }
    .light {
        background: white;
        color: #979797;
    }

    .dark {
        background: #121212;
        color: #E3E3E3;
    }

</style>