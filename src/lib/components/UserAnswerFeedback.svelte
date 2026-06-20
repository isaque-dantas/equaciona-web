<script lang="ts">
    import {randInt} from "../domain/RandomUtils.svelte";
    import {elasticOut} from "svelte/easing";

    interface Props {
        feedbackStatus: string,
        onAnimationFinished: () => {},
        deltaPoints: number,
        deltaSeconds: number
    }

    let {feedbackStatus, onAnimationFinished, deltaPoints, deltaSeconds}: Props = $props()

    function appear(node: Element, {delay = 0, duration = 1000} = {}) {
        const o = +getComputedStyle(node).opacity;

        return {
            delay,
            duration,
            easing: (t: number) => Math.log(t + 1) * (1 / Math.log(2)),
            css: (t: number) => `opacity: ${o - t * o}; transform: translateY(-${t * 280}px)`
        };
    }

    function getXTranslation() {
        const viewportWidth = window.innerWidth;
        const randTranslation = () => randInt(
            window.innerWidth / 6,
            window.innerWidth / 6 + window.innerWidth / 10
        );

        return {
            pointsXTranslation: viewportWidth / 2 + randTranslation(),
            secondsXTranslation: viewportWidth / 2 + -1 * randTranslation()
        }
    }
</script>

{#snippet floatingIcon(color: string, side: 'right' | 'left', icon: string)}
    <p
            in:appear
            onintroend={() => onAnimationFinished()}
            class="fixed {side}-40 bottom-1/3 w-16 h-16 flex items-center justify-center rounded-2xl border-4 border-{color}">
        <span class="material-symbols-outlined text-6xl! text-{color}">{icon}</span>
    </p>
{/snippet}

{#snippet floatingNumber(value: number, unity: string, side: 'right' | 'left')}
    {const color = value < 0 ? 'red-700' : 'green-700'}
    {const translation = side === 'right' ? 'translate-x-[calc(25vw_-_50%)]' : '-translate-x-[calc(25vw_-_50%)]'}

    <p
            in:appear
            onintroend={() => onAnimationFinished()}
            class="fixed left-1/2 {translation} bottom-1/3 w-fit flex text-2xl font-mono font-bold text-{color} text-3xl">
        {value > 0 ? '+' : ''}{value}{unity}
    </p>
{/snippet}

{#if feedbackStatus == 'right-answer'}
    {@render floatingIcon('green-700', 'right', 'check')}
    {@render floatingIcon('green-700', 'left', 'check')}
{/if}

{#if feedbackStatus === 'wrong-answer'}
    {@render floatingIcon('red-700', 'right', 'close')}
    {@render floatingIcon('red-700', 'left', 'close')}
{/if}

{#if feedbackStatus !== 'none'}
    {@render floatingNumber(deltaPoints, 'pts', 'right')}
    {@render floatingNumber(deltaSeconds, 's', 'left')}
{/if}

<!--{#if feedbackStatus !== 'none'}-->
<!--{/if}-->