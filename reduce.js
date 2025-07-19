function aggregate() {
	const arr = [1, 2, 3, 4];
	const sum = arr.reduce((prev, curr) => {
		return prev + curr;
	}, 0);
	console.log(sum);
}

aggregate();

function segregate() {
	const arr = [1.1, 1.2, 1.3, 2.1, 2.2, 3.1, 3.2, 4.1];
	const res = arr.reduce((prev, curr) => {
		const res = Math.floor(curr);
		if(!prev[res]) {
			prev[res] = [];
		}
		prev[res].push(curr);
		return prev;
	}, {})
	console.log(res);
}

segregate();

// execute a function in series

function primarySchool(str) {
	console.log(str +"'s " + "primary schooling done");
	return str;
}

function secondaySchool(str) {
	console.log(str +"'s " + "seconday schooling done");
	return str;
}

function graduation(str) {
	console.log(str +"'s " + "graduation done");
}

const arr = [primarySchool, secondaySchool, graduation];

function sequenceOfEducation() {
	arr.reduce((prev, curr) => {
		const res = curr(prev);
		return res;
	}, "Nikhil");

}

sequenceOfEducation();

// execute promises in sequence

const asyncTask = (timer) => {
	return new Promise((resolve) => { 
		return setTimeout(() => {
			resolve(`task done with timer ${timer}`);
		}, timer * 1000);
	});
}

const tasksArr = [asyncTask(3), asyncTask(1), asyncTask(2), asyncTask(4)];

function runTasksInSeries() {
	tasksArr.reduce((prev, curr) => {
		return prev.then(() => {
			return curr.then((res) => {
				console.log(res)
			})
		});
	}, Promise.resolve());
}

runTasksInSeries();

