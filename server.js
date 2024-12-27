require('dotenv').config();

const express = require('express');
const connectDB = require('./db/connectDB');
const notFound = require('./middlewares/notFound');
const authRoute = require('./routes/auth');
const errorHandler = require('./middlewares/error');
const app = express();

app.use(express.json());
app.use('/api/v1/auth', authRoute);
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('hi');
});
app.use(notFound);
const PORT = process.env.PORT || 6000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log({ Error: error.message });
  }
};
start();
