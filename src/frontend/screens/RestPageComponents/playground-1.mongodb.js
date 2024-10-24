// Select the 'test' database
const db = db.getSiblingDB('test');

// Select the 'carts' collection
const collection = db.getCollection('carts');

// Drop the 'cartID_1' index
collection.dropIndex('cartID_1');

// Confirm the index has been dropped
print('Dropped index cartID_1');

// Optional: List remaining indexes to verify
printjson(collection.getIndexes());