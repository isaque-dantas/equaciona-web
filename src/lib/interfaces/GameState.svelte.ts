import type {GameOptions} from "./GameOptions.svelte";

export interface GameState {
    // isAnswerRight: boolean,
    points: number,
    secondsLeft: number,
    secondsOfLastRightAnswer: number,
    options: GameOptions
}

export interface UpdatedGameState {
    points: number,
    deltaPoints: number,
    secondsLeft: number,
    secondsOfLastRightAnswer: number,
    deltaSeconds: number
}