function sayCity() {
  {
    let city = "Quanzhou";
    {
      var city = "Shenzhen";
      console.log(city);
    }
    console.log(city);
  }
  // var is function-scoped, so city would be accessible here
  // if it didn't throw a SyntaxError
  console.log(city);
}
sayCity()