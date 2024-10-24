// Select the 'test' database
const db = db.getSiblingDB('test');

// Select the 'carts' collection
const collection = db.getCollection('carts');
// Select the 'users' collection
const usersCollection = db.getCollection('users');
// Update all users that do not have the 'cartIDs' field
const updateResult = usersCollection.updateMany(
    { cartIDs: { $exists: false } }, // Filter: users without 'cartIDs'
    { $set: { cartIDs: [] } }        // Update: set 'cartIDs' to an empty array
  );

  // Print the number of documents modified
print(`Number of user documents updated: ${updateResult.modifiedCount}`);

// Verify if any users still lack 'cartIDs'
const remainingUsers = usersCollection.countDocuments({ cartIDs: { $exists: false } });

// Print the result
print(`Number of user documents still missing 'cartIDs': ${remainingUsers}`);

// Drop the 'cartID_1' index
collection.dropIndex('cartID_1');

// Confirm the index has been dropped
print('Dropped index cartID_1');

// Optional: List remaining indexes to verify
printjson(collection.getIndexes());