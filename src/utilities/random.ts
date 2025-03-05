/**
 * This function uses the Box-Muller transform to generate roughly normally
 * distributed numbers. Based on code from this Stack Overflow post:
 * https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve/49434653#49434653
 *
 * @returns A roughly normally distributed random number between 0 and 1, inclusive.
 */
function normalRandom() {
  let u = 0,
    v = 0;
  while (u === 0) {
    u = Math.random(); //Converting [0,1) to (0,1)
  }
  while (v === 0) {
    v = Math.random();
  }
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) {
    return normalRandom(); // resample between 0 and 1
  }
  return num;
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export { normalRandom, shuffleArray };
