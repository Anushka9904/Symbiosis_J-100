// server.js
// Import required libraries.
const express = require('express');// Framework for building web applications and APIs.
const mysql = require('mysql2'); // MySQL client for connecting to and interacting with the database.
const bodyParser = require('body-parser');// Middleware to parse incoming request bodies in JSON format.
const cors = require('cors');// Middleware to enable Cross-Origin Resource Sharing (CORS) for requests from different origins.

const app = express();// Create an instance of an Express application.
const port = 8081;// Define the port number the server will listen on.

// Middleware configuration.
app.use(cors());// Enable CORS to allow requests from different origins (e.g., frontend running on a different domain/port).
app.use(bodyParser.json());// Parse incoming request bodies into JSON objects for easier handling.

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',// Hostname of the MySQL server.
  user: 'root', // Username for MySQL 
  password: 'WJ28@krhps', // Password for the MySQL user
  database: 'cart_db', //  database name
});

 // Establish connection to MySQL database.
db.connect((err) => {
  if (err) {
    // Log an error message if the connection fails.
    console.error('Error connecting to MySQL:', err);
     // Log a success message if the connection is established.
  } else {
    console.log('Connected to MySQL');
  }
});

// API to get cart items // API endpoint to retrieve all cart items.
app.get('/api/cart-items', (req, res) => {
  const query = 'SELECT * FROM cart_items';// SQL query to fetch all items from the `cart_items` table.
  db.query(query, (err, results) => {
    if (err) {
        // Send error response if the query fails.
      console.error('Error fetching cart items:', err);
      res.status(500).send('Error fetching cart items');
    } else {
          // Send the results (list of cart items) as a JSON response.
      res.json(results);
    }
  });
});

  // API endpoint to add an item to the cart.
app.post('/api/add-to-cart', (req, res) => {
  const { name, supplier, price, quantity, image, description } = req.body;// Extract item details from the request body.
  const query = 'INSERT INTO cart_items (name, supplier, price, quantity, image, description) VALUES (?, ?, ?, ?, ?, ?)';// SQL query to insert a new item.
  db.query(query, [name, supplier, price, quantity, image, description], (err, result) => {  // Provide values for the query parameters.
    if (err) {
        // Send error response if the query fails.
      console.error('Error adding item to cart:', err);
      res.status(500).send('Error adding item to cart');
    } else {

        // Send success response if the item is added successfully.
      res.status(200).send('Item added to cart');
    }
  });
});

 // API endpoint to update the quantity of an item in the cart.
app.put('/api/update-cart', (req, res) => {
  const { id, quantity } = req.body;// Extract item ID and updated quantity from the request body.
  const query = 'UPDATE cart_items SET quantity = ? WHERE id = ?';// SQL query to update item quantity.
  db.query(query, [quantity, id], (err, result) => {
    if (err) {
         // Send error response if the query fails.
      console.error('Error updating cart item:', err);
      res.status(500).send('Error updating cart item');
    } else {
         // Send success response if the quantity is updated successfully.
      res.status(200).send('Cart item updated');
    }
  });
});

// API to remove item from cart
app.delete('/api/remove-from-cart/id', (req, res) => {
  const { id } = req.params;// Extract the item ID from the request URL parameters.
  const query = 'DELETE FROM cart_items WHERE id = ?';// SQL query to delete an item by its ID.
  db.query(query, [id], (err, result) => {
    if (err) {
        // Send error response if the query fails.
      console.error('Error removing item from cart:', err);
      res.status(500).send('Error removing item from cart');
    } else {
        // Send success response if the item is removed successfully.
      res.status(200).send('Item removed from cart');
    }
  });
});

// API endpoint to place an order (clears all items from the cart).
app.post('/api/place-order', (req, res) => {
  const query = 'DELETE FROM cart_items';// SQL query to delete all items from the `cart_items` table.
  db.query(query, (err, result) => {
    if (err) {
         // Send error response if the query fails.
      console.error('Error placing order:', err);
      res.status(500).send('Error placing order');
    } else {
        // Send success response if the order is placed successfully.
      res.status(200).send('Order placed successfully');
    }
  });
});
// Start the server and listen on the specified port.
app.listen(port, () => {// Log a message indicating the server is running.
  console.log(`Server running on http://localhost:8081`);
});
