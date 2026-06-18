export function parseAnswer(raw: string): number | null {
    const parsingWorked = (n: any) => !Number.isNaN(n)

    raw =
        Array
            .from(raw)
            .filter(
                character => '+-,.0123456789/'.includes(character)
            )
            .join('')

    if (raw == '') return null

    if (raw.includes('/')) {
        const numerator = Number.parseInt(raw.split('/').at(0)!)
        const denominator = Number.parseInt(raw.split('/').at(1)!)

        if (denominator == 0) return null

        return numerator / denominator
    }

    const result = Number.parseFloat(raw)
    if (parsingWorked(result)) return result

    return null
}
