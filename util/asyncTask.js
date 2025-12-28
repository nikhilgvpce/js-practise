export const asyncTask = function (timer, shouldReject = false) {
  return new Promise((resolve, reject) => {
    console.log(" I am executed with timer", timer);
    setTimeout(() => {
      if (shouldReject) {
        reject(`promise rejected with timer ${timer}`);
        return;
      }
      resolve(`promise resolved with timer ${timer}`);
    }, timer * 1000);
  });
};
