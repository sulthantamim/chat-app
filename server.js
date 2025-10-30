// Import module yang dibutuhkan
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// Buat app Express dan server HTTP
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Set folder public sebagai tempat file frontend (index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Jalankan server socket.io
io.on('connection', (socket) => {
  console.log('Ada pengguna baru yang terhubung');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // kirim ke semua client
  });

  socket.on('disconnect', () => {
    console.log('Pengguna terputus');
  });
});

// Tentukan port server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
