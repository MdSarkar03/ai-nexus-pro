// server/check-categories.js
// Read-only diagnostic — does NOT modify any data

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: 'C:/Users/Tanmoy/ai-nexus-pro/.env' });

async function run() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.error('ERROR: No MongoDB connection string found');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB\n');

  const db = mongoose.connection.db;

  async function countsByField(collName, field) {
    const coll = db.collection(collName);
    const result = await coll.aggregate([
      { $group: { _id: `$${field}`, count: { $sum: 1 } } },
      { $sort: { count: 1 } }
    ]).toArray();
    return result;
  }

  console.log('=== TOOLS: count by category ===');
  console.log(JSON.stringify(await countsByField('tools', 'category'), null, 2));

  console.log('\n=== TOOLS: count by pricing ===');
  console.log(JSON.stringify(await countsByField('tools', 'pricing'), null, 2));

  console.log('\n=== PROMPTS: count by category ===');
  console.log(JSON.stringify(await countsByField('prompts', 'category'), null, 2));

  console.log('\n=== PROMPTS: count by difficulty ===');
  console.log(JSON.stringify(await countsByField('prompts', 'difficulty'), null, 2));

  console.log('\n=== WORKFLOWS: count by category ===');
  console.log(JSON.stringify(await countsByField('workflows', 'category'), null, 2));

  console.log('\n=== WORKFLOWS: count by difficulty ===');
  console.log(JSON.stringify(await countsByField('workflows', 'difficulty'), null, 2));

  console.log('\n=== STACKS: count by difficulty ===');
  console.log(JSON.stringify(await countsByField('stacks', 'difficulty'), null, 2));

  console.log('\n=== STACKS: all role values (need to hand-map each to persona tags) ===');
  const stacksColl = db.collection('stacks');
  const stacksList = await stacksColl.find({}, { projection: { title: 1, role: 1 } }).toArray();
  console.log(JSON.stringify(stacksList, null, 2));

  await mongoose.disconnect();
  console.log('\nDone. Disconnected.');
  process.exit(0);
}

run().catch(err => {
  console.error('ERROR:', err);
  process.exit(1);
});