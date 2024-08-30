const express = require("express"); //importamos express
const app = express(); //instanciamos express

const fs = require("fs");

const port = 3000; //definimos puerto

app.listen(port, () => console.log("Servidor escuchado en puerto 3000!"));

app.use(express.json());

app.get("/canciones", (req, res) => {
  const newCancion = JSON.parse(fs.readFileSync("repertorio.json"));
  res.json(newCancion);
});

app.post("/canciones", (req, res) => {
  const cancion = req.body;
  const newCancion = JSON.parse(fs.readFileSync("repertorio.json"));
  newCancion.push(cancion);
  fs.writeFileSync("repertorio.json", JSON.stringify(newCancion));
  res.send("Nueva canción agregada");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
