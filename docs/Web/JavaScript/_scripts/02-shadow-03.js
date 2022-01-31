function getTodos() {
  {
    let userId = 1;

    (() => {
      var userId = 7;
      console.log(userId);
    })();
    console.log(userId);
  }
}

getTodos();