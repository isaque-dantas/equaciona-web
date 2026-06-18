<script lang="ts">
    import UserFeedback from "./lib/components/UserFeedback.svelte";
    import {generateEquation} from "./lib/domain/EquationGenerator.svelte";
    import type {EquationOptions} from "./lib/interfaces/EquationOptions.svelte";
    import type {Equation} from "./lib/interfaces/Equation.svelte";
    import {parseAnswer} from "./lib/domain/UserInputHandler.svelte";

    const equationOptions: EquationOptions = {
        minCoefficient: -5,
        maxCoefficient: 5,
        minNumberOfX: 1,
        maxNumberOfX: 2,
        minLength: 2,
        maxLength: 4
    };

    let equation: Equation = $state(generateEquation(equationOptions))
    let answer = $state('')
    let feedbackStatus = $state('none')

    function onAnswerInputChange(event: KeyboardEvent) {
        if (event.key === 'Enter') checkAnswer()
    }

    function checkAnswer() {
        console.log('parsed', parseAnswer(answer))
        if (parseAnswer(answer) == equation.solution) {
            equation = generateEquation(equationOptions)
            answer = ''
            feedbackStatus = 'right-answer'
        } else {
            answer = ''
            feedbackStatus = 'wrong-answer'
        }
    }
</script>

<main class="absolute top-48 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
    <h3 class="font-mono text-6xl text-center font-bold">{equation.rendered}</h3>
    <fieldset class="flex w-100 max-w-full gap-4 mt-8 justify-center">
        <input onkeydown="{onAnswerInputChange}" bind:value={answer}
               class="border-2 border-slate-300 rounded-lg text-xl p-2 shadow-sm min-w-40"
               placeholder="Responda aqui...">
        <button onclick="{checkAnswer}"
                class="material-symbols-outlined text-3xl! text-slate-600 border-2 border-slate-600 rounded-full w-12 h-12 hover:text-white hover:bg-slate-700 transition-all cursor-pointer">
            send
        </button>
    </fieldset>
    <div class="border-b border-slate-200 w-full"></div>
    <small class="flex items-center">Aperte a tecla Enter (<span class="material-symbols-outlined text-slate-700">keyboard_return</span>)
        para enviar a resposta.</small>
    <UserFeedback {feedbackStatus}/>
</main>