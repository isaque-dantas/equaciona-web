<script lang="ts">
    let {onAnswerSubmitted} = $props()
    let answer = $state('')

    const fromOneToNine = Array
        .from({length: 9})
        .map((_, i) => (i + 1).toString())

    function onAnswerInputChange(event: KeyboardEvent) {
        if (event.key === 'Enter') submit()
    }

    function onKeyTouched(key: string) {
        if ('0123456789'.includes(key)) answer += key
        else if (key == '.' && !answer.includes('.')) answer += '.'
        else if (key == '/' && !answer.includes('/')) answer += '/'

        else if (key == '-' && !answer.includes('-')) answer = '-' + answer
        else if (key == '-' && answer.includes('-')) answer = answer.slice(1)

        else if (key == 'backspace') answer = answer.slice(0, answer.length - 1)
        else if (key == 'C') answer = ''

        else if (key == '=') submit()
    }

    function submit() {
        onAnswerSubmitted(answer)
        answer = ''
    }
</script>

<fieldset class="hidden md:flex w-100 max-w-full gap-4 justify-center mt-4">
    <input onkeydown={onAnswerInputChange} bind:value={answer}
           class="border-2 border-slate-300 rounded-lg text-xl p-2 shadow-sm min-w-40"
           placeholder="Responda aqui...">
    <button onclick={() => submit()}
            class="material-symbols-outlined text-3xl! text-slate-600 border-2 border-slate-600 rounded-full w-12 h-12 hover:text-white hover:bg-slate-700 transition-all cursor-pointer">
        send
    </button>
</fieldset>

<fieldset class="md:hidden flex flex-col mt-4">
    {#snippet digit(key: string, isIcon: boolean = false)}
        <button onclick={() => onKeyTouched(key)}
                class="font-mono text-4xl h-12.5 border border-slate-500 px-3 py-1 rounded-sm {isIcon ? 'material-symbols-outlined' : ''}">{key}</button>
    {/snippet}

    <p class="text-4xl mb-4 self-center italic text-slate-800">{answer == '' ? '...' : answer}</p>

    <ul class="grid grid-cols-4 gap-4 justify-center mt-4">
        {#each fromOneToNine as n}
            <li>{@render digit(n)}</li>
            {#if n == '3'}
                <li>{@render digit('.')}</li>
            {/if}

            {#if n == '6'}
                <li>{@render digit('-')}</li>
            {/if}

            {#if n == '9'}
                <li>{@render digit('/')}</li>
            {/if}
        {/each}
        <li>{@render digit('C')}</li>
        <li>{@render digit('0')}</li>
        <li>{@render digit('backspace', true)}</li>
        <li>{@render digit('=')}</li>
    </ul>
</fieldset>