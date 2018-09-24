// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var superagent = require('superagent');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/pages/:user', function(request, response) {
  const user = request.params.user;
  //   TODO - deal with more than 100 repos
  superagent.get(`https://api.github.com/users/${user}/repos?per_page=100`)
    .then(res => {
        const repos = res.body;
        const pages = repos.filter(repo => repo.has_pages)
                .map(repo => {
                    return { 
                      name: repo.name,
                      url: `http://${repo.owner.login}.github.io/${repo.name}`,
                      description: repo.description
                    };
                });
        
    response.send(pages);
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
