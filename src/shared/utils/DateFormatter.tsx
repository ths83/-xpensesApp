export function toYYYY_MM_DD(date: string): string {
  return new Date(date).toISOString().split('T')[0].toString();
}
