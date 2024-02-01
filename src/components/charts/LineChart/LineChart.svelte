<script>
  import { LayerCake, Svg } from 'layercake';
  import Line from './Line.svelte';
  import AxisX from './AxisX.svelte';
  import AxisY from './AxisY.svelte';
  import Area from './Area.svelte';

  export let points;
  export let stroke;
  export let fill;
  export let lineType;
  const xKey = 'x';
  const yKey = 'y';

  points.forEach(d => {
    d[yKey] = +d[yKey];
  });
</script>

<div class="chart-container">
  <LayerCake
    x={xKey}
    y={yKey}
    data={points}
  >
  <Svg> 
    <AxisX />
    <AxisY
      ticks={4}
    />
    <Line stroke={stroke} type={lineType}/> 
    <Area fill={fill} type={lineType}/>
  </Svg>
  </LayerCake>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 300px;
  }
</style>
