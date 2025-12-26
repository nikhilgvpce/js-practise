function rejectedPromiseFunc() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("I am rejected promise ");
    }, 1000);
  });
}

rejectedPromiseFunc()
  .then(null, (err) => {
    console.log("caught in then's error block", err);
    throw Error("thrwing from then's error block");
  })
  .catch((err) => {
    console.log("caught in catch's error block", err);
  });
