export function formatApy(apy) {
  if (apy === null || apy === undefined) return "N/A";

  const value = Number(apy);

  if (Number.isNaN(value)) return "N/A";

  return `${value.toFixed(2)} %`;
}
