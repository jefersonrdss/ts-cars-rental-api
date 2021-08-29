import express from 'express';

const server = express()

server.get("/", (request, response) => {
    response.json({ message: "Funcionou corretamente!" })
})

server.listen(3333, () => console.log("Server is runnig!"))