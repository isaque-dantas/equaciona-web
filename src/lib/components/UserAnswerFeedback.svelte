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

{#snippet floatingIcon(isAnswerRight: boolean, side: 'right' | 'left')}
    {const xPosition = side === 'right' ? 'right-[20vw]' : 'left-[20vw]'}
    {const colors = isAnswerRight ? 'border-green-700 text-green-700' : 'border-red-700 text-red-700'}
    <p
            in:appear
            onintroend={() => onAnimationFinished()}
            class="fixed {xPosition} bottom-1/3 w-16 h-16 flex items-center justify-center rounded-2xl border-4 {colors}">
        <span class="material-symbols-outlined text-6xl!">{isAnswerRight ? 'check' : 'close'}</span>
    </p>
{/snippet}

{#snippet floatingNumber(value: number, unity: string, side: 'right' | 'left')}
    {const color = value < 0 ? 'red-700' : 'green-700'}
    {const xPosition = side === 'right' ? 'right-[30vw]' : 'left-[30vw]'}

    <p
            in:appear
            onintroend={() => onAnimationFinished()}
            class="fixed {xPosition} bottom-1/3 w-fit flex text-2xl font-mono font-bold text-{color} text-3xl">
        {value > 0 ? '+' : ''}{value}{unity}
    </p>
{/snippet}

{#if feedbackStatus !== 'none'}
    {@render floatingIcon(feedbackStatus === 'right-answer', 'right')}
    {@render floatingIcon(feedbackStatus === 'right-answer', 'left')}
    {@render floatingNumber(deltaPoints, 'pts', 'right')}
    {@render floatingNumber(deltaSeconds, 's', 'left')}
{/if}

<!--{#if feedbackStatus !== 'none'}-->
<!--{/if}-->