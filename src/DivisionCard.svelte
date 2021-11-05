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
        margin-bottom: 20px;
    }
    .light {
        border-radius: 5px;
        border: 1px solid #E9ECEF;
        background: white;
        color: #979797;
    }

    .dark {
        border-radius: 5px;
        background: #1E1E1E;
        color: #E3E3E3;
    }

</style>