const integers10k = require("./integers-10k.json");
const integers100k = require("./integers-100k.json");
const integers1m = require("./integers-1m.json");

/**
 * Asserts that an array is sorted in ascending order
 * @param arr {number[]}
 * @returns {boolean}
 */
const isSorted = (arr) => arr.every((value, index, array) => index <= 0 || value > array[index - 1]);

/**
 * Swaps two values in an array by their indices
 * @param arr {any[]}
 * @param from {number}
 * @param to {number}
 */
const swap = (arr, from, to) => {
    const tmp = arr[to];
    arr[to] = arr[from];
    arr[from] = tmp;
}

const benchmarkFunction = (label, fn, ...args) => {
    console.time(label);
    fn(...args);
    console.timeEnd(label);
}

/**
 * Selection sort
 * @param arr {number[]}
 * @returns {number[]}
 */
const selectionSort = (arr) => {
    const copy = [...arr];

    for (let i = 0; i < copy.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < copy.length; j++) {
            if (copy[j] < copy[minIndex]) {
                minIndex = j;
            }
        }

        swap(copy, i, minIndex);
    }

    return copy;
}

/**
 * Insertion sort
 * @param arr {number[]}
 * @returns {number[]}
 */
const insertionSort = (arr) => {
    const copy = [...arr];

    let i = 1;
    for (; i < copy.length; i++) {
        if (copy[i] < copy[i - 1]) {
            swap(copy, i, i - 1);

            if (i > 1) {
                i -= 2; // Subtract 2 as for loop will add 1
            }
        }
    }

    return copy;
}

/**
 * Merge sort
 * @param arr {number[]}
 * @returns {number[]}
 */
const mergeSort = (arr) => {
    const copy = [...arr];

    for (let binSize = 1; binSize <= copy.length; binSize *= 2) {
        for (let leftHead = 0; leftHead < copy.length; leftHead += binSize * 2) {
            const rightHead = leftHead + binSize;

            const leftBin = copy.slice(leftHead, rightHead);
            const rightBin = copy.slice(rightHead, rightHead + binSize);

            for (let i = leftHead; i < binSize * 2 && i < copy.length; i++) {
                copy[i] = leftBin[0] < rightBin[0] || rightBin.length < 1 ? leftBin.shift() : rightBin.shift();
            }
        }
    }

    return copy;
}

const algorithms = {
    selectionSort,
    insertionSort,
    mergeSort
};

const testData = [4, 2, 1, 3, 0];

Object.entries(algorithms).forEach(([name, sort]) => {
    const sorted = sort(testData);
    const correct = isSorted(sorted);

    console.log(`-- ${name} --`);
    console.log(`  input: ${testData}`);
    console.log(` output: ${sorted}`);
    console.log(`correct: ${correct}`);

    if (correct && process.env.RUN_BENCHMARKS) {
        benchmarkFunction("10k integers", sort, integers10k);
        benchmarkFunction("100k integers", sort, integers100k);
        benchmarkFunction("1m integers", sort, integers1m);
    }

    console.log("");
})
