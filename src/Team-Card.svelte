<script>
    import { themeEnabled } from './stores.js';
</script>

<div class={$themeEnabled ? 'dark' : 'light'}>
	<slot></slot>
</div>

<style>
div{
    padding-top: 13px;
    margin-left: 30px;
    padding-bottom: 13px;
}

.dark{
    background: #121212;
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