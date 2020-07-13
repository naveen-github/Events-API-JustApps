const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const eventsRouter = require('./routes/events');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ENV=='prod'?process.env.ATLAS_URI_LIVE:process.env.ATLAS_URI_LOCAL;
mongoose.connect(
  uri, 
  { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true 
  }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`MongoDB database connection established successfully using ${process.env.ENV=='prod'?'live':'local'} server`);
});

app.use('/event', eventsRouter);

app.listen((port), () => {
    console.log(`Server is running on port: ${port} on ${process.env.ENV=='prod'?'Production':'Development'}`);
});