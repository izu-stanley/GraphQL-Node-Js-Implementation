const fetch = require('node-fetch');
const queries = [
`   {
        calculatePrice(type: "sell", margin: 0.13, exchangeRate: 360)
    }
`,`
    {
        calculatePrice(type: "sell", margin: 0.1, exchangeRate: 360)
    }
`,`
    {
        calculatePrice(type: "sell", margin: 0.6, exchangeRate: 340)
    }
`,`
    {
        calculatePrice(type: "buy", margin: 0.3, exchangeRate: 400)
    }
`,`
    {
        calculatePrice(type: "buy", margin: 0.2, exchangeRate: 362)
    }
`
];

for (var i = 0; i < queries.length; i++) {
    query = queries[i]
    fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    },
    body: JSON.stringify({query})
    })
.then(r => r.json())
.then(data => console.log('data returned:', data));
}
