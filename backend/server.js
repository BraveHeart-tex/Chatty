require('dotenv').config();

const express = require('express');
const { chats } = require('./dummy-data/data');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/chat', (req, res) => {
  res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
  const { id } = req.params;
  const chat = chats.find((chat) => chat._id === id);
  res.send(chat);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
