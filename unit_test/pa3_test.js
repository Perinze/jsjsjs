/* This file is for testing lazy.js
 * it may help to revisit your initial pa3 submission */

const test_delay = (delay) => {
  let variable = false;
  let t = delay(() => { variable = true; return 2; });
  if (variable == true) return false;
  if (force(t) != 2) return false;
  if (variable != true) return false;
  return true;
};

const test_enumFrom = (enumFrom) => {
  let x = enumFrom(42);
  for (var i=42; i < 100; i++) {
    if (force(x) != i) return false;
  }
  return true;
};

const test_map = (map) => {
  let x = enumFrom(42);
  let y = map(a => a * a, x);
  for (var i=42; i < 100; i++) {
    if (force(x) != i * i) return false;
  }
  return true;
};

const test_zipWith = (zipWith) => {
  let x = enumFrom(42);
  let y = enumFrom(0);
  let mul = zipWith((a, b) => a * b, x, y);
  for (var i=0; i < 100; i++) {
    if (force(mul) != i * (i + 42)) return false;
  }
  return true;
};

const test_tail = (tail) => {
  let x = enumFrom(42);
  let t = tail(x);
  if (force(t) != 43) return false;
  if (force(t) != 44) return false;
  return true;
};

const test_cons = (cons) => {
  let x = enumFrom(42);
  let t = cons(99, x);
  if (force(t) != 99) return false;
  if (force(t) != 42) return false;
  if (force(t) != 43) return false;
  return true;
};

exports.test_delay = test_delay;
exports.test_enumFrom = test_enumFrom;
exports.test_map = test_map;
exports.test_zipWith = test_zipWith;
exports.test_tail = test_tail;
exports.test_cons = test_cons;
