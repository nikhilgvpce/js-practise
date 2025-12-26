const { asyncTask } = require("./util/asyncTask");

const tasksArr = [
  asyncTask(3, true),
  asyncTask(1, true),
  asyncTask(5),
  asyncTask(0, true),
];

const PromiseAny = (arr) => {
  //   Promise.any(arr).then(
  //     (res) => {
  //       console.log(res);
  //     },
  //     (err) => console.log("all rejected", err)
  //   );

  return new Promise((resolve, reject) => {
    const errorsArr = [];
    arr.forEach((prom) => {
      Promise.resolve(prom).then(
        (res) => resolve(res),
        (err) => {
          errorsArr.push(err);
          if (arr.length === errorsArr.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        }
      );
    });
  });
};

PromiseAny(tasksArr)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
