import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "../firebase";
//importo las librerías que necesito para leer la RTDB

const API_BASE_URL = "http://localhost:3045";
//cuando suba a internet, un servidor de verdad, la variable va a venir del mismo contexto
//no va a ser más localhost. Por eso la declaramos para saber que estamos en desarrollo.

const app = initializeApp(firebaseConfig);
//inicializo la app (necesaria para que funcione)
const database = getDatabase();
//inicializo la rt database (necesaria para que funcione)

//
const chatsRef = ref(database, "/chatrooms/1234");
onValue(chatsRef, (snapshot) => {
  const data = snapshot.val();
  // const chatsRef = ref(database, "/chatrooms/" + data.id);
  //     onValue(chatsRef, (snapshot) => {
  //       const data = snapshot.val();
  //       document.querySelector(".root").innerHTML = JSON.stringify(data);
  //     });
  console.log("esta fue una prueba anterior que la pasé a la console ", JSON.stringify(data));
});
//esto por un lado, hace referencia al chatroom 1234 y lo muestra en un div del HTML

function conectarAlChatroomn() {
  fetch(API_BASE_URL + "/chatrooms", {
    method: "post",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const chatroomRef = ref(database, "/chatrooms/" + data.id);
      onValue(chatroomRef, (snapshot) => {
        const valor = snapshot.val();
        document.querySelector(".id").innerHTML = data.id;
        document.querySelector(".root").innerHTML = JSON.stringify(valor);
      });
    });
}
/*
A fetch le tengo que agregar method:post porque no es lo estándar entonces se lo aclaro.
Lo que hace es un post a la URL de mi API/chatrooms, para que cree un chatroom nuevo
Ejecuta esta función en el backend:

        app.post("/chatrooms", function (req, res) {
          const id = uuidv4();
          const chatroomsRef = firebase.ref("/chatrooms/" + id);
          chatroomsRef.set(
            {
              type: "chatroom",
              participants: "",
            },
            function () {
              res.json({
                id,});
              });});

*/

(function () {
  const button = document.querySelector(".conectar");
  button.addEventListener("click", conectarAlChatroomn);
})();
//acá creamos una función y un botón que ejecutan la función del servidor para crear un chatroom
