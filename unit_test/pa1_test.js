/* This file is for testing quick.js (we won't test extra.js) 
 * it may help to revisit your initial pa1 submission         */

const { List } = require('immutable')

//const fold_left = function (f, base, ls) {
//  if (ls.size == 0) {
//    return base;
//  }
//
//  // Write the recursive fold_left call
//  return fold_left(f, f(base, ls.get(0)), ls.slice(1));
//}

const test_fold_left = (fold_left) => {
  let test_empty = (fd) => {
    return fd((acc, x) => acc + x, 42, List()) == 42;
  }
  let test_sum = (fd) => {
    return fd((acc, x) => acc + x, 1, List([0, 1, 5, 3, 2, 4])) == 16;
  }
  let test_mul = (fd) => {
    return fd((acc, x) => acc * x, 1, List([1, 5, 3, 2, 4])) == 120;
  }
  let result = test_empty(fold_left);
  result = result && test_sum(fold_left);
  result = result && test_mul(fold_left);
  return result;
}

//console.log(test_fold_left(fold_left));
//
//const map = function (f, ls) {
//  if (ls.size == 0) {
//    return ls;
//  }
//
//  return List([f(ls.get(0))]).concat(map(f, ls.slice(1)));
//}

const test_map = (map) => {
  let test_empty = (mp) => {
    return mp(x => x + 1, List()).equals(List());
  }
  let test_inc = (mp) => {
    return mp(x => x + 2, List([0, 1, 5, 3, 2, 4])).equals(List([2, 3, 7, 5, 4, 6]));
  }
  let test_to_str = (mp) => {
    return mp(x => String(x), List([1, 5, 3, 2, 4])).equals(List(['1', '5', '3', '2', '4']));
  }
  let result = test_empty(map);
  result = result && test_inc(map);
  result = result && test_to_str(map);
  return result;
}

//console.log(test_map(map));
//
//const filter = function (f, ls) {
//  if (ls.size == 0) {
//    return ls;
//  }
//  let g = (x) => {
//    if (f(x)) {
//      return [x];
//    } else {
//      return [];
//    }
//  }
//  return List(g(ls.get(0))).concat(filter(f, ls.slice(1)));
//}

const test_filter = (filter) => {
  let test_empty = (ft) => {
    return ft(x => false, List()).equals(List());
  }
  let test_odd = (ft) => {
    return ft(x => x % 2 == 1, List([0, 1, 5, 3, 2, 4])).equals(List([1, 5, 3]));
  }
  let test_lt4 = (ft) => {
    return ft(x => x < 4, List([1, 5, 3, 2, 4, 0])).equals(List([1, 3, 2, 0]));
  }
  let result = test_empty(filter);
  result = result && test_odd(filter);
  result = result && test_lt4(filter);
  return result;
}

//console.log(test_filter(filter));

const test_partition = (partition) => {
  let test_empty = (pt) => {
    return pt(x => false, List()).equals(List());
  }
  let test_odd = (pt) => {
    return pt(x => x % 2 == 1, List([0, 1, 5, 3, 2, 4])).equals(List([List([1, 5, 3]), List([0, 2, 4])]));
  }
  let test_lt3 = (pt) => {
    return pt(x => x < 3, List([1, 5, 3, 2, 4, 0])).equals(List([List([1, 2, 0]), List([5, 3, 4])]));
  }
  let result = test_empty(partition);
  result = result && test_odd(partition);
  result = result && test_lt3(partition);
  return result;
}

const test_quicksort = (quicksort) => {
  let test_empty = (qs) => {
    return qs(List()).equals(List());
  }
  let test_common = (qs) => {
    return qs(List([0, 1, 5, 3, 2, 4])).equals(List([0, 1, 2, 3, 4, 5]));
  }
  let test_already_in_order = (qs) => {
    return qs(List([0, 1, 2, 3, 4, 5])).equals(List([0, 1, 2, 3, 4, 5]));
  }
  let test_decreasing = (qs) => {
    return qs(List([5, 4, 3, 2, 1, 0])).equals(List([0, 1, 2, 3, 4, 5]));
  }
  let result = test_empty(partition);
  result = result && test_common(partition);
  result = result && test_already_in_order(partition);
  result = result && test_decreasing(partition);
  return result;
}

/* DO NOT MODIFY BELOW THIS LINE */
exports.test_fold_left = test_fold_left;
exports.test_map = test_map;
exports.test_filter = test_filter;
exports.test_partition = test_partition;
exports.test_quicksort = test_quicksort;