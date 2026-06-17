import type {EquationOptions} from "../interfaces/EquationOptions.svelte";
import type {Equation} from "../interfaces/Equation.svelte";
import type {EquationMember} from "../interfaces/EquationMember.svelte";
import {randInt} from "./RandomUtils.svelte";
import {render} from "./EquationRenderer.svelte";

export function generateEquation(options: EquationOptions): Equation {
    const members: EquationMember[] = []
    const numberOfX = randInt(options.minNumberOfX, options.maxNumberOfX)
    const length = randInt(options.minLength, options.maxLength)

    let coefficient = 0;
    for (let i = 0; i < length; i++) {
        while (i < numberOfX && coefficient === 0) {
            coefficient = randInt(options.minCoefficient, options.maxCoefficient)
        }

        members.push({
            coefficient: randInt(options.minCoefficient, options.maxCoefficient),
            hasX: i < numberOfX
        })
    }

    const rendered = render(members)
    const solution = getSolution(members)

    console.log('solution', solution)

    return {
        members,
        rendered,
        solution
    }
}

function getSolution(members: EquationMember[]): number {
    const sumOfMembersWithX = (
        members
            .filter(m => m.hasX)
            .map(m => m.coefficient)
            .reduce((previous, current) => previous + current)
    )

    const membersWithoutX = members.filter(m => !m.hasX)
    let sumOfMembersWithoutX = 0
    if (membersWithoutX.length != 0) {
        sumOfMembersWithoutX = (
            membersWithoutX
                .map(m => m.coefficient)
                .reduce((previous, current) => previous + current)
        )
    }

    return (
        (-1 * sumOfMembersWithoutX / sumOfMembersWithX)
        // Math.round(
        //     (-1 * sumOfMembersWithoutX / sumOfMembersWithX) * 100
        // ) / 100
    )
}