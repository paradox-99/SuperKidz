import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_URI || "";
const dbName = process.env.DB_NAME || "";

interface Collections {
  USERS: string;
  PRODUCTS: string;
  ORDERS: string;
  CART: string;
  REVIEWS: string;
};

export const collections: Collections = {
  USERS: "users",
  PRODUCTS: "products",
  ORDERS: "orders",
  CART: "cart",
  REVIEWS: "reviews",
};

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const db = client.db(dbName);
export const getCollection = (collectionName: keyof typeof collections) => {
  return db.collection(collections[collectionName]);
}