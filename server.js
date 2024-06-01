import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sql from 'mssql';
import multer from 'multer';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;

const config = {
  server: "database.cjm80agmmdpx.us-east-1.rds.amazonaws.com",
  database: "myDatabase",
  user: "admin",
  password: "password",
  encrypt: false,
  trustServerCertificate: false,
};

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
    const validExtensions = ['.jpg', '.jpeg', '.png'];
    const isValid = validExtensions.includes(extension);
    const fileExtension = isValid ? extension : '';
    cb(null, `${Date.now()}_${Math.floor(Math.random() * 90000) + 10000}${fileExtension}`);
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Authentication endpoint
app.post('/auth', async (req, res) => {
  try {
    const user = req.body;
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('userName', sql.NVarChar, user.username)
      .query('SELECT * FROM "account" WHERE userName = @userName');

    if (result.recordset.length > 0) {
      const userFromQuery = result.recordset[0];
      if (user.password === userFromQuery.userPassword) {
        const token = jwt.sign(
          { id: userFromQuery.id, username: userFromQuery.userName },
          "1234",
          { expiresIn: '12h' }
        );
        res.json({ message: 'Authenticate', token });
      } else {
        res.json({ message: 'Invalid credentials' });
      }
    } else {
      res.json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// File upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json(req.file.filename);
});

// Fetch all products endpoint
app.get('/product', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM product');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch a single product by ID endpoint
app.get('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('productId', sql.Int, id)
      .query('SELECT * FROM product WHERE id = @productId');

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add new product endpoint
app.post('/products', async (req, res) => {
  try {
    const newProduct = {
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      description: req.body.description,
      type: req.body.type,
    };

    const pool = await sql.connect(config);
    await pool.request()
      .input('name', sql.NVarChar, newProduct.name)
      .input('image', sql.NVarChar, newProduct.image)
      .input('price', sql.Decimal(10, 2), newProduct.price)
      .input('description', sql.NVarChar, newProduct.description)
      .input('type', sql.NVarChar, newProduct.type)
      .query('INSERT INTO product (productName, productPrice, productDescription, picture, type) VALUES (@name, @price, @description, @image, @type)');
    
    res.send('Product added successfully!');
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
