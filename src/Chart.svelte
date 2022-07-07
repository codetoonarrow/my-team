<script>
export let outcome;
//If the game resulted in a Win 2nd point = 100
//Else 2nd point = 0
//For both outcomes 1st point +30

</script>
<div class="chart">
	<svg width="300" height="100">
		<!-- x axis -->
		<line x1="0" x2="300" y1="100" y2="100"></line>
		<g class="x" transform="translate(0,120)"></g>
		
		<!-- y axis -->
		<line x1="0" x2="0" y1="0" y2="100"></line>
		<g class="y" transform="translate(-10,0)">
			<text y="100">Loss</text>
			<text y="0">Win</text>
		</g>
		<!-- data -->
		<polyline style="stroke: red; stroke-width: 2" points={outcome}></polyline>
	</svg>
</div>
<style>
	svg {
		overflow: visible;
		margin: 3em;
	}


	line, polyline {
		fill: none;
		stroke: black;
	}
	
	.x text {
		text-anchor: middle;
    	font-size: 10px;
	}
	
	.y text {
		text-anchor: end;
		dominant-baseline: middle;
	}

	.chart {
	display: flex;
	align-items: center;
	justify-content: center;
	}

</style>