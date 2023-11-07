const express = require('express');
const app = express();
let ejs = require('ejs');
app.set("view engine", "ejs");
app.use(express.static('public'));

const client_id = "2f380f8fc28b4ab68298d967fe13805d";
const client_secret = "03bb954af29e4752beb6ea0cc98df454";

async function getAccessToken(clientId, clientSecret) {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret)
    params.append("grant_type", "client_credentials");
    params.append("redirect_uri", "http://localhost:5173/callback");

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function fetchTopTracks(token) {
    const result = await fetch('https://api.spotify.com/v1/artists/7tPoZvl7OYT2rQDdzCQpfR/top-tracks?market=US', {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

(async() => {
  toptrack = await fetchTopTracks(await getAccessToken(client_id, client_secret))
})();



app.get('/', (req, res) => {
  res.render("index", {pass: toptrack})
});


app.get('/api', (req, res) => {
  res.send(`
  {
    "secret": "${process.env.CLIENTSECRET}"
  }
  `)
});

// app.listen(8080, function () {
//   console.log("Server is running on port 8080 ");
// });

module.exports = app;