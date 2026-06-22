import type {EquationOptions} from "../interfaces/EquationOptions.svelte";
import type {GameOptions} from "../interfaces/GameOptions.svelte";
import type {GameState} from "../interfaces/GameState.svelte";
import type {Equation} from "../interfaces/Equation.svelte";

export function equationOptionsFactory(difficultyLevel: number = 2): EquationOptions {
    const optionsPerDifficultyLevel: Record<number, EquationOptions> = {
        1: {
            minCoefficient: 0,
            maxCoefficient: 5,
            minNumberOfX: 1,
            maxNumberOfX: 2,
            minLength: 2,
            maxLength: 3
        },
        2: {
            minCoefficient: -2,
            maxCoefficient: 5,
            minNumberOfX: 1,
            maxNumberOfX: 3,
            minLength: 2,
            maxLength: 4
        },
        3: {
            minCoefficient: -5,
            maxCoefficient: 5,
            minNumberOfX: 1,
            maxNumberOfX: 3,
            minLength: 2,
            maxLength: 5
        },
        4: {
            minCoefficient: -7,
            maxCoefficient: 7,
            minNumberOfX: 2,
            maxNumberOfX: 3,
            minLength: 3,
            maxLength: 5
        },
    }

    return optionsPerDifficultyLevel[difficultyLevel] ?? optionsPerDifficultyLevel[2]
}

export function gameOptionsFactory(difficultyLevel: number = 2): GameOptions {
    const optionsPerDifficultyLevel: Record<number, GameOptions> = {
        1: {
            initialSeconds: 45,
            secondsOnRight: 7.5,
            secondsOnWrong: -2,
            pointsOnRight: 10,
            pointsOnWrong: -2
        },
        2: {
            initialSeconds: 35,
            secondsOnRight: 5,
            secondsOnWrong: -3,
            pointsOnRight: 15,
            pointsOnWrong: -3
        },
        3: {
            initialSeconds: 25,
            secondsOnRight: 4,
            secondsOnWrong: -3,
            pointsOnRight: 20,
            pointsOnWrong: -3
        },
        4: {
            initialSeconds: 20,
            secondsOnRight: 3,
            secondsOnWrong: -4,
            pointsOnRight: 30,
            pointsOnWrong: -5
        },
    }

    return optionsPerDifficultyLevel[difficultyLevel] ?? optionsPerDifficultyLevel[2]
}

export function gameStateFactory(difficultyLevel: number = 2): GameState {
    return {
        points: 0,
        secondsLeft: gameOptionsFactory(difficultyLevel).initialSeconds,
        secondsOfLastRightAnswer: gameOptionsFactory(difficultyLevel).initialSeconds,
        options: gameOptionsFactory(difficultyLevel)
    }
}

export function emptyEquationFactory(): Equation {
    return {
        members: [],
        solution: null,
        rendered: ''
    }
}