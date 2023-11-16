const { getDb } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class User {
  static getUserCollection() {
    return getDb().collection('users')
  }

  static async findAll(){
    const users = this.getUserCollection();
    const data = await users.find().toArray();
    return data
  }

  static async findOne(id){
    const _id = new ObjectId(id)
    const user = await this.getUserCollection().findOne({_id});
    return user
  }

  static async createUser(data){
    await this.getUserCollection().insertOne(data)
  }

  static async deleteUser(id){
    const _id = new ObjectId(id)
    await this.getUserCollection().deleteOne({_id})
  }
}

module.exports = User
