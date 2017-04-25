var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");

var commonHeader = "{'Content-Type: text/html'}";

// Handle HTTP route GET / and POST / i.e. Home
function homeRoute(request,response){
  if(request.url === "/"){
    if(request.method.toLowerCase() === "get"){
      response.writeHead(200, commonHeader);
      renderer.view("header",{},response);
      renderer.view("search",{}, response);
      renderer.view("footer",{}, response);
      response.end();  
    } else{
      //if url == "/" && POST
      
      //get the post data from body
        request.on("data", function(postBody){
          var query = querystring.parse(postBody.toString());
          response.writeHead(303,{"Location":"/"+query.username});
          response.end();
        });
      //extract the username
      //refirect to /:username
    }
  }
}

// Handle HTTP route GET /:username i.e. /chalkers
function userRoute(request, response){
  var username = request.url.replace("/","");
  if(username.length>0){
    
    response.writeHead(200, commonHeader);
    renderer.view("header",{},response);
    
    var studentProfile = new Profile(username);
    
    studentProfile.on("end", function(profileJSON){
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges:profileJSON.badges.length,
        javascriptPoints:profileJSON.points.JavaScript
      }
      
      renderer.view("profile", values, response);
      renderer.view("footer", {}, response);
      
      response.end();
    });
    
    studentProfile.on("error", function(error){
      renderer.view("error", {errorMessage: error.message}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      
      response.end();
    });
  }
}

module.exports.home = homeRoute;
module.exports.user = userRoute;