const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://NamasteNodeJs:UInkajndkjsnUIUHBGIbdkjasnkj@cluster0.m2y48vo.mongodb.net/";

const client = new MongoClient(url);

const dbName = "User_Profiles";

async function main() {
  // Connect to the MongoDB cluster
  await client.connect();

  // Make the appropriate DB calls
  console.log(`Connected to database!`);

  const db = client.db(dbName);
  const collection = db.collection("data");

  // Insert a document
  const newData = { First_name: "Virat" };
  await collection.insertOne(newData);
  console.log("Inserted document:", newData);

  // Update a document
  const filter = { First_name: "Preethi" };
  const update = { $set: { First_name: "Rohith" } };
  const updateResult = await collection.updateOne(filter, update);
  console.log("Updated document count:", updateResult.modifiedCount);

  // Delete a document
  const deleteFilter = { First_name: "Virat" };
  const deleteResult = await collection.deleteOne(deleteFilter);
  console.log("Deleted document count:", deleteResult.deletedCount);

  // Read all documents from the collection
  const allDocuments = await collection.find({}).toArray();
  console.log("All documents:", allDocuments);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
