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

{#snippet floatingIcon(isAnswerRight: boolean)}
    {const color = isAnswerRight ? 'border-green-700 text-green-700' : 'border-red-700 text-red-700'}
    <p
            onintroend={() => onAnimationFinished()}
            class=" w-10 h-10 md:w-16 md:h-16 flex items-center justify-center rounded-lg md:rounded-2xl border-2 md:border-4 {color}">
        <span class="material-symbols-outlined text-3xl! md:text-6xl!">{isAnswerRight ? 'check' : 'close'}</span>
    </p>
{/snippet}

{#snippet floatingNumber(value: number, unity: string)}
    {const color = value < 0 ? 'text-red-700' : 'text-green-700'}

    <p
            onintroend={() => onAnimationFinished()}
            class=" w-fit flex text-2xl font-mono font-bold {color} text-2xl md:text-3xl">
        {value > 0 ? '+' : ''}{value}{unity}
    </p>
{/snippet}

{#if feedbackStatus !== 'none'}
    <ul
            class="fixed bottom-1/3 left-1/2 -translate-x-1/2 flex justify-between items-center w-[calc(100vw-48px)] max-w-lg"
            in:appear
            onintroend={() => onAnimationFinished()}>
        {@render floatingIcon(feedbackStatus === 'right-answer')}
        {@render floatingNumber(deltaPoints, 'pts')}
        {@render floatingNumber(deltaSeconds, 's')}
        {@render floatingIcon(feedbackStatus === 'right-answer')}
    </ul>
{/if}

<!--{#if feedbackStatus !== 'none'}-->
<!--{/if}-->