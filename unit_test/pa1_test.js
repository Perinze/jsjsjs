/* This file is for testing quick.js (we won't test extra.js) 
 * it may help to revisit your initial pa1 submission         */

const { List } = require('immutable')

const fold_left = function (f, base, ls) {
  if (ls.size == 0) {
    return base;
  }

  // Write the recursive fold_left call
  return fold_left(f, f(base, ls.get(0)), ls.slice(1));
};

const test_fold_left = (fold_left) => {
    let test_empty = (fd) => {
        return fd((acc, x) => acc + x, 42, List()) == 42;
    }
    let test_sum = (fd) => {
        return fd((acc, x) => acc + x, 1, List([0, 1, 5, 3, 2, 4])) == 16;
    }
    let result = test_empty(fold_left);
    result = result && test_sum(fold_left);
    return result;
}

console.log(test_fold_left(fold_left));

const test_map = (map) => {
    // TODO: Add tests for map

    // Return false if this implementation is incorrect
    return false;
}


const test_filter = (filter) => {
    // TODO: Add tests for filter

    // Return false if this implementation is incorrect
    return false;
}


const test_partition = (partition) => {
    // TODO: Add tests for partition

    // Return false if this implementation is incorrect
    return false;
}


const test_quicksort = (quicksort) => {
    // TODO: Add tests for quicksort

    // Return false if this implementation is incorrect
    return false;
}


/* DO NOT MODIFY BELOW THIS LINE */
exports.test_fold_left = test_fold_left;
exports.test_map = test_map;
exports.test_filter = test_filter;
exports.test_partition = test_partition;
exports.test_quicksort = test_quicksort;