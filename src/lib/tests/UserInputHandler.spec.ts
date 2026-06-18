import {describe, expect, it} from "vitest";
import {parseAnswer} from "../domain/UserInputHandler.svelte";

describe('parseAnswer', () => {
    it.each([
        {answer: '0', expected: 0},
        {answer: '1', expected: 1},
        {answer: '-2', expected: -2},

        {answer: '2.5', expected: 2.5},
        {answer: '-1.2', expected: -1.2},

        {answer: '1/2', expected: 1/2},
        {answer: '2/3', expected: 2/3},
        {answer: '-3/2', expected: -3/2},

        {answer: '1/0', expected: null},

        {answer: '', expected: null},
        {answer: ' ', expected: null},
    ])(
        '$answer → "$expected"',
        ({answer, expected}) => {
            expect(parseAnswer(answer)).toBe(expected)
        }
    )
})