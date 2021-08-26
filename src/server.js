
const { json } = require("body-parser");
const express = require("express")
const { authenticator, getSelf } = require("./authenticator")
const fs = require("fs")


const someApp = express()
const filePath = `${process.cwd()}/db.json`

someApp.use(express.json());
someApp.use(authenticator);

someApp.get("/books", (req, res) => {

    const currentRequestedUserId = getSelf(req);

    const fileData = fs.readFileSync(filePath, 'utf8')
    const parsedData = JSON.parse(fileData);

    const correctedBookName = parsedData?.[currentRequestedUserId]?.split("")?.reverse()?.join("")

    res.send({
        bookName: correctedBookName
    })

})

someApp.post("/books", async (req, res) => {
    // Expects in format {"bookName": "some book"}
    console.log("this is some post", req.body);

    const currentRequestedUserId = getSelf(req)
    const { bookName } = req.body ?? {}
    const reverseName = bookName?.split("")?.reverse()?.join("")

    const writeObj = {
        [currentRequestedUserId]: reverseName
    }

    fs.writeFileSync(filePath, JSON.stringify(writeObj))

    res.send("Book added successfully")
})

someApp.listen("8092", () => {
    console.log("started");
})