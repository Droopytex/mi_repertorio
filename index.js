const express = require("express"); //importamos express
const app = express(); //instanciamos express

const fs = require("fs"); //importamos fs

const port = 3000; //definimos puerto

app.listen(port, () => console.log("Servidor escuchado en puerto 3000!")); //levantamos el servidor

app.use(express.json()); //middleware

//devuelve la web consultando get con ruta en raíz
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

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

//put canciones/:id recibe los datos y actualiza manipulando el json

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body; // asigna a variable cancion el body obtenido
  const canciones = JSON.parse(fs.readFileSync("repertorio.json")); // lee el json y lo parsea y lo asigna a variable canciones
  const index = canciones.findIndex((c) => c.id == id); //encuentra el id que coincide
  canciones[index] = cancion;
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
  res.send("Canción modificada con éxito");
});

//delete canciones/:id recibe por querystring el id  elimina del repertorio
app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  let canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  const filtrarCanciones = canciones.filter((cancion) => cancion.id != id);

  if (filtrarCanciones.length != canciones.length) {
    fs.writeFileSync("repertorio.json", JSON.stringify(filtrarCanciones));
    res.send("Canción eliminada");
  } else {
    res.status(404).send("Canción no encontrada");
  }
});
