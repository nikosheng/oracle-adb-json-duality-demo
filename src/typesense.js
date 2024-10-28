const Typesense = require('typesense')

let client = new Typesense.Client({
  'nodes': [{
    'host': 'localhost', // For Typesense Cloud use xxx.a1.typesense.net
    'port': 8108,      // For Typesense Cloud use 443
    'protocol': 'http'   // For Typesense Cloud use https
  }],
  'apiKey': '<API_KEY>',
  'connectionTimeoutSeconds': 2
})

async function createCollection() {
    let document = {
        "pid": 3297,
        "name": "Huawei - Mate XT 5G LTE with 1TB Memory Foldable Phone - Dark Black",
        "brand": "Huawei",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT1I3r-hPhEAGva_yDEN0nypEc-WSZPpnbLw&s.jpeg",
        "price": 3999.99,
        "categories": [
          "Cell Phones",
          "Foldable Phones"
        ],
        "popularity": 99999,
        "description": "The Huawei Mate XT is a groundbreaking tri-fold smartphone that pushes the boundaries of foldable technology.",
        "stockNumber": 1000000
      }

    await client.collections('products').documents().upsert(document)
    .then(function(response) {
        console.log(response)
    })
    .catch(function(error) {
        console.log(error)
    });
}

  
