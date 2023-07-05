const fs = require("fs");

const getRandomFloat = (lowerBound = 0, upperBound = 1) =>
    Math.random() * (upperBound - lowerBound) + lowerBound;

const getRandomInteger = (lowerBound, upperBound) => Math.floor(getRandomFloat(lowerBound, upperBound))

const getRandomSequence = (generator, size) => Array.from({length: size}, generator);

const writeJsonSync = (path, data) => fs.writeFileSync(path + ".json", JSON.stringify(data));

const randomIntegers10k = getRandomSequence(() => getRandomInteger(0, 10000), 10_000);
const randomIntegers100k = getRandomSequence(() => getRandomInteger(0, 10000), 100_000);
const randomIntegers1m = getRandomSequence(() => getRandomInteger(0, 10000), 1_000_000);

writeJsonSync("integers-10k", randomIntegers10k);
writeJsonSync("integers-100k", randomIntegers100k);
writeJsonSync("integers-1m", randomIntegers1m);
