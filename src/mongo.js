const { MongoClient } = require('mongodb');
const uri = "mongodb://ADMIN:xx@LVEHGH9RRMBGCxx-JPADW.adb.ap-tokyo-1.oraclecloudapps.com:27017/ADMIN?authMechanism=PLAIN&authSource=$external&ssl=true&retryWrites=false&loadBalanced=true";
let client = new MongoClient(uri);

const result = async () => {
    let conn;
    try {
        conn = await client.connect();
        console.log("Connected successfully to server");
        
        const database = conn.db("admin");
        const collection = database.collection("ocwecommerce_dv");
        const product = await collection.findOne({ _id: 13 });
        console.log(product);
        
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) {
            await client.close();
        }
    }
}

result();