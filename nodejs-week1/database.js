import knex from 'knex'
import 'dotenv/config';

const myKnex = knex({
      client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
  },
  pool: { min: 0, max: 7 },
});

myKnex.raw("SELECT VERSION()").then(() => {
  console.log(`Connection to DB successful!`);
}).catch((error) => {
  console.error(`Failed to connect to DB: ${error.message}`);
});

async function testQuery() {
    try {
        const results = await myKnex('Meal').select('*');
        console.log(results);
    } catch (error) {
        console.error(`Query failed: ${error.message}`);
    }
}
  
    testQuery();

export default myKnex;