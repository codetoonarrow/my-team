<!-- { filename: 'js/App.svelte' } -->
<script>
    import { LayerCake } from 'layercake';
  
    // Define some data
    const points = [
      {x: 0, y: 0},
      {x: 5, y: 10},
      {x: 10, y: 20},
      {x: 15, y: 30},
      {x: 20, y: 40}
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
      data={ points }
      x='x'
      y='y'
    >
      <!-- Components go here -->
    </LayerCake>
  </div>