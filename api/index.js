const app = require('express')();

app.get('/api', (req, res) => {
  res.send(process.env.CLIENTSECRET)
});



module.exports = app;