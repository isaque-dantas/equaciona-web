<script lang="ts">
    import UserAnswerFeedback from "./lib/components/UserAnswerFeedback.svelte";
    import Scoreboard from "./lib/components/Scoreboard.svelte";

    import {generateEquation} from "./lib/domain/EquationGenerator.svelte";
    import type {EquationOptions} from "./lib/interfaces/EquationOptions.svelte";
    import type {Equation} from "./lib/interfaces/Equation.svelte";
    import {checkAnswer, parseAnswer} from "./lib/domain/UserInputHandler.svelte";
    import UserInputHandler from "./lib/components/UserInputHandler.svelte";
    import type {GameOptions} from "./lib/interfaces/GameOptions.svelte";
    import {startCountdown} from "./lib/domain/TimeCountdown.svelte";
    import {getUpdatedGame} from "./lib/domain/PointsHandler.svelte";
    import type {GameState} from "./lib/interfaces/GameState.svelte";
    import {
        emptyEquationFactory,
        equationOptionsFactory,
        gameOptionsFactory,
        gameStateFactory
    } from "./lib/domain/GameInitializer.svelte";
    import DifficultySelector from "./lib/components/DifficultySelector.svelte";

    let selectedDifficulty: number = $state(2)
    let equationOptions: EquationOptions = $derived(equationOptionsFactory(selectedDifficulty));
    let gameOptions: GameOptions = $derived(gameOptionsFactory(selectedDifficulty))

    let equation: Equation = $state(generateEquation(equationOptions))
    let answer = $state('')
    let feedbackStatus = $state('none')

    let points = $state(0)
    let deltaPoints = $state(0)

    let secondsLeft = $state(0)
    let secondsOfLastRightAnswer = $state(0)
    let deltaSeconds = $state(0)

    let gameState: GameState = $derived({
        points,
        secondsLeft,
        secondsOfLastRightAnswer,
        options: gameOptions
    })

    let gameStatus: 'before-start' | 'running' | 'stopped' = $state('before-start')
    let countdownIntervalId = $state(0)

    function onCountdownBeingOver() {
        clearInterval(countdownIntervalId)
        gameStatus = 'stopped'
    }

    function onRightAnswer() {
        feedbackStatus = 'right-answer'
        equation = generateEquation(equationOptions);
        ({points, deltaPoints, secondsLeft, secondsOfLastRightAnswer, deltaSeconds} = getUpdatedGame(true, gameState))
    }

    function onWrongAnswer() {
        feedbackStatus = 'wrong-answer';
        ({points, deltaPoints, secondsLeft, secondsOfLastRightAnswer, deltaSeconds} = getUpdatedGame(false, gameState))
    }

    function resetGameStatus() {
        ({points, secondsLeft, secondsOfLastRightAnswer} = gameStateFactory(selectedDifficulty));
        answer = ''
        equation = generateEquation(equationOptions)

        clearInterval(countdownIntervalId)
        countdownIntervalId = startCountdown(
            () => secondsLeft,
            (s) => secondsLeft = s,
            onCountdownBeingOver
        )
    }

    function resetGame() {
        gameStatus = 'running'
        resetGameStatus()
    }

    function onDifficultyChanged(updatedDifficulty: number) {
        selectedDifficulty = updatedDifficulty
        resetGameStatus()
    }
</script>

{#snippet credits()}
    <a href="https://github.com/isaque-dantas" target="_blank"
       class="flex items-center p-4 border border-slate-300 shadow-md rounded-lg">
        Por Isaque Dantas (GitHub<span class="material-symbols-outlined">arrow_outward</span>)</a>
{/snippet}

<main class="px-6 flex flex-col md:absolute md:top-48 md:left-1/2 md:-translate-x-1/2">
    {#if gameStatus === 'before-start'}
        <section
                class="flex flex-col gap-4 mt-[50vh] -translate-y-1/2 md:translate-y-0 md:mt-0 max-w-sm self-center md:self-auto">
            <h1 class="text-6xl font-bold italic self-center">Equaciona!</h1>
            {@render credits()}
            <DifficultySelector onDifficultyChanged={onDifficultyChanged} {selectedDifficulty}/>
            <button onclick={resetGame}
                    class="text-xl border-2 border-slate-700 text-slate-700 self-center px-10 py-1 rounded-xl cursor-pointer hover:bg-slate-700 hover:text-white transition-all font-bold flex items-center">
                <span>Iniciar</span><span class="material-symbols-outlined">chevron_right</span></button>
        </section>
    {:else if gameStatus === 'running'}
        <section class="flex flex-col gap-4 items-center mt-8 md:mt-0 ">
            <Scoreboard
                    {points}
                    {secondsLeft}
                    {secondsOfLastRightAnswer}
            />

            <div class="border-b border-slate-200 w-full my-8"></div>

            <h3 class="text-4xl md:text-5xl text-center font-bold">{equation.rendered}</h3>

            <UserInputHandler
                    onAnswerSubmitted={(updatedAnswer: string) => {
                        answer = updatedAnswer
                        checkAnswer(answer, equation, onRightAnswer, onWrongAnswer)
                    }}
            />

            <small class="md:flex items-center hidden">Aperte a tecla Enter (<span
                    class="material-symbols-outlined text-slate-700">keyboard_return</span>)
                para enviar a resposta.</small>
        </section>
    {:else if gameStatus === 'stopped'}
        <section
                class="flex flex-col gap-4 mt-[50vh] -translate-y-1/2 md:translate-y-0 md:mt-0 max-w-sm self-center md:self-auto">
            <h1 class="text-4xl font-medium">O cronômetro zerou... mas você conseguiu <span
                    class="font-bold italic"> {points} pontos</span>!</h1>
            {@render credits()}
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
