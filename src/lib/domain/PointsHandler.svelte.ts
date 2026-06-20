import type {GameOptions} from "../interfaces/GameOptions.svelte";
import type {GameState, UpdatedGameState} from "../interfaces/GameState.svelte";

export function getUpdatedGame(isAnswerRight: boolean, state: GameState): UpdatedGameState {
    const {points, deltaPoints} = getUpdatedPoints(isAnswerRight, state)
    const {secondsLeft, deltaSeconds} = getUpdatedSecondsLeft(isAnswerRight, state)

    return {
        points,
        deltaPoints,
        secondsLeft,
        secondsOfLastRightAnswer: secondsLeft,
        deltaSeconds
    }
}

export function getUpdatedPoints(isAnswerRight: boolean, state: GameState): {
    points: number,
    deltaPoints: number
} {
    const secondsUsedToAnswer = state.secondsOfLastRightAnswer - state.secondsLeft
    const secondsFactor = state.points / 20 * Math.log(secondsUsedToAnswer + 1)

    const updatedPoints = Math.round(
        (
            isAnswerRight ?
                state.points + state.options.pointsOnRight - secondsFactor :
                state.points + state.options.pointsOnWrong - secondsFactor
        ) * 100
    ) / 100

    const deltaPoints = Math.round((updatedPoints - state.points) * 100) / 100

    return {
        points: updatedPoints,
        deltaPoints: deltaPoints
    }
}

export function getUpdatedSecondsLeft(isAnswerRight: boolean, state: GameState): {
    secondsLeft: number,
    deltaSeconds: number
} {
    const updatedSecondsLeft = Math.max(
        0,
        (
            isAnswerRight ?
                state.secondsLeft + state.options.secondsOnRight :
                state.secondsLeft + state.options.secondsOnWrong
        )
    )

    const deltaSeconds = Math.round((updatedSecondsLeft - state.secondsLeft) * 100) / 100

    return {
        secondsLeft: updatedSecondsLeft,
        deltaSeconds
    }
}