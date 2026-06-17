export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function randBool() {
    return Math.random() > 0.5
}