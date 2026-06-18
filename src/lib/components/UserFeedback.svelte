<script lang="ts">
    import {randInt} from "../domain/RandomUtils.svelte";
    import {elasticOut} from "svelte/easing";

    let {feedbackStatus} = $props()

    function whoosh(node: HTMLElement, params: { delay?: number, duration?: number, easing?: (t: number) => number }) {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		return {
			delay: params.delay || 0,
			duration: params.duration || 400,
			easing: params.easing || elasticOut,
			css: (t: any, u: any) => `transform: ${existingTransform} scale(${t})`
		};
	}
</script>

{#if feedbackStatus === 'right-answer'}
    <p in:whoosh class="material-symbols-outlined fixed ">check</p>
{/if}

{#if feedbackStatus === 'wrong-answer'}
    <p></p>
{/if}