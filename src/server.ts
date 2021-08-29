import express from "express";

const server = express();
server.use(express.json());

server.get("/courses", (request, response) => {
    response.json({ message: "Funcionou corretamente!" });
});

server.post("/courses", (request, response) => {
    const { name } = request.body;
    return response.json({ name });
});

server.listen(3333, () => console.log("Server is running!"));
