import type {EquationOptions} from "../interfaces/EquationOptions.svelte";
import type {Equation} from "../interfaces/Equation.svelte";
import type {EquationMember} from "../interfaces/EquationMember.svelte";
import {randInt} from "./RandomUtils.svelte";
import {render} from "./EquationRenderer.svelte";

export function generateEquation(options: EquationOptions): Equation {
    const numberOfX = randInt(options.minNumberOfX, options.maxNumberOfX)
    const length = randInt(options.minLength, options.maxLength)

    let coefficient = 0

    const members: EquationMember[] =
        new Array(length)
            .fill({})
            .map((_, i) => {
                do {
                    coefficient = randInt(options.minCoefficient, options.maxCoefficient)
                } while (i < numberOfX && coefficient === 0)

                return {
                    coefficient,
                    hasX: i < numberOfX
                }
            })

    const rendered = render(members)
    const solution = getSolution(members)

    return {
        members,
        rendered,
        solution
    }
}

export function getSolution(members: EquationMember[]): number | null {
    const xMembers = members.filter(m => m.hasX)
    if (xMembers.length === 0) return null

    const sumOfXMembers = (
        xMembers
            .map(m => m.coefficient)
            .reduce((previous, current) => previous + current)
    )

    if (sumOfXMembers === 0) return null

    const nonXMembers = members.filter(m => !m.hasX)
    let sumOfMembersWithoutX = 0
    if (nonXMembers.length != 0) {
        sumOfMembersWithoutX = (
            nonXMembers
                .map(m => m.coefficient)
                .reduce((previous, current) => previous + current)
        )
    }

    let solution = (-1 * sumOfMembersWithoutX / sumOfXMembers)
    if (solution === -0) solution = 0

    return solution
}