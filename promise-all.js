import { asyncTask } from "./util/asyncTask";

const promisesArr = [
  asyncTask(3),
  asyncTask(1),
  asyncTask(2),
  asyncTask(1),
  asyncTask(0),
];

const promiseAllImplementation = (arr = []) => {
  const result = [];
  return new Promise(async (resolve, reject) => {
    for (prom of arr) {
      try {
        const res = await prom;
        result.push(res);
      } catch (err) {
        reject(err);
      }
    }
    resolve(result);
  });
};

const promiseAll = (arr) => {
  //   Promise.all(arr).then(
  //     (resolvedPromises) => resolvedPromises.forEach((pr) => console.log(pr)),
  //     (err) => console.log("Error", err)
  //   );

  promiseAllImplementation(arr).then(
    (resolvedPromises) => resolvedPromises.forEach((pr) => console.log(pr)),
    (err) => console.log("Error", err)
  );
};

promiseAll(promisesArr);
