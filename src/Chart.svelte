
<script>
    import { LayerCake, Svg, Canvas, Html }  from 'layercake';
  
    // These are components that live in your project that
    // you can customize as you see fit
    import ScatterCanvas from './components/ScatterCanvas.svelte';
    import AxisX from './components/AxisX.svelte';
    import AxisY from './components/AxisY.svelte';
    import Annotations from './components/Annotations.svelte';
  
    // Set up some data
    const points = [
      {x: 0, y: 0},
      {x: 5, y: 10},
      {x: 10, y: 20},
      {x: 15, y: 30},
      {x: 20, y: 40}
    ];
  
    const annotationBlurbs = [
      { x: 10, y: 20, text: 'Look at this value!'}
    ];
  </script>
  
  <style>
    /*
      The wrapper div needs to have an explicit width and height in CSS.
      It can also be a flexbox child or CSS grid element.
      The point being it needs dimensions since the <LayerCake> element will
      expand to fill it.
    */
    .chart-container {
      width: 100%;
      height: 300px;
    }
  </style>
  
  <div class="chart-container">
    <LayerCake
      x='x'
      y='y'
      data={points}
    >
      <Canvas>
        <ScatterCanvas fill={'blue'} r={3}/>
      </Canvas>
  
      <Svg>
        <AxisX/>
        <AxisY/>
      </Svg>
  
      <Html>
        <Annotations blurbs={annotationBlurbs} />
      </Html>
  
      <!-- If you wanted to, you could add another <Svg> again... -->
    </LayerCake>
  </div>