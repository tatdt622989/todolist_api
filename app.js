const express = require('express');
const connectDB = require('./database');
const authRouter = require('./routes/auth');
const todosRouter = require('./routes/todos');

const app = express();

connectDB();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/todos', todosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});