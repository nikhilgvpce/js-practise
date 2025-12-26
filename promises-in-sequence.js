const promises = (timer) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`resolved with timer ${timer}`);
    }, timer * 1000);
  });
};

const arr = [promises(3), promises(1), promises(4), promises(5)];

const promisesInSequence = (arr) => {
  arr.reduce((previousProm, currentProm, index) => {
    console.log({ previousProm, currentProm, index });
    return previousProm.then(() => {
      return currentProm.then((curr) => {
        console.log(curr);
      });
    });
  }, Promise.resolve());
};

console.log(promisesInSequence(arr));
