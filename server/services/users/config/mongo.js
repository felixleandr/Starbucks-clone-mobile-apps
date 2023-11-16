const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://felixleander2108:HJAGbQ0akjFT3YyK@cluster-felix.z3bvirx.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
let db;

async function connect() {
  try {
    db = client.db('starbucks_db')

  } catch (err) {
    console.log(err);
  }
}

function getDb(){
    return db;
}

module.exports = {connect, getDb}