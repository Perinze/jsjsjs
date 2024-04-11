/*
 * For this assignment we will be using the tree-sitter library
 * to parse JavaScript code into an AST. You can find the documentation
 * for tree-sitter here: https://tree-sitter.github.io/tree-sitter/
 */

const Parser = require("tree-sitter");
const JavaScript = require("tree-sitter-javascript");

// First we create a parser which we will use to parse our code
const parser = new Parser();
parser.setLanguage(JavaScript);

const toy_example_1 = () => {
  /*
   * Let's try out a toy example.
   * Given some Javascript code, let's see what the AST looks like.
   * (After using it, you can comment this code out.)
   */

  const exampleSourceCode = "let x = 1; console.log(x);";

  // The `tree` represents all the power of the AST
  const tree = parser.parse(exampleSourceCode);

  // We can print it out to see the (s-expression) representation
  console.log(tree.rootNode.toString());
};
toy_example_1();

const toy_example_2 = () => {
  // Here's an example of a function that could be passed in
  const exampleSourceCode = `
    function name(arg1, arg2) {
        let x = 0;
        if (arg1 > 0) {
            assert(false);
        }
    }`;

  const tree = parser.parse(exampleSourceCode);
  // The function has a `name`, a `parameters`, and a `body` node
  // console.log(tree.rootNode.toString());

  // Beyond inspecting the tree, we can interact with it using queries.
  // For example, let's find the `condition` expression in the code above.

  const query_str = `(if_statement 
        condition: (parenthesized_expression) @condition
        consequence: (_)
    )`;
  const query = new Parser.Query(JavaScript, query_str);
  query.matches(tree.rootNode).forEach((match) => {
    // We can print out the node that matches the query
    console.log(match.captures[0].node.toString());
    // (parenthesized_expression
    //      (binary_expression left: (identifier) right: (number)))
    // As expected, we find a binary expression between an identifier and a number
    // (the `arg1 > 0` expression)
  });
};
toy_example_2();

/*
 * Optional helper function:
 * Return a list of all the parameters used in the function
 * defintion.
 */
const find_parameter_names = (func_ast) => {
  // TODO: Implement this
  return [];
};

/*
 * Optional helper function:
 * Find all conditional expressions in the function which
 * depend on the given variable name
 */
const find_conditional_expressions = (func_ast, variable_name) => {
  // TODO: Implement this
  return [];
};

/*
 * Create a map from variable name to possible options
 * based on a conditional expression
 * required boundaries:
 *  comparison with a string (arg == "hello") (8points)
 *  comparison with a number (arg > 10) (8points)
 *  comparison with a binary operation (arg > 10 + 5) (4points)
 *  comparison with another argument (arg1 > arg2) (4points)
 *  beta-substitution (arg > x) [x := 10] (4points)
 *  complex analysis (4points)
 */
const get_decisions = (func_ast, variable_name, conditional) => {
  // TODO: Implement this
  return {};
};

const test_evaluation = (func_ast, parameter_values) => {
  let passed;
  try {
    eval(
      `(${func_ast.rootNode.text})(${Object.values(parameter_values).join(
        ", "
      )})`
    );
    passed = true;
  } catch (e) {
    passed = false;
  }

  return passed;
};

const detect_boundary = (func_ast) => {
  // Below is an example structure for this function.
  // You may choose to use it or create your own, as long as you follow the interface:
  // ast -> { pass: {args}, fail: {args}}

  // Start by finding parameters
  const parameter_names = find_parameter_names(func_ast);

  for (const parameter_name of parameter_names) {
    // Find conditional expressions that depend on the parameter
    const conditional_expressions = find_conditional_expressions(
      func_ast,
      parameter_name
    );

    // For each conditional expression, create a map from variable name to possible options
    const decisions = get_decisions(
      func_ast,
      parameter_name,
      conditional_expressions
    );

    // TODO: collate the decisions into a datastructure
  }

  // TODO: create a parameter selection generator

  let results = {
    pass: undefined,
    fail: undefined,
  };

  while (results["pass"] === undefined || results["fail"] === undefined) {
    // Use the helper function to test different evaluation patterns
    // make a parameter set choice
    let param_choice = {};
    let passed = test_evaluation(func_ast, param_choice);
    if (passed && !results["pass"]) {
      results["pass"] = param_choice;
    } else if (!passed && !results["fail"]) {
      results["fail"] = param_choice;
    }
  }

  /*
   * Return two maps from parameter name to values
   * "pass" contains parameter values that will not raise an exception
   * "fail" contains parameter values that will raise an exception
   */
  return results;
};

exports.detect_boundary = detect_boundary;
