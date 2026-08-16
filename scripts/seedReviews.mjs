// One-off seed script — run with: npm run seed:reviews
// Populates the REVIEWS collection with sample reviews so each Mongo
// product's existing static ratings/reviews numbers are backed by real
// review documents. Re-running is safe: seeded reviews are cleared first.

import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri || !dbName) {
      console.error("MONGODB_URI and DB_NAME must be set (e.g. `node --env-file=.env scripts/seedReviews.mjs`).");
      process.exit(1);
}

const reviewerNames = [
      "Nusrat Jahan", "Tanvir Ahmed", "Farhana Akter", "Rakibul Islam", "Sadia Rahman",
      "Mahin Chowdhury", "Afsana Mim", "Imran Kabir", "Jannatul Ferdous", "Shakib Hossain",
      "Priya Das", "Arif Hasan", "Nabila Yasmin", "Tamim Sarker", "Sumaiya Khatun",
      "Rezaul Karim", "Lamia Islam", "Fahim Reza", "Nadia Sultana", "Hasibul Alam",
];

const positiveComments = [
      "My kid loves this! Great quality and keeps them engaged for hours.",
      "Exactly as described, fast delivery and well packaged.",
      "Educational and fun at the same time. Highly recommend for toddlers.",
      "Good value for money. My daughter plays with it every day.",
      "Sturdy build quality and safe materials. Very happy with this purchase.",
      "Helped my son with counting and colors so much. Worth it!",
      "Nice product, kids enjoyed it right out of the box.",
];

const mixedComments = [
      "Decent product, though the colors were slightly different from the photo.",
      "Good overall but packaging could be better.",
      "My child likes it, took a couple of days to get interested though.",
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pickRating = (target) => {
      // spread ratings around the target average, biased toward 4-5
      const roll = Math.random();
      if (roll < 0.7) return Math.min(5, Math.max(1, Math.round(target)));
      if (roll < 0.9) return Math.min(5, Math.max(1, Math.round(target) - 1));
      return Math.min(5, Math.max(1, Math.round(target) + 1));
};

const run = async () => {
      const client = new MongoClient(uri, {
            serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
      });

      await client.connect();
      const db = client.db(dbName);
      const products = db.collection("products");
      const reviews = db.collection("reviews");
      const orders = db.collection("orders");

      await reviews.createIndex({ productId: 1, userId: 1 }, { unique: true });
      await reviews.createIndex({ productId: 1 });
      await orders.createIndex({ userId: 1, "items.productId": 1 });

      const deleted = await reviews.deleteMany({ seeded: true });
      console.log(`Cleared ${deleted.deletedCount} previously seeded reviews.`);

      const productList = await products.find().toArray();
      let totalInserted = 0;

      for (const product of productList) {
            const targetRating = Number(product.ratings) || 4.5;
            const targetCount = Math.max(0, Number(product.reviews) || 0);

            if (targetCount === 0) continue;

            const docs = Array.from({ length: targetCount }, () => {
                  const rating = pickRating(targetRating);
                  const comment = rating >= 4 ? pick(positiveComments) : pick(mixedComments);
                  const daysAgo = Math.floor(Math.random() * 180);
                  const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

                  return {
                        productId: product._id,
                        userId: new ObjectId(),
                        userName: pick(reviewerNames),
                        rating,
                        comment,
                        verifiedPurchase: false,
                        seeded: true,
                        createdAt,
                        updatedAt: createdAt,
                  };
            });

            const result = await reviews.insertMany(docs, { ordered: false });
            totalInserted += result.insertedCount;
            console.log(`Seeded ${result.insertedCount} reviews for "${product.title}".`);
      }

      console.log(`Done. Inserted ${totalInserted} seeded reviews across ${productList.length} products.`);
      await client.close();
};

run().catch((error) => {
      console.error("Failed to seed reviews:", error);
      process.exit(1);
});
