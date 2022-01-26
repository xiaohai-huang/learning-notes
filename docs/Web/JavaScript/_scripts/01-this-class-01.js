class Person {
  constructor(name) {
    this.Name = name;
  }
  sayNameMethod() {
    console.log(`Hello, my name is ${this.Name}`);
  }
  sayNamePropFunc = function () {
    console.log(`Hello, my name is ${this.Name}`);
  };
  sayNamePropArrow = () => {
    console.log(`Hello, my name is ${this.Name}`);
  };
}

const person1 = new Person("xiaohai");

person1.sayNameMethod();
person1.sayNamePropFunc();
person1.sayNamePropArrow();

person1.sayNameMethod.call({ Name: "[[called by call(...)]]" }); // work
person1.sayNamePropFunc.call({ Name: "[[called by call(...)]]" }); // work
person1.sayNamePropArrow.call({ Name: "[[called by call(...)]]" }); // does not work