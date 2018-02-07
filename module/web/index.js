const express = require('express');
const app = express();
const route = require('./router.js');

app.use("/",route);
app.use(express.static('.'));
exports.app = app;
