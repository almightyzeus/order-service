// orderController.js
const Order = require('./orderModel');
const axios = require('axios');

exports.createOrder = async (req, res) => {
  try {
    const { userId, productList} = req.body;
    const order = new Order({ userId, productList });
    await order.save();
    const emailUrl = 'https://localhost:7148/api/SendEmailFunction'; // Replace this with your actual URL

    // Dummy data to be sent in the HTTP POST request
    const orderData = {order};

    // Send HTTP POST request to the dummy URL with the order object
    axios.post(emailUrl, orderData)
  .then(response => {
    console.log('Email sent successfully:', response.data);
  })
  .catch(error => {
    console.error('Error sending email:', error);
  });

    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  };

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};


exports.updateOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update order' });
    }
  };
  
exports.deleteOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete order' });
    }
  };
  
  

// Implement other CRUD operations (getOrder, updateOrder, deleteOrder) as needed
