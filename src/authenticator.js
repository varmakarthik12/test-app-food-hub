/*
    This is a test authToken
    eyJ0b2tlbiI6InNvbWUtc2VjcmV0LXRva2VuIiwiaWQiOiJzb21lVW5pcXVlVXNlciJ9

    This is how one can create a new user
    btoa(JSON.stringify({
        token: "some-secret-token",
        id: "someUniqueUser"
    }))
*/


const atob = require("atob"); //Since node don't have atob natively
const secretToken = "some-secret-token" // For the sake of this task

//Beware
const notProtectedAPIs = [{
    path: "/books",
    method: "GET"
}]

const isValidToken = (dummyJwt) => {
    //TODO: Handle this for not so JSON cases
    const { token } = JSON.parse(atob(dummyJwt)) ?? {} // This is a base64 string for this task
    return token === secretToken
}


const authenticator = (req, res, next) => {
    const { authorization } = req.headers;
    const { path, method } = req

    if (notProtectedAPIs.find(eachApi => eachApi.method === method && eachApi.path === path)) {
        console.log(`${path} is not a protected path`)
    } else if (!authorization) {
        res.status(401)
        res.send("Authentication error")
    } else if (!isValidToken(authorization)) {
        res.status(401)
        res.send("invalid token")
    }
    next()
}

const getSelf = (req) => {
    const { authorization } = req.headers;
    const { id } = JSON.parse(atob(authorization)) ?? {}

    return id;
}


module.exports = { authenticator, getSelf }