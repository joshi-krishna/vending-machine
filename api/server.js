const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000;
const route = require('./routes');
app.use(bodyParser.json({ limit: '50mb' }))

app.use('/api', route);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;