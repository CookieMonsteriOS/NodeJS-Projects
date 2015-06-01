var http = require("http"); 
//Print out message
function printMessage(username, badgecount,points){

  var message = username + " has " + " "+ badgecount + " " + " Total badges" + "" + "" + points + " points in Javascript";

console.log(message);
   
}

function printError(error){

  console.log(error); 
  
};

function get(username){
  
  //Connect API url ("http://www.yoururl.com/name.json");
  var request  = http.get("http://www.yoururl.com/" + username + ".json", function(response){
  
    var body = ""; 
  
    //Read data
    response.on('data', function (chunk) {
      
    body += chunk; 
       
    });
    
    //End data stream
    response.on('end', function(){
                
     //Parse data;
     var profile = JSON.parse(body) 
      
     try{
     
      printMessage(username,profile.badges.length,             
     profile.points.JavaScript);   
    
     } catch(error){
       
       //Parse error
       printError({message:"There was an error getting message for " +   username + http.STATUS_CODES[response.statusCode] + ")"});  
  
       
     }
    
    
    });
      
  });  
  
  //Connection Error
  request.on("error", printError); 
}

module.exports.get = get;

