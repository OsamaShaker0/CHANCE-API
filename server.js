require('dotenv').config();
const fileUpload = require('express-fileupload');
const express = require('express');
const connectDB = require('./db/connectDB');
const notFound = require('./middlewares/notFound');
// routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const chanceRoute = require('./routes/chance');
const errorHandler = require('./middlewares/error');
const app = express();

app.use(express.json());
app.use(fileUpload());

app.use('/api/v1/users/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/chances', chanceRoute);

app.use(errorHandler);
app.use(notFound);
const PORT = process.env.PORT || 3000;
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
