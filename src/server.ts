import express from "express";

const app = express();

app.get("/", (request, response) => {
    return response.json({ "message": "Olá Mundo" })
});

app.post("/testpost", (request, response) => {
    return response.json({ "message": "Olá NLW Método Post" });
})

app.listen(3000, () => {
    console.log("Server is running!");
})