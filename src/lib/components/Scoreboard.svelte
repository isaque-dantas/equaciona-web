<script lang="ts">
    interface Props {
        points: number,
        secondsLeft: number,
        secondsOfLastRightAnswer: number,
    }

    let {points, secondsLeft, secondsOfLastRightAnswer}: Props = $props()
</script>

<div class="flex flex-col items-center gap-4 md:items-start md:flex-row md:gap-10 justify-between py-6 px-4 border-2 border-slate-300 rounded-lg bg-slate-100 shadow-md max-w-sm md:max-w-md xl:max-w-4xl w-full">
    <div class="hidden md:flex flex-col">
        <h5 class="font-mono text-4xl md:text-5xl font-medium">{points}</h5>
        <p class="text-xl self-end">pontos</p>
    </div>
    <h5 class="md:hidden font-mono text-5xl font-medium">{points}<span class="text-xl ml-2">pts</span></h5>
    <div class="flex md:flex-col gap-6 md:gap-4 shrink-0">
        <div class="flex gap-2 items-center">
            <h5 class="font-mono text-3xl md:text-4xl">
                {secondsLeft}{Math.round(secondsLeft) == secondsLeft ? '.0' : ''}s
            </h5>
            <figure class="relative">
                <img src='/timer.svg' alt="Timer">
                <div class="h-0.5 w-1.5 bg-black absolute bottom-1/2 right-1/2 translate-[3px] animate-spin "></div>
            </figure>
        </div>
        <div class="flex flex-col md:flex-row md:gap-2 md:items-center">
            <p class="font-mono text-2xl">{secondsOfLastRightAnswer}s</p>
            <p class="font-mono font-light px-1 border border-slate-400 md:border-slate-300 rounded-md text-sm">Tempo total</p>
        </div>
    </div>
</div>
