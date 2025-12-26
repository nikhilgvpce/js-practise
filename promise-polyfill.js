const STATES = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2,
};

class MyPromise {
  constructor(callback) {
    this.value = "";
    try {
      callback(this._resolve, this._reject);
    } catch (err) {
      this._reject(err);
    }
  }

  _resolve = (value) => {
    this._updateHandler(value, STATES.FULFILLED);
  };

  _reject = (error) => {
    this._updateHandler(error, STATES.REJECTED);
  };

  _updateHandler = (value, state) => {
    this.state = state;
    this.value = value;
    this._executeHandler();
  };

  _executeHandler = () => {
    if (this.state === STATES.PENDING) return;
    setTimeout(() => {
      // this.handlers.
    }, 0);
  };

  then = (onSuccess, onReject) => {
    return new MyPromise((resolve, reject) => {
      this.addHandler({
        onSuccess: (value) => {
          if (!onSuccess) {
            return resolve(value);
          }
          try {
            return resolve(onSuccess(value));
          } catch (err) {
            return reject(err);
          }
        },
        onReject: (err) => {
          if (!onReject) {
            return reject(err);
          }
          try {
            return reject(onReject(err));
          } catch (err) {
            return reject(err);
          }
        },
      });
    });
  };

  catch = (onFailure) => {
    this.then(null, onFailure);
  };

  finally = (cb) => {
    this.then(
      (value) => MyPromise._resolve(cb()).then(() => value),
      (err) =>
        MyPromise._reject(cb()).then(() => {
          throw err;
        })
    );
  };
}
