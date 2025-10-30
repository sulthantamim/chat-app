const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Username random biar beda tiap user
const username = "User" + Math.floor(Math.random() * 1000);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', { user: username, msg: input.value });
    input.value = '';
  }
});

socket.on('chat message', (data) => {
  const item = document.createElement('div');
  item.classList.add('message');
  item.classList.add(data.user === username ? 'you' : 'other');
  item.textContent = `${data.user}: ${data.msg}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
