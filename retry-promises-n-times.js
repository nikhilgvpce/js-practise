const asyncTask = () => {
  return new Promise((resolve, reject) => {
    const value = Math.random() * 10;
    setTimeout(() => {
      if (value < 9) reject(`rejected with timer', ${value}`);
      resolve(`resolved with timer ${value}`);
    }, value * 1000);
  });
};

const wait = (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delay * 1000);
  });
};

const retryFn = (task, retries, delay, finalError = "Failed") => {
  task()
    .then((value) => {
      console.log(value);
    })
    .catch((err) => {
      if (retries > 0) {
        wait(task).then(() => {
          console.log(err);
          console.log("--------retrying----------");
          console.log("-----remaining retries-----", retries - 1);
          retryFn(task, retries - 1, delay);
        });
      } else {
        console.log(finalError);
      }
    });
};

// retryFn(asyncTask, 3, 2);

const asyncAwaitRetry = async (task, retries, delay, finalError = "Failed") => {
  try {
    await task();
    return Promise.resolve("resolved asyncTask");
  } catch (err) {
    if (retries <= 0) {
      return Promise.reject(finalError);
    }

    await wait(delay);

    return asyncAwaitRetry(task, retries - 1, 2);
  }
};

asyncAwaitRetry(asyncTask, 3, 1).then(console.log).catch(console.log);
