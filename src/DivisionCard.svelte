<script>
    export let themeEnabled;
</script>

<div class={themeEnabled ? 'dark' : 'light'}>
    <slot></slot>
</div>

<style>
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