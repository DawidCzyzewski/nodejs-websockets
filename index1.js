const WebSocketServer = new require("ws");

// inicjacja instancji czyli stworzenie nasłuchu na konkretny port, otwarcie serwera na danym porcie
const wss = new WebSocketServer.Server({ port: 8080 });

// obsługa połączenia czyli co się stanie, gdy ktoś się do nas połączy
// żeby było łatwiej, my jako klienta będziemy używać przeglądarkę, ale może to być aplikacja, serwer itp.
// przyjęło się, że w bibliotekach związanych z modelami subskrypcyjnymi obsługuje się przy pomocy on

// wss.on("connection", (ws) => {
//   console.log("ktoś się do nas połączył");
//   console.log("to co przyszło: ", ws);
// });

// teraz wpisując node index.js nic się nie dzieje, więc tworzymy prosty html, żeby podglądać w przeglądarce
// połączenie za pomocą liveserver z html i dostajemy dane
// w zwrocie w terminalu dostaniemy dużo ciekawych informacji o połączeniu.

// Zróbmy teraz przykład, w którym kliekntów będzie wielu i zobaczymy czy można ich policzyć itp.

// Stwórzmy bazę danych klientów, którzy się do nas łączą
// Stwórzmy niepersystentną bazę danych, tzn. taką, która po wyłączeniu, ubiciu serwera po prostu znika, nie zapamiętuje - będzie to tablica

let clients = [];

wss.on("connection", (ws) => {
  // Gdy klient się połączy, będziemy dodawać id. A żeby wiedzieć którym numerkiem jest który klient, chcemy wiedzieć ile my ich mamy. Obecnie mamy ich 0, a z każdym będziemy dodawać o 1, więc najprościej załatwimy to zwykłym policzeniem elementów tablicy. Generujemy id dla klienta, który się łączy:
  const id = clients.length;
  //   teraz przypiszmy id do klienta, który się łączy
  // Bierzemy tablicę klientów, dodajemy do niej id i wysyłamy do ws (instancji połączenia)
  clients[id] = ws;
  //   Teraz napiszmy wiadomość powitalną do nowego klienta. To co siedzi w naszej tablicy, to obiekty typu ws, więc możemy użyć metody send
  clients[id].send(`Witam, przydzielam Ci numer ${id}`);
  //   A że chcemy być kulturalni, to informujemy pozostałych użytkowników o nowym gościu. Najprościej będzie przeiterować przez tablicę. Ale nie wysyłajmy wiadomości do każdego kto dołącza, bo dołączający wie o tym.

  clients.forEach((item, index) => {
    // wysyłamy wiadomość do każdego prócz dołączającego
    // if (index !== id) {
    // lub
    if (index !== clients.length - 1) {
      item.send("Dołączył do nas nowy gość!");
    }
  });
});

// zmianiam nazwę na index1 żeby nie kolidowało z następnym przykładem
