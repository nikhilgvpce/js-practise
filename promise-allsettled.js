const { asyncTask } = require("./util/asyncTask");

const inp = [asyncTask(1), asyncTask(2), asyncTask(0, true), asyncTask(3)];

const PromiseAllSettled = (arr = []) => {
  return new Promise((resolve) => {
    const result = [];
    arr.forEach((prom) => {
      prom
        .then(
          (res) => {
            result.push(res);
          },
          (err) => {
            result.push(err);
          }
        )
        .finally(() => {
          if (result.length === arr.length) {
            resolve(result);
          }
        });
    });
  });
};

PromiseAllSettled(inp).then(console.log);
