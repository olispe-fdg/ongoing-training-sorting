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

const algorithms = {
    selectionSort,
    insertionSort
};

const data = [4, 2, 1, 3];

Object.entries(algorithms).forEach(([name, sort]) => {
    const sorted = sort(data);
    console.log(`-- ${name} --`);
    console.log(`  Input : ${data}`);
    console.log(` Output : ${sorted}`);
    console.log(`Correct : ${isSorted(sorted)}\n`);
})
