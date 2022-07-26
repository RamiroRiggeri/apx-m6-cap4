/*
Este proyecto sería como el servidor, el backend
Este archivo en particular es la API
y el archivo "db.ts" es la base de datos

Esto utiliza ts-node, express y nodemon para estar activo
mientras que el frontend usa Vite o Parcel y monta una web
*/

import * as express from "express";
import { firestore, firebase } from "./db";
import { json } from "body-parser";
import { v4 as uuidv4 } from "uuid";
import * as cors from "cors";

const app = express();
const port = 3045;

app.use(json());
app.use(cors());
/*
Usando Cors de esta manera, automáticamente acepto cualquier petición al servidor.
Si quisiera ser más específico, podría hacerlo de esta manera:

app.use(cors({
  origin: "path-to-accepted-URL",
  methods: [ "GET", "POST"],
}));

Con origin declaro que URLs tienen permiso para hacer peticiones, y con methods, que 
tipo de acciones se pueden hacer (ambas son opcionales).
*/

app.post("/chatrooms", function (req, res) {
  const id = uuidv4();
  const chatroomsRef = firebase.ref("/chatrooms/" + id);
  chatroomsRef.set(
    {
      type: "chatroom",
      participants: "",
      number: "#" + Math.trunc(Math.random() * 100),
    },
    function () {
      res.json({
        id,
      });
    }
  );
});

app.listen(port, () => {
  console.log(`escuchando puerto ${port}`);
});
//esto es un servidor con una API que sólo recibe un post, que es
//en este caso una solicitud de crear un chatroom nuevo.
//le da un Id único y lo manda como respuesta de la petición
