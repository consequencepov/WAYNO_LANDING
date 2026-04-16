export function formatNumber(n: number, digits = 2): string {
  return String(n).padStart(digits, '0')
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
