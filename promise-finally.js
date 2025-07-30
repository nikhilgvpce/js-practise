Promise.prototype.finally = (callback) => {
	if(typeof callback !== 'function') {
		this.then(callback, callback)
	}

	const P = this.constructor || Promise;

	return this.then(
		val => P.resolve(callback()).then(() => val),
		err => P.resolve(callback()).then(() => {throw err;})
	)
}