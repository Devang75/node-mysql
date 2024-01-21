import mysql from 'mysql';

// Create a MySQL connection
export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb2'
  });