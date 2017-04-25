var fs = require('fs');

function mergeValues(values, content){
  //Cycle over the keys
  for(var key in values){
    content = content.replace("{{"+key+"}}", values[key]);
  }
  //Replace all {{key}} with the value from the values object
  //return merged contents
  return content;
}

function view(templateName, values, response){
  //Read from the template file
  
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding:"utf8"});
  fileContents = mergeValues(values, fileContents);
  
  response.write(fileContents);
}

module.exports.view = view;