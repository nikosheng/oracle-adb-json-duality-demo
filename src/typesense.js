const Typesense = require('typesense')

let client = new Typesense.Client({
  'nodes': [{
    'host': 'localhost', // For Typesense Cloud use xxx.a1.typesense.net
    'port': 8108,      // For Typesense Cloud use 443
    'protocol': 'http'   // For Typesense Cloud use https
  }],
  'apiKey': 'xyz',
  'connectionTimeoutSeconds': 2
})

async function upsertDocument() {
    let document = {
        "id": "3296",
        "pid": 3292,
        "name": "Huawei - Mate XT 5G LTE with 1TB Memory Foldable Phone - Dark Black",
        "brand": "Huawei",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT1I3r-hPhEAGva_yDEN0nypEc-WSZPpnbLw&s.jpeg",
        "price": 3999.99,
        "categories": [
          "Cell Phones",
          "Foldable Phones"
        ],
        "free_shipping": true,
        "rating": 5,
        "vectors": [],
        "popularity": 1000,
        "categories.lvl0": ["Cell Phones"],
        "categories.lvl1": ["Cell Phones > Foldable Phones"],
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

async function retrieve() {
  await client.collections('products').retrieve()
  .then(function(response) {
      console.log(response)
  })
  .catch(function(error) {
      console.log(error)
  });
}

async function query() {
  let searchParameters = {
    'q'         : 'MATE XT 5G LTE',
    'query_by'  : 'name',
    'sort_by'   : 'popularity:desc'
  }
  
  await client.collections('products')
    .documents()
    .search(searchParameters)
    .then(function (searchResults) {
      console.log(JSON.stringify(searchResults, null, 2));
    })
}

async function deleteDocument(id) {
  await client.collections('products').documents(id).delete()
  .then(function(response) {
      console.log(response)
  })
  .catch(function(error) {
      console.log(error)
  });
}

upsertDocument();
//retrieve();
//deleteDocument("3295");
//query();
