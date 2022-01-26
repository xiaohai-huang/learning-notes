function baz() {
  // call-stack is: `baz`
  // so, our call-site is in the global scope
  console.log("baz");
  bar(); // <-- call-site for `bar`
}

function bar() {
  // call-stack is: `baz` -> `bar`
  // so, our call-site is in `baz`

  console.log("bar");
  foo(); // <-- call-site for `foo`
}

function foo() {
  // call-stack is: `baz` -> `bar` -> `foo`
  // so, our call-site is in `bar`

  debugger; // remove this line to view the console output

  console.log("foo");
}

baz(); // <-- call-site for `baz`

// Retrieved from https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch2.md