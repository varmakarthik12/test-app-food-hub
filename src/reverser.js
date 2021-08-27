const mung = require('express-mung');


const reverser = (eachBookObj) => {
    let out = {}
    for (const [key, val] of Object.entries(eachBookObj)) {
        out[key] = val?.split("")?.reverse()?.join("")
    }
    return out
}


const bookMiddleware = (...args) => {
    const [req, res, nx] = args;
    //For post
    const bodyObj = req.body
    req.body = reverser(bodyObj)

    //For get
    mung.json(
        (body, req, res) => body?.map(eachBookObj => reverser(eachBookObj))
    )(...args)
    nx()
}

module.exports = { bookMiddleware }