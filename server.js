require('dotenv').config();
const fileUpload = require('express-fileupload');
const express = require('express');
const connectDB = require('./db/connectDB');
const notFound = require('./middlewares/notFound');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const expressLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const hpp = require('hpp');
const { xss } = require('express-xss-sanitizer');
// swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chance API',
      version: '1.0.0',
      description: 'Simple express API to share and find job offers',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',  
          bearerFormat: 'JWT',
        },
      },
    },
    
    
  },
  apis: ['./routes/*.js'], 
};



const spec = swaggerJsdoc(options);
// routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const chanceRoute = require('./routes/chance');
const errorHandler = require('./middlewares/error');
const app = express();
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(spec));
app.use(express.json());
app.use(mongoSanitize());
app.use(helmet());
app.use(cors());
app.use(hpp());
app.use(cookieParser());
const limiter = expressLimit({ windowMs: 10 * 60 * 1000, max: 100 });
app.use(limiter);
app.use(xss());
app.use(fileUpload());
app.get('/',(req,res)=>{
   let welcome = "<h1> Welcome to Chance API </h1> "
  res.status(200).send(welcome)
})
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
