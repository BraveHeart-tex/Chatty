require('dotenv').config();
const express = require('express');

const { connectToDB } = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');

const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

connectToDB().then(() => {
  console.log('Connected to MongoDB');
});

const app = express();

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
