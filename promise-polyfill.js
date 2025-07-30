/*

const prom = new Promise(callback)

callback = (resolve, reject) => {}

prom.then(callback, callback)

prom.catch(callback)

*/


const states = {
	PENDING: 0,
	FULFILLED: 1,
	REJECTED: 2
}


class MyPromise {
	constructor(callback) {
		this.state = states.PENDING,
		this.handlers = [];

		try {
			this.callback(this._resolve, this._reject);
		} catch (err) {
			_reject(err)
		}
	}

	_resolve = (value) => {
		this._updateHandler(states.FULFILLED, value);
	}

	_reject = (value) => {
		this._updateHandler(states.REJECTED, value);
	}

	_updateHandler = (state, value) => {
		if(state === states.PENDING) {
			return;
		}

		setTimeout(() => {
			if(value instanceof MyProm) {
				value.then(this._resolve, this._reject);
			}

			this.state = state;
			this.value = value;

			this._executeHandlers();
		}, 0)
	}

	_executeHandlers = () => {
		if(this.state === states.PENDING) {
			return;
		}

		this.handlers.forEach((handler) => {
			if(this.state === states.FULFILLED) {
				return handler.onSuccess(this.value);
			}
			return handler.onFailure(this.value);
		});
		this.handlers = [];
	}

	_addHandler = (handler) => {
		this.handlers.push(handler);
		this._executeHandlers()
	}

	catch = (value) => {
		this.then(null, onFailure(value));
	}

	then = (resolve, reject) => {
		this._addHandler({
			onSuccess: (value) => {
				if(!onSuccess) {
					return resolve(value);
				}

				try {
					return resolve(onSuccess(value));
				} catch(err) {
					return reject(err);
				}
			},
			onFailure: (value) => {
				if(!onFailure) {
					return reject(value);
				}

				try {
					return reject(onFailure(value))
				} catch(err) {
					return reject(err)
				}
			}
		})
	}
}