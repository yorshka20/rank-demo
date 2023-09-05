export function arrayEquals(a: number[], b: number[]) {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}
