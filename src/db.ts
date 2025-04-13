import { Pool } from "pg";
import dotenv from 'dotenv'
dotenv.config()
const pool = new Pool({
//   user: DBUSER,
//   host: DBHOST,
//   database: DATABASENAME,
//   password: DBPASSWORD as string,
//   port: (DBPORT as unknown) as number,
connectionString:process.env.DBCONNECTION as string
});


async function checkConnection() {
    try {
      const client = await pool.connect(); // Attempt to connect
      console.log('Connected to the database successfully!');
      client.release(); // Release the client back to the pool
    } catch (error) {
      console.error('Failed to connect to the database:', error);
    }
  }
  
  checkConnection();

export default pool;