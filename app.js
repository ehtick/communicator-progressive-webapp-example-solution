const path = require('path');
const express = require('express');

const cors = require('cors');
const app = express();

const apiRoutes = require('./routes/api');

app.use(cors());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({ limit: '25mb',extended: false }));


app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", apiRoutes);

app.listen(3000);

