import type {EquationOptions} from "../interfaces/EquationOptions.svelte";
import type {GameOptions} from "../interfaces/GameOptions.svelte";
import type {GameState} from "../interfaces/GameState.svelte";

export function equationOptionsFactory(): EquationOptions {
    return {
        minCoefficient: -5,
        maxCoefficient: 5,
        minNumberOfX: 1,
        maxNumberOfX: 2,
        minLength: 2,
        maxLength: 4
    }
}

export function gameOptionsFactory(): GameOptions {
    return {
        initialSeconds: 20,
        secondsOnRight: 3,
        secondsOnWrong: -2,
        pointsOnRight: 50,
        pointsOnWrong: -10
    }
}

export function gameStateFactory(): GameState {
    return {
        points: 0,
        secondsLeft: gameOptionsFactory().initialSeconds,
        secondsOfLastRightAnswer: gameOptionsFactory().initialSeconds,
        options: gameOptionsFactory()
    }
}