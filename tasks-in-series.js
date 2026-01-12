export const asyncTask = (timer, shouldReject = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(`promise rejected with timer ${timer}`);
        return;
      }
      resolve(`promise resolved with timer ${timer}`);
    }, timer * 1000);
  });
};

const tasks = [
  asyncTask(5),
  asyncTask(4),
  asyncTask(2),
  asyncTask(1),
  asyncTask(3),
];

const tasksInSeries = (tasks) => {
  const cb = (prevProm, currProm, index) => {
    console.log({ prevProm }, { currProm }, { index });
    return prevProm.then(() => {
      return currProm.then((currRes) => {
        console.log(currRes);
      });
    });
  };

  tasks.reduce(cb, Promise.resolve());
};

tasksInSeries(tasks);

const recurssiveSeriesExecutor = (arr = []) => {
  const prom = arr.shift();
  if (!prom) return;
  prom.then((val) => {
    console.log(val);
    recurssiveSeriesExecutor(arr);
  });
};

// recurssiveSeriesExecutor(tasks);
