<script lang="ts">
    let {onDifficultyChanged, selectedDifficulty = $bindable()} = $props()

    const levels = [
        {label: 'Fácil', value: 1, color: 'text-green-600'},
        {label: 'Normal', value: 2, color: 'text-yellow-600'},
        {label: 'Difícil', value: 3, color: 'text-orange-600'},
        {label: 'Extremo', value: 4, color: 'text-orange-800'},
    ]
</script>

<div class="my-12">
    <h5 class="text-xl font-medium mb-2">Selecione a dificuldade</h5>
    <ul class="flex flex-wrap gap-4">
        {#each levels as level}
            <li>
                <label>
                    <input
                            bind:group={selectedDifficulty}
                            value={level.value}
                            onchange={() => onDifficultyChanged(selectedDifficulty)}
                            type="radio"
                            name="difficulty-level"
                            id="difficulty-level-{level.value}">
                    <span class="{level.color} font-bold">{level.label}</span>
                </label>
            </li>
        {/each}
    </ul>
</div>
