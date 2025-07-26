Promise.prototype.finally = (callback) => {
	if(typeof callback !== 'function') {
		return this.then(callback, callback);
	}

	const P = this.constructor || Promise;

	return this.then(
		v => P.resolve(callback()).then(() => v),
		err => P.reject(callback()).then(() => err)
	)
}