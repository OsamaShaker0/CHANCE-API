require('dotenv').config();

const express = require('express');
const connectDB = require('./db/connectDB');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hi');
});

const PORT = process.env.PORT || 5000;
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
