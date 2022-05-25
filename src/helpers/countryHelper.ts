export const CalculateTotalValue = (value: number, currency: string, exchangeRate: number) => {
  if (value === 0) return `${value} ${currency}`;
  else return `${Number(value * exchangeRate).toFixed(2)} ${currency}`;
};
