// Algorithm A from http://utopia.duth.gr/~pefraimi/research/data/2007EncOfAlg.pdf

export const weightedRandomShuffle = (arr) => {
  const shuffledArray = arr.map(([value, weight]) => [value, Math.random() ** (1 / weight)]);
  shuffledArray.sort((a, b) => b[1] - a[1]);
  return shuffledArray;
};

export const weightedRandomSample = (weightedArray, limit) => {
  const shuffledArray = weightedRandomShuffle(weightedArray);
  return shuffledArray.slice(0, limit).map(([value]) => value);
};
