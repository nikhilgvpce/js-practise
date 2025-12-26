const { asyncTask } = require("./util/asyncTask");

const tasksArr = [
  asyncTask(3, true),
  asyncTask(4),
  asyncTask(5),
  asyncTask(1, true),
  asyncTask(2),
  asyncTask(2, true),
];

const PromiseRace = (promArr) => {
  //   Promise.race(promArr).then(console.log, console.log);

  return new Promise((resolve, reject) => {
    promArr.forEach((prom) => {
      Promise.resolve(prom).then(resolve, reject);
    });
  });
};

PromiseRace(tasksArr).then(console.log, console.log);
