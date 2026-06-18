import {describe, expect, it} from "vitest";
import type {EquationMember} from "../interfaces/EquationMember.svelte";
import {getSolution} from "../domain/EquationGenerator.svelte";

describe('getSolution', () => {
    it('solves #1', () => {
        const members: EquationMember[] = [
            {coefficient: 1, hasX: true},
            {coefficient: 0, hasX: false},
        ]

        expect(getSolution(members)).toBe(0)
    })

    it('solves #2', () => {
        const members: EquationMember[] = [
            {coefficient: 1, hasX: true},
            {coefficient: -1, hasX: false},
        ]

        expect(getSolution(members)).toBe(1)
    })

    it('solves #3', () => {
        const members: EquationMember[] = [
            {coefficient: 2, hasX: true},
            {coefficient: -3, hasX: true},
            {coefficient: 5, hasX: false},
            {coefficient: -2, hasX: false},
        ]

        // 2x -3x + 5 - 2 = 0   =>   -x = -3

        expect(getSolution(members)).toBe(3)
    })

    it('returns null when there is no X', () => {
        const members: EquationMember[] = [
            {coefficient: 2, hasX: false},
        ]

        expect(getSolution(members)).toBe(null)
    })

    it('returns null when there is no X', () => {
        const members: EquationMember[] = [
            {coefficient: 2, hasX: false},
        ]

        expect(getSolution(members)).toBe(null)
    })

    it('returns null when there are infinite solutions', () => {
        const members: EquationMember[] = [
            {coefficient: 1, hasX: false},
            {coefficient: 5, hasX: true},
            {coefficient: -5, hasX: true},
        ]

        expect(getSolution(members)).toBe(null)
    })
})