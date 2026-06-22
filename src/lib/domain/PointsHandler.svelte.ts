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
    const secondsFactor = Math.max(0, state.points / 20 * Math.log(secondsUsedToAnswer + 1))

    const updatedPoints = roundToTwoPoints(
        isAnswerRight ?
            state.points + state.options.pointsOnRight - secondsFactor :
            state.points + state.options.pointsOnWrong - secondsFactor
    )

    const deltaPoints = roundToTwoPoints(updatedPoints - state.points)

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
        roundToTwoPoints(
            isAnswerRight ?
                state.secondsLeft + state.options.secondsOnRight :
                state.secondsLeft + state.options.secondsOnWrong
        )
    )

    const deltaSeconds = roundToTwoPoints(updatedSecondsLeft - state.secondsLeft)

    return {
        secondsLeft: updatedSecondsLeft,
        deltaSeconds
    }
}

function roundToTwoPoints(x: number): number {
    return Math.round(x * 100) / 100
}