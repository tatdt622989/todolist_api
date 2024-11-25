const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const authRouter = require('./routes/auth');
const todosRouter = require('./routes/todos');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

app.use(cors({
  origin: '*',
  methods: '*',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

connectDB();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/todos', todosRouter);

const PORT = process.env.PORT || (isProduction ? 80 : 3000);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});