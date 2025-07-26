const task1 = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log("itask 1 started");
			resolve("task 1 resolved")
		}, 25000)
	})
}

const task2 = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log("task 2 started");
			resolve("task 2 resolved")
		})
	}, 30000)
}

const task3 = () => {
	return new Promise((reject) => {
		setTimeout(() => {
			console.log("settimeout task 3 started");
			reject("task 3 rejected")
		}, 200)
	})
}

const tasks = [task1, task2, task3];
// const tasks_dup = [task3, task2, task1];

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

race(tasks).then((result) => console.log(result)).catch((err) => console.log(err));

// race(tasks_dup).then((result) => console.log(result)).catch((err) => console.log(err));

// Promise.all() --> if anything rejected then don't execute ongoing and remaining promises

// Promise.any() --> if anything resolved then don't execute ongoing and remaining promises