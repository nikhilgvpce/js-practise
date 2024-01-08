function asyncFunction() {
    const value = Math.floor(Math.random() * 10);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (value < 5) {
                resolve(value)
            } else {
                reject(value)
            }
        }, value)
    })
}

function lastCb() {
    console.log('executed lastCallback function')
}

function main() {
    const promisesArr = [asyncFunction, asyncFunction, asyncFunction, asyncFunction];
    let completed = 0;
    promisesArr.forEach((prom) => {
        prom().then((value) => {
            console.log(value);
            completed++;
        }).catch((err) => {
            console.log('rejected with error', err);
            completed++;
        }).finally(() => {
            if (completed >= promisesArr.length) {
                lastCb();
            }
        })
    })
}

main();