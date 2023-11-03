const app = require('express')();

app.get('/api', (req, res) => {
  res.send(`
  {
    "secret": "${process.env.CLIENTSECRET}"
  }
  `)
});



module.exports = app;