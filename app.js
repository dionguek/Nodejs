//Problem: We need a simple way to look at a user's badge count and JavaScript point from a web browser
//Solution: Use Node.js to perform the profile look ups and serve our template via HTTP

//1. Create a webserver
var router = require("./router.js");
var http = require('http');
http.createServer(function(request, response){
  router.home(request, response);
  router.user(request, response);
}).listen(8888);
console.log('Server running at http://127.0.0.1:8888/');


//4. Function that handles the reading of files and merge in value
  // read from file and get a string
    //merge values in to string
