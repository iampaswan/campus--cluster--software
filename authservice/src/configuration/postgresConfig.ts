import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRESS_URI,

});
export default pool


export const connectPostgress = async () => {
  try {
    await pool
    console.log('Postgres Connected')
  } catch (err) {
    console.log("Error in pg connection", err)
  }

}


