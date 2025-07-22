
const asyncTask = (timer) => {
	return new Promise((resolve, reject) => {
		if(timer < 4) {
			setTimeout(() => {
				reject(`${timer} rejected`);
			}, timer * 1000);
		} else {
			setTimeout(() => {
				resolve(`${timer} resolved`);
			}, timer * 1000);
		}
	});
}

const tasks = [
	() => asyncTask(3),
	() => asyncTask(2),
	() => asyncTask(1),
	() => asyncTask(5),
	() => asyncTask(8),
	() => asyncTask(4)
];

const promiseAny = (tasks) => {
	const results = [];
	return new Promise((resolve) => {
		tasks.forEach(async(task) => {
			try {
				const prom = await task();
				console.log("prom", prom);
				results.push(prom);
				resolve(results);
			} catch(err) {
				results.push(err)
			}
		});
	});
}

// promiseAny(tasks).then((res) => {
// 	console.log("results is ", res)
// });

const task1 = () => new Promise((resolve, reject) => {
	setTimeout(reject, 100, 'one');
});

const task2 = () => new Promise((resolve, reject) => {
	setTimeout(resolve, 10, 'two');
});

const task3 = () => new Promise((resolve, reject) => {
	setTimeout(reject, 150, 'three');
});

promiseAny([task1, task2, task3]).then((res) => {
	console.log("result is", res);
})