function Person(name) {
  this.Name = name;
  this.sayName = () => {
    console.log(`Hello, my name is ${this.Name}`);
  };
}

const person1 = new Person("xiaohai");
const person2 = new Person("dan-dan");

person2.sayName();
// [[implict binding]] cannot change `this`
// p1's sayName still points at person1
person2.sayName = person1.sayName;
person2.sayName();

// [[explict binding]] cannot change `this`
console.log(person1);
person2.sayName.call(person1);