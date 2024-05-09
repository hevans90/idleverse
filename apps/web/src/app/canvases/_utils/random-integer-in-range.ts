export const randomIntegerInRange = (min: number, max: number) => {
  // Generate a random floating-point number between 0 and 1
  const randomFloat = Math.random();

  // Scale the random number to fit within the range [min, max)
  const randomScaled = randomFloat * (max - min) + min;

  // Round down to the nearest integer
  const randomInteger = Math.floor(randomScaled);

  return randomInteger;
};
