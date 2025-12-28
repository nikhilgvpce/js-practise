export const asyncTask = () => {
  const value = Math.random() * 10;
  return function (callback) {
    setTimeout(() => {
      console.log("calling callback with value", value);
      callback(value);
    }, value * 1000);
  };
};

const tasks = [asyncTask(), asyncTask(), asyncTask(), asyncTask(), asyncTask()];

const tasksInParallel = (tasks, cb) => {
  const results = [];
  let tasksCompleted = 0;
  tasks.forEach((task) => {
    task((value) => {
      console.log("pushing with value", value);
      results.push(value);
      tasksCompleted++;
      if (tasksCompleted >= tasks.length) {
        cb();
      }
    });
  });
};

tasksInParallel(tasks, () => {
  console.log("Hi!, I am callback, now all tasks are executed");
});
