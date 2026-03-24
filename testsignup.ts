import 'dotenv/config';
import { dbConnection } from './src/dal/db/client.ts';
import { user } from './src/dal/db/schema.ts';
import { randomUUID } from 'crypto';

const db = dbConnection();

async function testSignup() {
  try {
    const newUser = {
      id: randomUUID(),
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      emailVerified: false,
      image: null,
    };

    const result = await db.insert(user).values(newUser); // ✅ use table object directly
    console.log('Insert succeeded:', result);
  } catch (error) {
    console.error('Insert failed:', error);
  } finally {
    process.exit(0);
  }
}

testSignup();