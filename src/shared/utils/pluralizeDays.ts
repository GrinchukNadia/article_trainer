export function pluralizeDay(n: number): string {
  const abs = Math.abs(n);
  const lastDigit = abs % 10;
  const lastTwo = abs % 100;

  let word = "дней";

  if (lastTwo >= 11 && lastTwo <= 14) {
    word = "дней";
  } else if (lastDigit === 1) {
    word = "день";
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    word = "дня";
  }

  return `${n} ${word}`;
}