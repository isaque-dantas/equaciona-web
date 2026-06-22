import type {Equation} from "../interfaces/Equation.svelte";

export function checkAnswer(answer: string, equation: Equation, onRightAnswer: () => void, onWrongAnswer: () => void) {
    if (parseAnswer(answer) == equation.solution) {
        onRightAnswer()
    } else {
        onWrongAnswer()
    }
}

export function parseAnswer(answer: string): number | null {
    const parsingWorked = (n: any) => !Number.isNaN(n)

    answer =
        Array
            .from(answer)
            .filter(
                character => '+-,.0123456789/'.includes(character)
            )
            .join('')

    if (answer == '') return null

    if (answer.includes('/')) {
        const numerator = Number.parseInt(answer.split('/').at(0)!)
        const denominator = Number.parseInt(answer.split('/').at(1)!)

        if (denominator == 0) return null

        return numerator / denominator
    }

    const result = Number.parseFloat(answer)
    if (parsingWorked(result)) return result

    return null
}
