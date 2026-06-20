<script lang="ts">
    interface Props {
        points: number,
        secondsLeft: number,
        secondsOfLastRightAnswer: number,
    }

    let {points, secondsLeft, secondsOfLastRightAnswer}: Props = $props()
</script>

<section class="flex gap-16 p-6 border-2 border-slate-300 rounded-lg bg-slate-100 shadow-xl">
    <div class="flex flex-col">
        <h5 class="font-mono text-6xl font-medium">{points}</h5>
        <p class="text-xl self-end">pontos</p>
    </div>
    <div class="flex flex-col gap-4">
        <div class="flex gap-2 items-center">
            <h5 class="font-mono text-4xl">
                {secondsLeft}{Math.round(secondsLeft) == secondsLeft ? '.0' : ''}s
            </h5>
            <figure class="relative">
                <img src='/timer.svg' alt="Timer">
                <div class="h-0.5 w-1.5 bg-black absolute bottom-1/2 right-1/2 translate-[3px] animate-spin "></div>
            </figure>
        </div>
        <div class="flex gap-2 items-center">
            <p class="font-mono text-2xl">{secondsOfLastRightAnswer}</p>
            <p class="font-mono font-light px-1 border border-slate-300 rounded-md text-sm">Tempo total</p>
        </div>
    </div>
</section>
