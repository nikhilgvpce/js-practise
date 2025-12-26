const asyncFunc = (inp, cb) => {
	setTimeout(() => {
		inp = inp * 3;

		if(inp % 2 !== 0) {
			cb(null, inp)
		}

		cb(inp);
	}, 1500);
}

const arr = [1, 2, 3, 4, 5];

const executeElementAsync = (element, asyncFunc) => {
	return new Promise((resolve) => {
		asyncFunc(element, (result) => {
			resolve(result);
		});
	});
}

// const mapAsyncFun = (arr, asyncFunc) => {
// 	return new Promise((resolve, reject) => {
// 		const finalResult = [];
// 		const resultProm = arr.map(async(element) =>  await executeElementAsync(element, asyncFunc));
// 		resultProm.forEach((res) => {
// 			res.then((data) => {
// 				finalResult.push(data);
// 				if(finalResult.length === resultProm.length) {
// 					resolve(finalResult);
// 				}
// 			});
// 		});

// 	});
// }

mapAsyncFun(arr, asyncFunc).then((res) => {
	console.log('result is', res);
});