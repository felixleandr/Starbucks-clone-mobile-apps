const { MongoClient } = require("mongodb");
const {hashPassword} = require('../helpers/bcrypt')

const uri =
  "mongodb+srv://felixleander2108:HJAGbQ0akjFT3YyK@cluster-felix.z3bvirx.mongodb.net/?retryWrites=true&w=majority";

/* mySeedScript.js */

// require the necessary libraries

async function seedDB() {
  // Connection URL

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const collection = client.db("starbucks_db").collection("users");

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    collection.drop();

    // make a bunch of time series data
    let data = 
    [
        
        {
            email: "felix@gmail.com",
            password: hashPassword("felix"),
            role: 'admin',
            phoneNumber: "087747198321",
            address: 'Pluit, Jakarta'
        },
        {
            email: "test@gmail.com",
            password: hashPassword("test"),
            role: 'admin',
            phoneNumber: "087747118230",
            address: 'Penjaringan, Jakarta'
        }
    
    ];
    await collection.insertMany(data);

    console.log("Database seeded! :)");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
