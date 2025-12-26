const inpArr = [1, 2, 3, 4, 5, 6];

function findSumByReduce(arr) {
  function callbackFn(previousValue, currentValue) {
    return previousValue + currentValue;
  }

  const total = arr.reduce(callbackFn, 0);
  return total;
}

console.log(findSumByReduce(inpArr));

const decimalArr = [1.1, 1.2, 1.3, 2.1, 2.2, 3.1, 3.2, 3.3];

function floorArr(arr) {
  return arr.reduce((previousValue, currentValue) => {
    const floored = Math.floor(currentValue);
    if (!previousValue[floored]) {
      previousValue[floored] = [];
    }
    previousValue[floored].push(currentValue);
    return previousValue;
  }, {});
}

console.log(floorArr(decimalArr));
