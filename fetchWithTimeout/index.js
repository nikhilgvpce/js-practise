function fetchWithTimeout(timeout, cb) {

    const abortController = new AbortController();

    fetch('https://api.coincap.io/v2/assets', {
        method: 'GET',
        signal: abortController.signal,
        headers: {
            Connection: 'keep-alive',
            'Content-Type': 'application/json; charset=utf-8',
            'Etag': 'W/"7c43-Kis93RZINMxgTTQkQ1jLINrJXhU"',
            'Date': new Date().toLocaleDateString()
        }
    })
        .then(data => {
            clearTimeout(timer);
            data.json();
        })
        .then((data) => {
            console.log(data);
            cb(data);
        })
        .catch((err) => {
            clearTimeout(timer);
            console.log('api call failed because of ', err)
        })

    let timer = setTimeout(() => {
        abortController.abort();
        clearTimeout(timer);
        timer = null;
        console.log('aborted api call')
    }, timeout)
}

fetchWithTimeout(900, (data) => {
    console.log(data);
})