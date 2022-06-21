<svg width="300" height="100">
	<!-- x axis -->
	<line x1="0" x2="300" y1="100" y2="100"></line>
	<g class="x" transform="translate(0,120)">
		<text x="0">0</text>
		<text x="60">2021-10-21</text>
		<text x="120">4</text>
		<text x="180">6</text>
		<text x="240">8</text>
		<text x="300">10</text>
	</g>
	
	<!-- y axis -->
	<line x1="0" x2="0" y1="0" y2="100"></line>
	<g class="y" transform="translate(-10,0)">
		<text y="100">Loss</text>
		<text y="0">Win</text>
	</g>
	
	<!-- data -->
	<polyline style="stroke: red; stroke-width: 2" points="
		0,100
		30,0
		60,0
		90,1
		120,84
		150,75
		180,64
		210,51
		240,36
		270,19
		300,0
	"></polyline>
</svg>

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
</style>