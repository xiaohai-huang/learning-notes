function Person(name) {
  this.Name = name;
}

const p1 = {};
const PersonAnother = Person.bind(p1);
PersonAnother("dan-dan");

console.log(p1.Name);

const p2 = new PersonAnother("xiaohai");
console.log(p1.Name);
console.log(p2.Name);