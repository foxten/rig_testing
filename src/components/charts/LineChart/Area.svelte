<!-- For more information on styling and drawing this shape, see https://github.com/d3/d3-shape#areas -->
<script>
  import { getContext } from 'svelte';
  import { area, curveBasisOpen, curveLinear } from 'd3-shape';

  const { data, xGet, yGet, yScale }= getContext('LayerCake');

  export let fill;
  export let type;

  export let curve = type === "curved" ? curveBasisOpen : curveLinear;

  $: path = area()
    .x($xGet)
    .y1($yGet)
    .y0(d => $yScale(4)) //adjust this to determine how tall the fill should be
    .curve(curve);
</script>

<path class='path-area' d='{path($data)}' {fill}></path>