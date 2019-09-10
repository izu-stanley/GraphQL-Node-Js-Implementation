# GraphQL-Node-Js-Implementation
The Assesment Repo

## BuyCoins Backend Assessment Repo
The assesment can be found [here](https://www.notion.so/Challenges-dd89b4b620ff48868892764d035f6330)
To run the server locally you need to set up the required dependencies
Do this by running
```
npm install
```
Then start up the server by running 
```
node server.js
```
Go to http://localhost:4000/graphiql and enter the graphql query 

An example query would be 

```
{
  calculatePrice(type: buy, margin : 0.2, exchangeRate : 360) 
}
```
Alternatively, the tests in the tests folder can be run using

```
node tests.js
```
