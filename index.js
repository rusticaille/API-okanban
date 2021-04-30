const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const express = require('express');

const router = require('./app/router');

const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors('*'));

app.use(express.urlencoded({extended: true}));

const multer = require('multer');
const bodyParser = multer();
app.use(bodyParser.none());

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ...`);
});