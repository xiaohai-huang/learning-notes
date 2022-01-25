function sayNameFunc() {
  console.log(`Hello, my name is ${this.name}`);
}

const person = {
  name: "xiaohai",
  sayName: sayNameFunc,
};

const home = {
  name: "QuanZhou",
  owner: person,
};

person.sayName(); // Hello, my name is xiaohai
home.owner.sayName(); // Hello, my name is xiaohai