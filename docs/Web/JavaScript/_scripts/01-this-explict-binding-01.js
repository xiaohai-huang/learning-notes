function sayNameFunc() {
  console.log(`Hello, my name is ${this.Name}.`);
}

const person = {
  Name: "xiaohai",
};

const sayNameBinded = function () {
  sayNameFunc.call(person);
};

sayNameBinded();
sayNameBinded.call({ Name: "name passed by the line 14 call" });

sayNameFunc.call({ Name: "fake name" });
