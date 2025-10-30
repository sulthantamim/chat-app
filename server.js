const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // folder untuk file HTML dan JS tampilan

io.on("connection", (socket) => {
  console.log("Pengguna baru terhubung!");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // kirim pesan ke semua pengguna
  });

  socket.on("disconnect", () => {
    console.log("Pengguna keluar.");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
