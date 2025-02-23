import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
export default client;
