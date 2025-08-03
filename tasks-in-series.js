
const asyncTask = (timer) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(`${timer} resolved`);
		}, timer * 1000)
	})
}

const input = [
	asyncTask(5),
	asyncTask(4),
	asyncTask(2),
	asyncTask(1),
	asyncTask(3)
];

const executeInSeries = async(input) => {
	for(inp of input) {
		const res = await inp;
		console.log(res);
	}
}

// executeInSeries(input);

const recurssiveCall = (input) => {
	const currInput = input.shift();
	if(!currInput) return;
	currInput.then((result) => {
		console.log(result);
		recurssiveCall(input);
	});
}

// recurssiveCall(input);


const promInSeries = (input) => {
	input.reduce((prev, curr) => {
		return prev.then((prom) => {
			return curr.then((res) => {
				console.log('resolved', res);
			});
		});
	}, Promise.resolve())
}

promInSeries(input);