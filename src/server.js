const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();

// Enable CORS for all routes
app.use(cors());

const uri = "mongodb://ADMIN:WElcome%23%23709394@G2DEDDCD02B6DB5-SGADW.adb.ap-singapore-1.oraclecloudapps.com:27017/ADMIN?authMechanism=PLAIN&authSource=$external&ssl=true&retryWrites=false&loadBalanced=true";
let client = new MongoClient(uri);

// Get product endpoint
app.get('/api/products/:id', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("admin");
    const collection = database.collection("ocwecommerce_dv");
    const product = await collection.findOne({ _id: parseInt(req.params.id) });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Insert product endpoint
app.post('/api/products', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("admin");
    const collection = database.collection("ocwecommerce_dv");
    
    // Assuming the client sends the product data in the request body
    const newProduct = req.body;
    
    // If you want to auto-generate the _id, you can omit it from newProduct
    // Otherwise, ensure the client provides a unique _id
    if (!newProduct._id) {
      // Get the maximum _id from the collection and increment it
      const maxIdProduct = await collection.findOne({}, { sort: { _id: -1 } });
      newProduct._id = (maxIdProduct && maxIdProduct._id ? maxIdProduct._id : 0) + 1;
    }

    const result = await collection.insertOne(newProduct);
    
    if (result.acknowledged) {
      res.status(201).json({ 
        message: "Product inserted successfully", 
        productId: result.insertedId 
      });
    } else {
      res.status(500).json({ message: "Failed to insert product" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    // Optionally close the connection if you're not keeping it open
    // await client.close();
  }
});

// Update product endpoint
app.put('/api/products/:id', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("admin");
    const collection = database.collection("ocwecommerce_dv");
    
    const result = await collection.updateOne(
      { _id: parseInt(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add body parser middleware
app.use(express.json());

app.listen(3000, () => {
  console.log('Server running on port 3000');
});