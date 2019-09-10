# GraphQL-Node-Js-Implementation
The Assesment Repo

## BuyCoins Backend Assessment Repo
The assesment can be found [here](https://www.notion.so/Challenges-dd89b4b620ff48868892764d035f6330)

A live version of the Application can be found at:
```
http://34.67.211.177:4000/graphiql
```
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
query {
  calculatePrice(type: "buy", margin: 0.2, exchangeRate: 360)
}

```
Alternatively, the tests can be run using

```
node tests.js

```

## Further Information
Logs can be found at 
```
http://localhost:4000/logs
```
And the config file for the logs in winston.js in the config folder

The application was deployed in a Docker Container in order to conform to the best practices laid out in the [12-Factor App](https://12factor.net/) and the Dockerfile is in the root folder. It is worthy of note that the log files were built in such a way that are persistent and even if the container is restarted, the log files arent lost.

There are two logs: One gives information on who visited the api and when, the other gives information on the query entered. The logs can then be analysed to reveal further information
