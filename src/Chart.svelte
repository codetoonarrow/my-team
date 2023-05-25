<script>
export let outcome;
</script>

<script context="module">
 
let svgRef;

export function downloadSVG(){
    const svg = svgRef;
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = 'download.svg';
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
	}

</script>


<div class="chart">
	<svg bind:this={svgRef} width="600" height="100" role="img">
		<!-- In order for the CSS styles to be preserved the original color and styles-->
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
