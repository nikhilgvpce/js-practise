
const createAsync = (retries) => {
	return new Promise((resolve, reject) => {
		// console.log('Promise retries', retries)
		if(retries === 1) {
			resolve(`resolved`);
		} else {
			reject(`rejected`);
		}
	})
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));



const retry = async(asyncFn, retries = 3, delay = 50, finalError = 'Failed') => {

	try {
		const res = await asyncFn(retries);
		console.log(res)
	} catch ( err ) {
		console.log('catch retries', retries)
		if(retries <= 0) {
			return Promise.reject(finalError); 
		}
		await wait();
		return retry(asyncFn, retries - 1, delay, finalError)
	}
}


const retryThen = (asyncFn, retries = 3, delay = 50, finalError = 'Failed') => {

	return asyncFn(retries).then((res) => console.log(res)).catch((err) => {
		console.log('catched promises', retries)
		if(retries > 1) {
			return retryThen(asyncFn, retries - 1, delay, finalError)
		} else {
			Promise.reject(err)
		}
	})
}

console.log(retryThen(createAsync, 3, 50, 'Failed'));







