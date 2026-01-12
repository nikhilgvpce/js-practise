const asyncCallBackFn = (num, callBack) => {
  setTimeout(() => {
    num = num * 2;
    if (num === 12) {
      callBack(true);
    } else {
      callBack(null, num);
    }
  }, 1000);
};

const mapAsycnFn = (array = [], asyncFn) => {
  const result = [];
  return new Promise((resolve, reject) => {
    const innerProm = array.reduce((acc, current) => {
      return acc.then(() => {
        return new Promise((innerResolve, reject) => {
          asyncFn(current, (err, res) => {
            if (err) {
              reject(err);
            } else {
              result.push(res);
              innerResolve(result);
            }
          });
        });
      });
    }, Promise.resolve());
    innerProm.then((res) => resolve(res)).catch((err) => reject(err));
  });
};

mapAsycnFn([1, 2, 3, 4, 5], asyncCallBackFn)
  .then(console.log)
  .catch(console.log);
