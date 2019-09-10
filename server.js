var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const fetch = require('node-fetch');
var morgan = require('morgan');
var fs = require('fs')
var winston = require('./config/winston');


var price;
var usd;
var counter = 0


//Build The API Schema
var schema = buildSchema(`
  type Query {
    "Logging Information can be found at /logs"
    calculatePrice(type: String!, margin: Float!, exchangeRate: Float!): [Float]
  }
`);


//Logging function(12 factor reqirements)
function logging(type, margin, exchangeRate, usd, price){
  fs.readFile('logs/params.json', function (err, data) {
    if (err){
      console.log(err)
    }
    else{
      var json = JSON.parse(data)
      json[String(counter)] = {"type": type, "margin":margin,"exchangeRate":exchangeRate,"USD_price":usd,"NGN_price":price,"Timestamp":Date()}
      counter = counter + 1
      fs.writeFileSync("logs/params.json", JSON.stringify(json))
    }
    
  })
}



var root = {
    calculatePrice: function ({type, margin, exchangeRate}){
        var url = 'https://api.coindesk.com/v1/bpi/currentprice.json'
        fetch(url, { method: 'GET'})
        .then((res) => {
            return res.json()
        })
        .then((response) => {
            //console.log(response)
            usd = response
            usd = usd['bpi']['USD']['rate_float'];
        });
        //Calculate Buy and Sell Price
        if (type == 'buy'){
            usd = usd + ((margin/100) * usd) 
            price = usd * exchangeRate
            logging(type, margin, exchangeRate, usd, price)
            return [price]
        }else if (type == 'sell'){
            usd = usd - ((margin/100) * usd)
            price = usd * exchangeRate
            logging(type, margin, exchangeRate, usd, price)
            return [price]
        }

    }
}


//Define Endpoints and start server
var app = express();
app.use(morgan('combined', { stream: winston.stream }));

//Graphql and Graphiql Endpoints
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.use('/graphiql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));



//Logging Endpoints
app.get('/logs', function (req, res){
  res.sendFile('logs.html', {
  root: 'views/'
  })
});

app.get('/logs/params.json', function (req, res){
  res.sendFile('params.json', {
  root: 'logs/'
  })
});

app.get('/logs/app.log', function (req, res){
  res.sendFile('app.log', {
  root: 'logs/'
  })
});


app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');




//Initialize server
function initialize_server(){
  query = `{    calculatePrice(type: "buy", margin: 0.2, exchangeRate: 362)} `
  fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  },
  body: JSON.stringify({query})
  })
.then(r => r.json())
.then(data => console.log('Initialized'));
}
initialize_server()






