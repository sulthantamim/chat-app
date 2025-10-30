const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

// Buat server HTTP
const server = http.createServer(app);
const io = new Server(server);

// 🔥 Tambahkan ini agar folder "public" bisa diakses
app.use(express.static(path.join(__dirname, "public")));

// 🔥 Ini yang penting: arahkan root URL "/" ke index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===== SOCKET.IO =====
io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

// ===== LISTEN PORT =====
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
