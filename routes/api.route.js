import express from 'express';
import  {connection}  from '../config/db.js';
import { upload } from '../config/multer.js';
export const router = express.Router()

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

// Route to handle GET requests for fetching all items
router.get('/items', (req, res) => {
  connection.query('SELECT * FROM items', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Route to handle POST requests for creating a new item
router.post('/items', (req, res) => {
  const { name, description } = req.body;
  connection.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (error, results) => {
    if (error) throw error;
    res.json({ id: results.insertId, name, description });
  });
});

// Route to handle PUT requests for updating an item
router.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  connection.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], (error) => {
    if (error) throw error;
    res.json({ id: parseInt(id), name, description });
  });
});

// Route to handle DELETE requests for deleting an item
router.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM items WHERE id = ?', [id], (error) => {
    if (error) throw error;
    res.json({ id: parseInt(id), message: 'Item deleted successfully' });
  });
});

// Upload file API
router.post('/upload', upload.single('file'), (req, res) => {
  console.log(req);
  connection.query('INSERT INTO images (imagespath) VALUES (?)',[req.file.path], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  })
});