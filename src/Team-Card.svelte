<script>
    export let themeEnabled;
</script>

<div class={themeEnabled ? 'dark' : 'light'}>
	<slot></slot>
</div>

<style>
.dark{
    padding: 10px;
    border-radius: 5px;
    border:2px solid grey;
    background: #1E1E1E;
    color: #E3E3E3;
}
.light {
    background: white;
    border:2px solid grey;
    color: #141414;
}
</style>