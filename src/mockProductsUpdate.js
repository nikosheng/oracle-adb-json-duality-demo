const { MongoClient } = require('mongodb');
require('dotenv').config();

async function updateHuaweiProducts(numberOfProducts) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db(process.env.DB_NAME);
    const collection = database.collection('products');

    const cursor = collection.find({ name: { $regex: '^Huawei' } }).limit(numberOfProducts);
    
    let updatedCount = 0;

    for await (const product of cursor) {
      const newStockNumber = product.stockNumber + 1000;

      const result = await collection.updateOne(
        { _id: product._id },
        { $set: { stockNumber: newStockNumber } }
      );

      if (result.modifiedCount > 0) {
        updatedCount++;
        console.log(`Updated product: ${product.name}`);
        console.log(`New stock number: ${newStockNumber}`);
        console.log('--------------------');
      }
    }

    console.log(`Total products updated: ${updatedCount}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Example usage
const numberToUpdate = 5; // Change this to update more or fewer products
updateHuaweiProducts(numberToUpdate);
