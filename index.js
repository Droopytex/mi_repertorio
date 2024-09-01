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

//delete canciones/:id recibe por querystring el id  elimina del repertorio