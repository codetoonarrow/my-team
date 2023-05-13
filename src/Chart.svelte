<script>
export let outcome; 

let visible = true;

$: {
	
	console.table(`${outcome}`)
}
</script>
{#if visible}
<div>
	<svg width="600" height="100">
		<!-- x axis -->
		<line x1="0" x2="600" y1="100" y2="100"></line>
		<g class="x" transform="translate(0,120)"></g>
		
		<!-- y axis -->
		<line x1="0" x2="0" y1="0" y2="100"></line>
		<g class="y" transform="translate(-10,0)">
			<text y="100">Loss</text>
			<text y="0">Win</text>
		</g>
		<!-- data -->
		<polyline style="stroke: #ef6351; stroke-width: 3" points={outcome}></polyline>
	</svg>
</div>
{/if}
<style>
	svg {
		overflow: visible;
		margin: 3em;
	}


	line, polyline {
		fill: none;
		stroke: black;
	}
	
	.y text {
		text-anchor: end;
	}

	.chart {
	display: flex;
	align-items: center;
	justify-content: center;
	}

</style>