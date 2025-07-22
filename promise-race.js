const task1 = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("task 1 resolved")
		})
	})
}

const task2 = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("task 2 resolved")
		})
	})
}

const task3 = () => {
	return new Promise((reject) => {
		setTimeout(() => {
			reject("task 3 rejected")
		})
	})
}

const tasks = [task1, task2, task3];
const tasks_dup = [task3, task2, task1];

const race = (tasks) => {
	return new Promise((resolve, reject) => {
		tasks.forEach((task) => {
			task().then((result) => {
				resolve(result);
			}).catch((err) => {
				reject(err);
			});
		});
	});
}

race(tasks).then((result) => console.log(result));

race(tasks_dup).then((result) => console.log(result));