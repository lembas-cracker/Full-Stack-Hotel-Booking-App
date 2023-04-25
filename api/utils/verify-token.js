const jwt = require('jsonwebtoken')
const { createError } = require("./error");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token) {
        return next(createError(401, "You are not athenticated!"))
    }

    jwt.verify(token, process.env.JWT, (error, userPayload) => {
        if(error) return next(createError(403, "Token is not valid."))
        req.user = userPayload
        next()
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            if(error) return next(createError(403, "You are not authorized."))
        }
    })
}


const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.isAdmin) {
            next()
        } else {
            if(error) return next(createError(403, "You are not authorized."))
        }
    })
}


module.exports = {verifyToken, verifyUser, verifyAdmin}