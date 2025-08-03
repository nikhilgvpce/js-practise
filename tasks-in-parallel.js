const createAsyncTask = () => {
	const value = Math.floor(Math.random() * 10);
	return function(cb) {
		setTimeout(() => {
			cb(value);
		}, value * 1000)
	}
}

const tasksInParallel = (tasks, cb) => {
	const results = [];
	let count = 0;
	tasks.forEach((task) => {
		task(value => {
			count++;
			results.push(value);
			console.log('value', value);
			if(count === tasks.length) {
				cb(results)
			}
		})
	})
}


const arr = [
	createAsyncTask(),
	createAsyncTask(),
	createAsyncTask(),
	createAsyncTask(),
	createAsyncTask(),
	createAsyncTask(),
	createAsyncTask()
]

tasksInParallel(arr, (res) => {
	console.log(res);
})