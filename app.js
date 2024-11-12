const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const CartRoutes = require('./src/routes/cart.routes');
const ProductRoutes = require('./src/routes/product.routes');
const PaymentRoutes = require('./src/routes/payment.routes');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/', (req, res) => {
  console.log('home alone')
  res.json("home alone");
});

app.use('/api/v1/carts', CartRoutes)
app.use('/api/v1/products', ProductRoutes)
app.use('/api/v1/payments', PaymentRoutes)

const PORT = process.env.PORT || 3100;

app.listen(PORT, async () => {
  // MongoDB connection
  await mongoose.connect('mongodb://localhost:27017/shopping', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Server running on ', PORT);
})
