<script lang="ts">
    import UserAnswerFeedback from "./lib/components/UserAnswerFeedback.svelte";
    import Scoreboard from "./lib/components/Scoreboard.svelte";
    import ParticlesInitializer from "./lib/components/ParticlesInitializer.svelte";

    import {generateEquation} from "./lib/domain/EquationGenerator.svelte";
    import type {EquationOptions} from "./lib/interfaces/EquationOptions.svelte";
    import type {Equation} from "./lib/interfaces/Equation.svelte";
    import {checkAnswer, parseAnswer} from "./lib/domain/UserInputHandler.svelte";
    import UserInputHandler from "./lib/components/UserInputHandler.svelte";
    import type {GameOptions} from "./lib/interfaces/GameOptions.svelte";
    import {startCountdown} from "./lib/domain/TimeCountdown.svelte";
    import {getUpdatedGame} from "./lib/domain/PointsHandler.svelte";
    import type {GameState} from "./lib/interfaces/GameState.svelte";
    import {equationOptionsFactory, gameOptionsFactory, gameStateFactory} from "./lib/domain/GameInitializer.svelte";

    const equationOptions: EquationOptions = equationOptionsFactory();
    const gameOptions: GameOptions = gameOptionsFactory()

    let equation: Equation = $state(generateEquation(equationOptions))
    let answer = $state('')
    let feedbackStatus = $state('none')

    let points = $state(0)
    let deltaPoints = $state(0)

    let secondsLeft = $state(gameOptions.initialSeconds)
    let secondsOfLastRightAnswer = $state(gameOptions.initialSeconds)
    let deltaSeconds = $state(0)

    let gameState: GameState = $derived({
        points,
        secondsLeft,
        secondsOfLastRightAnswer,
        options: gameOptions
    })

    let gameStatus: 'running' | 'stopped' = $state('running')

    let countdownIntervalId = $state(
        startCountdown(
            () => secondsLeft,
            (s) => secondsLeft = s,
            onCountdownBeingOver
        )
    )

    function onCountdownBeingOver() {
        clearInterval(countdownIntervalId)
        gameStatus = 'stopped'
    }

    function onAnswerInputChange(event: KeyboardEvent) {
        if (event.key === 'Enter') checkAnswer(answer, equation, onRightAnswer, onWrongAnswer)
    }

    function onRightAnswer() {
        answer = ''
        equation = generateEquation(equationOptions)
        feedbackStatus = 'right-answer';

        ({points, deltaPoints, secondsLeft, secondsOfLastRightAnswer, deltaSeconds} = getUpdatedGame(true, gameState))
    }

    function onWrongAnswer() {
        answer = ''
        feedbackStatus = 'wrong-answer';

        ({points, deltaPoints, secondsLeft, secondsOfLastRightAnswer, deltaSeconds} = getUpdatedGame(false, gameState))
    }

    function resetGame() {
        ({points, secondsLeft, secondsOfLastRightAnswer} = gameStateFactory());
        answer = ''
        gameStatus = 'running'

        countdownIntervalId = startCountdown(
            () => secondsLeft,
            (s) => secondsLeft = s,
            onCountdownBeingOver
        )
    }
</script>

<main class="absolute top-48 left-1/2 -translate-x-1/2">
    {#if gameStatus === 'running'}
        <section class="flex flex-col gap-4 items-center">
            <h3 class="font-mono text-6xl text-center font-bold">{equation.rendered}</h3>

            <UserInputHandler {onAnswerInputChange} {checkAnswer} bind:answer={answer}/>

            <small class="flex items-center">Aperte a tecla Enter (<span
                    class="material-symbols-outlined text-slate-700">keyboard_return</span>)
                para enviar a resposta.</small>
            <div class="border-b border-slate-200 w-full my-8"></div>

            <Scoreboard
                    {points}
                    {secondsLeft}
                    {secondsOfLastRightAnswer}
            />
        </section>
    {:else if gameStatus === 'stopped'}
        <section class="flex flex-col gap-4">
            <h1 class="text-4xl font-medium">O cronômetro zerou... mas você conseguiu <span
                    class="font-bold italic"> {points} pontos</span>!</h1>
            <a href="https://github.com/isaque-dantas" target="_blank"
               class="flex items-center p-4 border border-slate-300 shadow-md rounded-lg">
                Por Isaque Dantas (GitHub<span class="material-symbols-outlined">arrow_outward</span>)</a>
            <p>Obrigado por jogar!</p>
            <button onclick={() => resetGame()}
                    class="text-xl mt-16 border border-slate-700 text-slate-700 self-center px-4 py-2 rounded-xl cursor-pointer hover:bg-slate-700 hover:text-white transition-all font-medium">
                Jogar novamente
            </button>
        </section>
    {/if}
</main>

<UserAnswerFeedback
        {feedbackStatus}
        onAnimationFinished={() => feedbackStatus = 'none'}
        {deltaPoints}
        {deltaSeconds}
/>
<!--<ParticlesInitializer/>-->
