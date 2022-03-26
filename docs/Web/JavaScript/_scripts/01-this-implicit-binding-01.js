function sayNameFunc() {
  console.log(`Hello, my name is ${this.name}`);
}

const person = {
  name: "xiaohai",
  sayName: sayNameFunc,
};

person.sayName(); // Hello, my name is xiaohai