<script>
	import { getContext } from "svelte";
	import { line, curveBasisOpen, curveLinear } from "d3-shape";

	const { data, xGet, yGet } = getContext("LayerCake");

	export let stroke;
    export let type;

	export let curve = type === "curved" ? curveBasisOpen : curveLinear;

	$: path = line().x($xGet).y($yGet).curve(curve);
</script>

<path class='path-line-curved' d='{path($data)}' {stroke}></path>

<style>
	.path-line-curved {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}
</style>