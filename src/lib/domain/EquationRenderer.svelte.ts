import type {EquationMember} from "../interfaces/EquationMember.svelte";
import {randInt} from "./RandomUtils.svelte";
import {shuffle} from "./ArrayUtils.svelte";

export function render(members: EquationMember[]): string {
    const equalityPosition = randInt(1, members.length - 1)

    shuffle(members)
    members = members.map((m, i) => {
        if (i >= equalityPosition) return {...m, coefficient: m.coefficient * -1}
        return m
    })
    const renderedMembers: string[] = members.map((m, i) => renderMember(m, i === 0 || i === equalityPosition))
    renderedMembers.splice(equalityPosition, 0, '=')

    return renderedMembers.join(' ')
}

function renderMember(member: EquationMember, isFirstMember: boolean): string {
    let signal = member.coefficient < 0 ? '-' : '+';
    if (isFirstMember) signal = ''

    let coefficient = Math.abs(member.coefficient).toString()
    if (member.hasX && coefficient === '1') coefficient = ''

    return (
        signal +
        ' ' +
        coefficient +
        (member.hasX ? 'x' : '')
    )
}