// One-off admin bootstrap script — run with: npm run admin:promote -- <email>
// Sets role:"admin" on the given user so they can access /admin.
// The signed-in user must sign out and back in afterward, since role is
// only embedded into the session JWT at sign-in.

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const email = process.argv[2];

if (!uri || !dbName) {
      console.error("MONGODB_URI and DB_NAME must be set (e.g. `node --env-file=.env scripts/setAdminRole.mjs <email>`).");
      process.exit(1);
}

if (!email) {
      console.error("Usage: npm run admin:promote -- <email>");
      process.exit(1);
}

const client = new MongoClient(uri, {
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

try {
      await client.connect();
      const db = client.db(dbName);

      const result = await db.collection("users").updateOne(
            { email },
            { $set: { role: "admin", updatedAt: new Date() } }
      );

      if (result.matchedCount === 0) {
            console.error(`No user found with email "${email}".`);
            process.exit(1);
      }

      console.log(`"${email}" is now an admin. They must sign out and sign back in for it to take effect.`);
} finally {
      await client.close();
}
