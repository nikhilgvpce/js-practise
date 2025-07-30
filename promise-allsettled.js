Promise.allSettled = (promises) => {
	const resolvedPromises = promises.map((p) => Promise.resolve(p).then(
		value => ({status: "resolved", value}),
		reason => ({status: "rejected", reason})
	))

	return Promise.all(resolvedPromises);

}

const resolveTask = (timer) => {
	return Promise.resolve(() => {
		setTimeout(() => {
			console.log('inside resolve', timer);
		}, timer * 1000)
	})
}

const rejectTask = (timer) => {
	return Promise.reject(() => {
		console.log(timer);
		setTimeout(() => {
			console.log('inside reject', timer);
		}, timer * 1000)
	})
}

const tasks = [resolveTask(4), resolveTask(2), rejectTask(3), rejectTask(1), resolveTask(5), rejectTask(2)];

Promise.allSettled(tasks).then((res) => console.log(res));