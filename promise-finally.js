Promise.prototype.myFinally = function (cb) {
  if (typeof cb !== "function") {
    return this.then(cb, cb);
  }
  const P = this.constructor || Promise;
  return this.then(
    (value) => P.resolve(cb()).then(() => value),
    (err) =>
      P.resolve(cb()).then(() => {
        throw err;
      })
  );
};

console.log(Promise.resolve(100).myFinally(42));

console.log(
  Promise.resolve(100).myFinally(() => {
    console.log("I am finally");
  })
);
