const ProductModel = require('../models/Product');
const { redisClient } = require('../utils/redisConfig');

class Product {
  addProduct = async (req, res) => {
    const { name, price, stock } = req.body;
    try {
      const product = new ProductModel({ name, price, stock });
      await product.save();
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating product', error });
    }
  }

  getProductCache = async (req, res) => {
    const { id } = req.params;
    try {
      // Check Redis cache for the all-products list
      const cachedProducts = await redisClient.get('allProducts');
 
      if (cachedProducts) {
          console.log('Cache hit for all products');
          return JSON.parse(cachedProducts);
      }

      console.log('Cache miss for all products');
      // Fetch all products from the database (replace with actual DB query)
      const products = await ProductModel.find();
      
      if (products) {
        // Cache the product list in Redis with a TTL of 1 hour
        await redisClient.setEx('allProducts', 3600, JSON.stringify(products));
        return res.json(products);
      } else {
        return res.status(404).json({ message: 'Products not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching product', error });
    }
  }
}

module.exports = Product