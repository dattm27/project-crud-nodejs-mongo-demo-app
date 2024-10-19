// Filename - Server.js

const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const cors = require('cors'); // Import package cors

const port = 3000;
const app = express();

app.use(cors()); // Thêm dòng này để bật CORS

app.listen(port, function () {
    console.log("Server is listening at port:" + port);
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

app.use('/api', api);
