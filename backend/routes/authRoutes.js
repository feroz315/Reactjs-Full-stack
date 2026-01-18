import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/auth.js";
import client from "../database/db.js";
import fs from "fs";


const router = express.Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

const generateToken = (id) => {
  return jwt.sign({ id }, "pak", {
    expiresIn: "1d",
  });
};

// Register

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const userExists = await client.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (userExists.rows.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await client.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
    [name, email, hashedPassword]
  );

  const token = generateToken(newUser.rows[0].id);

  res.cookie("token", token, cookieOptions);

  return res.status(201).json({ user: newUser.rows[0] });
});

// Login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const user = await client.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (user.rows.length === 0) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const userData = user.rows[0];

  const isMatch = await bcrypt.compare(password, userData.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(userData.id);

  res.cookie("token", token, cookieOptions);

  res.json({
    user: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    },
  });
});

// Me

router.get("/me", protect, async (req, res) => {
  res.json(req.user);
  // return info of the logged in user from protect middleware
});

// Logout

router.post("/logout", (req, res) => {
  res.cookie("token", "", { ...cookieOptions, maxAge: 1 });
  res.json({ message: "Logged out successfully" });
});


// app.post('/logout', (req, res, next) => {
//     // 1. Invalidate the web session
//     req.session.destroy(err => {
//         if (err) {
//             return next(err);
//         }
//         // 2. Clear any session cookie
//         res.clearCookie('connect.sid'); // The name of your session cookie
//         // 3. The database connection used to check credentials
//         //    was already returned to the pool after the initial check.
//         //    No explicit db 'logout' is needed here.
//         res.status(200).send('Logged out successfully');
//     });
// });


// Admin Endpoint to import products from JSON

router.post('/products', async (req, res) => {
  try {
    // Read the JSON file
    const data = fs.readFileSync('products.json', 'utf8');
    const products = JSON.parse(data);

    // Insert each product into the database
    for (const product of products) {
      await client.query(
        'INSERT INTO products (title, description, category, price, images, currency_code) VALUES ($1, $2, $3, $4, $5, $6)',
        [product.title, product.description,product.category,product.price,product.images,product.currency_code]
      );
    }
    res.status(200).json({ success: true, message:"Products imported successfully", data: products });
    } catch (error) {
    console.error(error);
    res.status(500).send('Error importing products');
  }
});

// GET all products

router.get('/allproducts', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM products ORDER BY id ASC');
        console.log("fetched products", result);
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// productgetbyId

router.get("/product/:id", async (req, res) => {

  const productId = req.params.id; // Get the ID from the URL parameter
  
  try {
  
    // Use a parameterized query ($1 refers to the first value in the array)
    const queryText = 'SELECT * FROM products WHERE id = $1';
    const result = await client.query(queryText, [productId]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]); // Send the single product object
    } else {
      res.status(404).send('Product not found');
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }

});


// update product

router.put("/:id", async (req, res) => {
  
  const { id } = req.params;
  const { title, description, category, price, images, currency_code } = req.body;

  try {
    const updateProduct = await client.query(`
      UPDATE products
      SET title=${title}, price=${price}, images=${images}, description=${description}, category=${category}, currency_code=${currency_code}
      WHERE id=${id}
      RETURNING *
    `);

    if (updateProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: updateProduct[0] });
  } catch (error) {
    console.log("Error in updateProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// delete product

router.delete("/:id", async (req, res) => {
  
 const { id } = req.params;

  try {
    const deletedProduct = await client.query(`
      DELETE FROM products WHERE id=${id} RETURNING *
    `);

    if (deletedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.log("Error in deleteProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});





export default router;





