const person1 = {
  Name: "xiaohai",
  sayName: () => {
    console.log(`Hello, my name is ${this.Name}`);
  },
};

const person2 = {};
person2.Name = "xiaohai";
person2.sayName = () => {
  console.log(`Hello, my name is ${this.Name}`);
};

// pre-es6
var self = this;
const person3 = {};
person3.Name = "xiaohai";
person3.sayName = function () {
  console.log(`Hello, my name is ${self.Name}`);
};

function sayName() {
  console.log(`Hello, my name is ${this.Name}`);
}

var Name = "[[Global Name]]";
person1.sayName(); // Hello, my name is [[Global Name]]
person2.sayName(); // Hello, my name is [[Global Name]]
person3.sayName(); // Hello, my name is [[Global Name]]
sayName(); // Hello, my name is [[Global Name]]