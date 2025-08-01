
const states = {
	PENDING: 0,
	FULFILLED: 1,
	REJECTED: 2
}

class MyPromise {

	constructor(callback) {
		this.state = states.PENDING;
		this.handlers = [];
		this.value = undefined;

		try {
			callback(this.resolve, this.reject);
		} catch (err) {
			this.reject(err);
		}
	}

	resolve = (value) => {
		this.handleUpdate(states.FULFILLED, value);
	}

	reject = (value) => {
		this.handleUpdate(states.REJECTED, value);
	}

	handleUpdate = (state, value) => {
		if(state === states.PENDING) return;

		this.state = state;
		this.value = value;

		this.exuectuteHandler();
	}

	exuectuteHandler = () => {
		if(this.state === states.PENDING) return;

		this.handlers.forEach((handler) => {
			if(this.state === states.FULFILLED) {
				handler.promSuccess(this.value);
			}
			handler.promFailure(this.value);
		})
	}

	addHandler = (handler) => {
		this.handlers.push(handler);
		exuectuteHandler();
	}

	then = (promSuccess, promFailure) => {
		return new MyPromise((onResolve, onReject) => {
			this.addHandler({
				promSuccess: (value) => {
					if(!promSuccess) return onResolve(value)
					try {
						return onResolve(promSuccess(value))
					} catch(err) {
						onReject(promFailure(err))
					}
				},
				promFailure: (value) => {
					if(!promFailure) return onReject(value)
					try {
						return onReject(promFailure(value))
					} catch(err) {
						onReject(promFailure(err))
					}
				}
			})
		})
	}

	catch = (onErr) => {
		this.then(null, onErr())
	}

	finally = (callback) => {
		return new MyPromise((onResolve, onReject) => {
			let wasResolved;
			let value;

			this.then((val) => {
				value = val;
				wasResolved = true;
				return callback();
			}).catch((err) => {
				value = val;
				wasResolved = false;
				return callback();
			});

			if(wasResolved) {
				onResolve(value);
			} else {
				onReject(value);
			}
		})
	}

}



const prom = new MyPromise((resolve) => {
	setTimeout(() => {
		resolve("I am resolved")
	}, 4000);
})

prom.then((res) => {
	console.log(res);
}).finally(() => {
	console.log("finally executed")
})