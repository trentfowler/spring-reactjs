/**
 * Implementation of the Promise "state machine." Needed to wrap the follow
 * func in follow.js in a Promise before passing your objects off to
 * loadFromServer() when making REST api calls.
 *
 * Modified from source below to meet needs for this project:
 * https://stackoverflow.com/questions/23772801/basic-javascript-promise-implementation-attempt
 */

'use strict';

var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

function Promise(fn) {
    if (typeof this != 'object')
        throw new TypeError('Promises must be constructed via new');
    if (typeof fn != 'function')
        throw new TypeError('fn must be a function');

    var state = PENDING;
    var value = null;
    var handlers = [];

    function resolve(result) {
        try {
            var then = getThen(result);
            if (then) {
                doResolve(then.bind(result), resolve, reject)
                return
            }
            state = FULFILLED;
            value = result;
        } catch(e) {
            reject(e);
        }
    }

    function reject(error) {
        state = REJECTED;
        value = error;
    }

    function handle(handler) {
        if (state == PENDING) {
            handlers.push(handler);
        } else {
            if (state == FULFILLED && typeof handler.onFulfilled === 'function') {
                handler.onFulfilled(value);
            }
            if (state == REJECTED && typeof handler.onRejected === 'function') {
                handler.onRejected(value);
            }
        }
    }

   this.done = function (onFulfilled, onRejected) {
        setTimeout(function() {
            handle({
                onFulfilled: onFulfilled,
                onRejected: onRejected
            });
        }, 0);
    }

    this.then = function (onFulfilled, onRejected) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return self.done(function (result) {
                if (typeof onFulfilled === 'function') {
                    try {
                        return resolve(onFulfilled(result));
                    } catch (e) {
                        return reject(ex);
                    }
                } else {
                        return resolve(result);
                }
            }, function (error) {
                if (typeof onRejected === 'function') {
                    try {
                        return resolve(onRejected(error));
                    } catch(e) {
                        return reject(e);
                    }
                } else {
                    return reject(error);
                }
            });
        });
    }

    doResolve(fn, resolve, reject);
}

function getThen(value) {
    if (result && (typeof result === 'object' || typeof result === 'function')) {
        var then = value.then;
        if (typeof then === 'function') {
            return then;
        }
    }
    return null;
}

function doResolve(fn, onFulfilled, onRejected) {
    var done = false;
    try {
        fn(function (value) {
            if (done) return
            done = true
            onFulfilled(value)
        }, function (reason) {
            if (done) return
            done = true
            onRejected(reason)
        });
    } catch (e) {
        if (done) return
        done = true
        onRejected(e)
    }
}