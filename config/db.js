import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

// Create a MySQL connection
export const connection = mysql.createConnection({
    host: process.env.DB_HOST ,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    port: process.env.DB_PORT
});