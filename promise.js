
const asyncTask = (timer) => {
	return new Promise((resolve, reject) => {
		if(timer == 2) {
			setTimeout(() => reject(`timer ${timer} rejected`), timer * 1000);
		} else {
			setTimeout(() => resolve(`timer ${timer} resolved`), timer * 1000);
		}
	});
}

const arr = [
	() => asyncTask(3),
	() => asyncTask(1),
	() => asyncTask(2),
	() => asyncTask(4),
	() => asyncTask(7)
];

const promiseForOf = async(arr) => {
	const results = [];
	for(const prom of arr) {
		try {
			const res = await prom();
			console.log("result", res);
			results.push(res);
		} catch (err) {
			console.log("result", err);
			results.push(err);
			break;
		}
	}
	return results;
}

promiseForOf(arr).then((results) => {
	console.log("results is", results);
})


const promiseForEach = async(arr) => {
	const results = [];
	const prom = new Promise((resolve, reject) => {
		let promiseLength = 0;
		arr.forEach((prom, index) => {
			prom().then((res) => {
				results.push(res);
				promiseLength++;
				if(promiseLength === arr.length) {
					resolve(results);
				}
			}).catch(err => {
				promiseLength++;
				results.push(err);
			})
		});
	});
	const res = await prom;
	return prom.then(() => results);
}



promiseForEach(arr).then((results) => {
	console.log("res is", results);
});

