// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const orderController = require('./orderController');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/order_service', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Define routes for order operations
app.post('/orders/createOrder', orderController.createOrder);
app.get('/orders/getAllOrders', orderController.getAllOrders);
app.get('/orders/getOrderbyId/:orderId', orderController.getOrderById);
app.put('/orders/updateOrderById/:orderId', orderController.updateOrder);
app.delete('/orders/deleteOrderById/:orderId', orderController.deleteOrder);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Order Service is running on port ${PORT}`);
});
