"use strict"

function errorHandler(err, req, res, next) {
    console.log(err)
    if (err.name === 'SequelizeValidationError') {
        let newError = []
        err.errors.forEach(element => {
            newError.push(element.message)
        });
        res.status(400).json(newError)
    } else if (err.name === 'JsonWebTokenError') {
        let message = 'Unauthorized'
        res.status(401).json(message)
    }
    else if (err.name === 'not found') {
        res.status(404).json(err.message)
    }
    else {
        res.status(500).json(err.message)
    }
}

module.exports = errorHandler