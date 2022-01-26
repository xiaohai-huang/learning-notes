function Person(name) {
  this.Name = name;
  this.sayName = () => {
    console.log(`Hello, my name is ${this.Name}`);
  };
  // pre-es6
  var self = this;
  this.sayNameFunc = function () {
    console.log(`Hello, my name is ${self.Name}`);
  };
}

const person = new Person("xiaohai");
// polyfill: these two ways of defining functions have the same effect
person.sayName();
person.sayNameFunc();