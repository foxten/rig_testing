<script>
  import { getContext } from 'svelte';
  const { padding, xRange, yScale } = getContext('LayerCake');
  export let gridlines = true;
  export let tickMarks = false; //determines whether or not the grid line extends beyond the label
  export let formatTick = d => d;
  export let ticks;
  export let xTick = 0; // adjust this to place your y-axis labels left or right of the first vertical grid line
  export let yTick = 0; // adjust this to place your y-axis labels above or below their respective horizontal grid lines
  export let dxTick = 0;
  export let dyTick = -4;
  export let textAnchor = 'start';
  $: isBandwidth = typeof $yScale.bandwidth === 'function';

  $: tickVals = Array.isArray(ticks) ? ticks :
    isBandwidth ?
      $yScale.domain() :
      typeof ticks === 'function' ?
        ticks($yScale.ticks()) :
          $yScale.ticks(ticks);
</script>

<g class='axis y-axis' transform='translate({-$padding.left}, 0)'>
    {#each tickVals as tick (tick)}
      <g class='tick tick-{tick}' transform='translate({$xRange[0] + (isBandwidth ? $padding.left : 0)}, {$yScale(tick)})'>
        {#if gridlines !== false}
          <line
            class="gridline"
            x2='100%'
            y1={(isBandwidth ? ($yScale.bandwidth() / 2) : 0)}
            y2={(isBandwidth ? ($yScale.bandwidth() / 2) : 0)}
          ></line>
        {/if}
        {#if tickMarks === true}
          <line
            class='tick-mark'
            x1='0'
            x2='{isBandwidth ? -6 : 6}'
            y1={(isBandwidth ? ($yScale.bandwidth() / 2) : 0)}
            y2={(isBandwidth ? ($yScale.bandwidth() / 2) : 0)}
          ></line>
        {/if}
        <text
          x='{xTick}'
          y='{(isBandwidth ? ($yScale.bandwidth() / 2) + yTick : yTick)}'
          dx='{isBandwidth ? -9 : dxTick}'
          dy='{isBandwidth ? 4 : dyTick}'
          style="text-anchor:{isBandwidth ? 'end' : textAnchor};"
        >{formatTick(tick)}</text>
      </g>
    {/each}
  </g>

  <style>
    .tick {
      font-size: .725em;
      font-weight: 200;
    }
  
    .tick line {
      stroke: #aaa;
    }
    .tick .gridline {
      stroke-dasharray: 2;
    }
  
    .tick text {
      fill: #666;
    }
  
    .tick.tick-0 line {
      stroke-dasharray: 0;
    }
  </style>