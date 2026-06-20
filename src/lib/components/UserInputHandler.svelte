<script lang="ts">
    let {onAnswerInputChange, checkAnswer, answer = $bindable()} = $props()
</script>

<fieldset class="flex w-100 max-w-full gap-4 mt-8 justify-center">
    <input onkeydown="{onAnswerInputChange}" bind:value={answer}
           class="border-2 border-slate-300 rounded-lg text-xl p-2 shadow-sm min-w-40"
           placeholder="Responda aqui...">
    <button onclick="{checkAnswer}"
            class="material-symbols-outlined text-3xl! text-slate-600 border-2 border-slate-600 rounded-full w-12 h-12 hover:text-white hover:bg-slate-700 transition-all cursor-pointer">
        send
    </button>
</fieldset>