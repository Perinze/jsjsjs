/* This file is for testing helpers.js, require-js.js, lazy.js
 * it may help to revisit your initial pa2 submission           */

const test_for_ = (for_) => {
  let test_for_1 = (for_) => {
    let cond = x => x < 4;
    let next = x => x + 1;
    let sum = 0;
    let fbody = x => sum += x;
    for_(1, cond, next, fbody);
    if (sum == 6) return true;
    else return false;
  }
  let test_for_2 = (for_) => {
    let cond = x => x != 0;
    let next = x => x - 1;
    let acc = List();
    let fbody = x => acc = acc.concat(List([x]));
    for_(4, cond, next, fbody);
    if (acc.equals(List([4, 3, 2, 1]))) return true;
    else return false;
  }
  let result = test_for_1(for_);
  result = result && test_for_2(for_);
  return result;
};

const test_each = (each) => {
  let test_each_1 = (each) => {
    let ls = List([2, 5, 3, 7]);
    let sum = 0;
    let acc = List();
    let f = x => {
      sum += x;
      acc = acc.concat([x+1]);
    };
    each(ls, f);
    if (sum != 17 || !acc.equals(List([3, 6, 4, 8]))) return false;
    return true;
  }
  let result = test_each_1(each);
  return result;
};

// test.json exists in the auto-grader folder. You can load this file in for testing
// with loadJSONFile("test.json")
// it has the following structure:
// {
//   "key": 10,
//   "key2": 20
// }
const test_loadJSONFile = (loadJSONFile) => {
  let json = loadJSONFile("test.json");
  if (json.key != 10) return false;
  if (json.key2 != 20) return false;
  return true;
};

exports.test_for_ = test_for_;
exports.test_each = test_each;
exports.test_loadJSONFile = test_loadJSONFile;
