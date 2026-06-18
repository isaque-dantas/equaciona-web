import {describe, expect, it} from "vitest";
import {renderMember} from "../domain/EquationRenderer.svelte";

describe('renderMember', () => {
    it.each([
        {coefficient: 1, hasX: true, isFirst: true, expected: 'x'},
        {coefficient: 1, hasX: false, isFirst: true, expected: '1'},
        {coefficient: 1, hasX: true, isFirst: false, expected: '+ x'},
        {coefficient: 1, hasX: false, isFirst: false, expected: '+ 1'},
        {coefficient: 0, hasX: true, isFirst: true, expected: '0'},
        {coefficient: 0, hasX: false, isFirst: true, expected: '0'},
        {coefficient: 2, hasX: true, isFirst: true, expected: '2x'},
        {coefficient: -2, hasX: true, isFirst: true, expected: '-2x'},
        {coefficient: -2, hasX: true, isFirst: false, expected: '- 2x'},
    ])(
        'coefficient=$coefficient, hasX=$hasX, isFirst=$isFirst → "$expected"',
        ({coefficient, hasX, isFirst, expected}) => {
            expect(renderMember({coefficient, hasX}, isFirst)).toBe(expected)
        }
    )
})