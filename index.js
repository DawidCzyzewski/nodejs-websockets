// instalujemy socket.io
// console.log("hello")

// import { Server } from "socket.io";
// a że nie mamy ecmascript nowego, to trzeba to inaczej zaimportować
// const io = require("socket.io");

// jest on potrzebny do wyhostowania elementu
const express = require("express");
// inicjalizujemy aplikację
const app = express();

// tej nie musimy instalować, bo to taka udawana biblioteka. tworzymy serwer http, żeby klient z html mógł pobrać pierwszy script
const http = require("http").createServer(app);

// przy pomocy http wyhostuj plik biblioteki. to po to, żeby z poziomu przeglądarki plik był również dostępny
const io = require("socket.io")(http);

// stwórzmy kanały nasłuchowe:
const channels = {
  car: "car",
};

// to po to, żeby nie kopiować ścieżki pliku do przeglądarki, tylko będziemy chcieli wejść w niego przez localhost slash index.html. Pozwalamy na dostęp do plików przez public
app.use(express.static("public"));

// // create an instantion of server
// const ioi = new io.Server(3000);

io.on("connection", (socket) => {
  console.log("ktoś dołączył");
  // send a message to client. nazwa kanału musi się pokrywać z tą z index, bo tu możemy mieć kilka kanałów nasłuchu. użyjemy car i damy wiadomość siemanko
  socket.emit(channels.car, "siemanko!");

  //   //   receive a message from client
  //   socket.on("howdy", (arg) => {
  //     console.log(arg); // prinst 'stranger'
  //   });
});

io.on("reconnection_attempt", () => {
  console.log("ktoś się rozłączył PONOWNIE"); //Nie działa
});

io.on("connection", (socket) => {
  socket.on("disconnect", (reason) => {
    console.log("ktoś się rozłączył");
    console.log(reason);
  });
});

http.listen(3000, () => {
  console.log("aplikacja słucha...");
});
