function LogThis() {
  console.log(this);
}

const obj = { name: "xiaohai" };
obj.whatIsThis = LogThis;

console.log(this);
LogThis();
obj.whatIsThis();
