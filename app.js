import express from 'express';
import createError from 'http-errors';
import morgan from 'morgan';
import {router} from './routes/api.route.js';
import dotenv from 'dotenv';
import { connection } from './config/db.js';
const PORT = process.env.PORT || 3000;
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', router);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
  console.log('Connected to MySQL server');
});

// Close the MySQL connection when the Node.js process exits
process.on('exit', () => {
  connection.end();
  console.log('Connection to MySQL closed');
});