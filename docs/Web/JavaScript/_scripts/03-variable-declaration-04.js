console.log(a);
if (a) {
  var a = 1;
  console.log(a);
}

function a() {
  console.log(this);
}

console.log(a);

a();