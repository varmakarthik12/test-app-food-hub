
const { json } = require("body-parser");
const express = require("express")
const { authenticator, getSelf } = require("./authenticator")
const { bookMiddleware } = require("./reverser")
const fs = require("fs")


const someApp = express()
const filePath = `${process.cwd()}/db.json`

someApp.use(express.json());
someApp.use(authenticator);
someApp.use(bookMiddleware);


someApp.get("/books", (req, res) => {
    const fileData = fs.readFileSync(filePath, 'utf8')
    const parsedData = JSON.parse(fileData);

    res.send(parsedData)
})

someApp.post("/book", async (req, res) => {
    const currentRequestedUserId = getSelf(req)
    const reqBody = req.body

    const fileData = fs.readFileSync(filePath, 'utf8')//Since this is for a file - I can't think about a best way to implement this other than below
    const parsedData = fileData ? JSON.parse(fileData) : [];

    parsedData.push(reqBody)
    fs.writeFileSync(filePath, JSON.stringify(parsedData))

    res.send("Book added successfully")
})



someApp.listen("8092", () => {
    console.log("started");
})