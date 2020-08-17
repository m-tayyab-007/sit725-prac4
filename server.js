const MongoClient = require('mongodb').MongoClient;



var express = require("express"),
    app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get("/sayHello", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});

app.get('/message',function(req,res){
    let message = req.query.message;
    insertMessage(message);
    res.send('added');
})

app.get('/messages', function(req,res){
    retrieveMessages(res);
})

app.listen(port);
console.log("Listening on port ", port);

require("cf-deployment-tracker-client").track();


//database management
const uri = "mongodb+srv://tayyab:MtM_M0707@cluster0.7vy9k.mongodb.net/messageboard?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });


let collectionMessage;

client.connect(err => {
    collectionMessage = client.db("messageboard").collection("messages");
  });

const insertMessage=(message)=>{
  collectionMessage.insertOne({message:message})
}

const retrieveMessages=(res)=>{
    collectionMessage.find().toArray(function(err, result){
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
} 

// setTimeout(function(){
//     insertMessage('Hello World');
// },2000)