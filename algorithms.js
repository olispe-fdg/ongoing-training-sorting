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

const algorithms = {selectionSort};

const data = [3, 2, 1];

Object.entries(algorithms).forEach(([name, sort]) => {
    const sorted = sort(data);
    console.log(`-- ${name} --`);
    console.log(`  Input : ${data}`);
    console.log(` Output : ${sorted}`);
    console.log(`Correct : ${isSorted(sorted)}\n`);
})
