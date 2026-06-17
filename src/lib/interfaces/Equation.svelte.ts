import type { EquationMember } from "./EquationMember.svelte.js";

export interface Equation {
    members: EquationMember[];
    rendered: string;
    solution: number;
}