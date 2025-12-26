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
