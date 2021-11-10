<script>
    import { themeEnabled } from './stores.js';
    import { fade } from 'svelte/transition';
</script>

<div class={$themeEnabled ? 'dark' : 'light'} transition:fade>
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