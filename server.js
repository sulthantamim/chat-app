const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Biar file di folder public bisa diakses
app.use(express.static(path.join(__dirname, "public")));

// Biar domain utama langsung buka index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===== SOCKET.IO - realtime chat =====
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("chat message", (data) => {
    // Kirim pesan ke semua user
    io.emit("chat message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Jalankan server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
