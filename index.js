const path = require('path');
const express = require('express');
const app = express();
const PORT = 3005;
const cors = require('cors');
const router = require('./router');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 Server is up and running on port ${PORT}`); // eslint-disable-line no-console
});