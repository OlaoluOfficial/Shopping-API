Shopping Cart System API Documentation

This documentation provides a comprehensive guide to the Shopping Cart System API, which allows multiple users to manage their carts and purchase products from a shared inventory. It covers the system setup, API endpoints, data models, technical considerations, and key features such as product management, cart management, and checkout functionality.

1. System Overview
The Shopping Cart System API is built with:

- Node.js for the server-side logic.
- MongoDB as the primary database for product and cart data.
- Redis for caching product data and implementing concurrency control.

Core Features:
a. Product Management:
- Create, update, and fetch product details.
- Manage product inventory and stock levels.

b. Cart Management:
- Add/remove products from a user's cart.
- View the contents of the cart.

c. Checkout Process:
- Process user checkouts.
- Maintain accurate stock levels and prevent overselling.

2. Project Setup

Prerequisites:
- Node.js (v14+)
- MongoDB (local or cloud instance)
- Redis (local or cloud instance)

Installation:
- Clone the repository and navigate to the project directory:

## git clone <repository-url>
## cd shopping-cart-system

Install the required dependencies:

## npm install
## Ensure MongoDB and Redis are running on their default ports. If using custom ports, update the connection details in app.js.

To seed initial product data, run the seed script:

## node seed.js

Start the API server:

## node app.js

The server will run on http://localhost:3100.

3. Data Models
Product Model
The Product model stores information about available products and their stock levels.

Field	  Type	Description
_id	    ObjectId	  Unique identifier for the product.
name	  String	    The name of the product.
price	  Number	    The price of the product.
stock	  Number	    The number of items available in stock.

Example:

{
  "_id": "64c72a3d97d2ab1234e7c6bc",
  "name": "Laptop",
  "price": 1000,
  "stock": 10
}

Cart Model
The Cart model stores items that users add to their shopping cart.

Field	    Type	      Description
_id	      ObjectId	  Unique identifier for the cart.
user_id	  String	    Unique identifier for the user owning the cart.
items	    Array	      List of products and their quantities in the cart.

Example:

{
  "_id": "64c72a3d97d2ab1234e7c6ef",
  "user_id": "user_123",
  "items": [
    {
      "product_id": "64c72a3d97d2ab1234e7c6bc",
      "quantity": 2
    }
  ]
}

4. API Endpoints
Product Management Endpoints
a. Add New Product
- URL: /products
- Method: POST
- Description: Adds a new product to the inventory.

Request Body:
{
  "name": "Laptop",
  "price": 1000,
  "stock": 10
}

Response:
- 201 Created: Returns the newly created product.
{
  "_id": "64c72a3d97d2ab1234e7c6bc",
  "name": "Laptop",
  "price": 1000,
  "stock": 10
}

b. Fetch Product with Caching
- URL: /products/:id
- Method: GET
- Description: Fetches product details from the database or Redis cache.

URL Parameters:
- :id - The ID of the product to fetch.

Response:
- 200 OK: Returns the product details.

{
  "_id": "64c72a3d97d2ab1234e7c6bc",
  "name": "Laptop",
  "price": 1000,
  "stock": 10
}
- 404 Not Found: If the product is not found.
{ "message": "Product not found" }

Cart Management Endpoints
a. Add Item to Cart
- URL: /cart
- Method: POST
- Description: Adds a product to the user's cart.

Request Body:

{
  "user_id": "user_123",
  "product_id": "64c72a3d97d2ab1234e7c6bc",
  "quantity": 2
}

Response:
- 201 Created: If a new cart is created, returns the cart.
- 200 OK: If an existing cart is updated, returns the updated cart.

{
  "_id": "64c72a3d97d2ab1234e7c6ef",
  "user_id": "user_123",
  "items": [
    {
      "product_id": "64c72a3d97d2ab1234e7c6bc",
      "quantity": 2
    }
  ]
}
- 400 Bad Request: If the product does not have enough stock.

{ "message": "Insufficient stock" }

b. Checkout

- URL: /checkout/:user_id
- Method: POST
- Description: Processes checkout for the given user, deducts stock from the inventory, and clears the user's cart.

URL Parameters:
- :user_id - The ID of the user performing checkout.

Response:
- 200 OK: If the checkout is successful.

{ "message": "Checkout successful" }

- 400 Bad Request: If the user's cart is empty.

{ "message": "Cart is empty" }

- 500 Internal Server Error: If there is a problem processing the checkout.

{ "message": "Checkout failed", "error": "<error-message>" }


5. Technical Implementation Details
1. Handling Concurrency:
To handle concurrent updates and prevent overselling, we implement the following mechanisms:

Redis Locking Mechanism: During checkout, we use Redis to lock product stock until the transaction is complete. This ensures that two users cannot checkout the same product simultaneously and oversell stock.
MongoDB Transactions: We use MongoDB transactions during the checkout process to ensure atomicity when updating stock levels across multiple products.
2. Caching with Redis:
Redis is used to cache frequently accessed product data, reducing the load on MongoDB. Products are cached for 1 hour, and cache invalidation happens when the product's stock is updated during checkout.

3. Optimizing MongoDB Queries:
We ensure that MongoDB collections for Products and Carts are indexed on commonly queried fields like product_id and user_id for faster read operations.

4. Data Consistency:
During checkout, stock levels in the Products collection are updated in MongoDB.
After a successful checkout, the user's Cart is cleared.
If any step in the checkout process fails, MongoDB transactions ensure that no changes are committed, maintaining data integrity.
6. Setup Instructions
Install dependencies:

## npm install
Ensure MongoDB and Redis are running. By default, MongoDB is expected to run on mongodb://localhost:27017, and Redis on localhost:6379.

Seed test products by running:

## node seed.js

Start the server:

## node app.js


7. Assumptions
User Authentication: The current implementation assumes that the user_id is provided directly. In a real-world scenario, authentication (such as JWT) would be needed.
Stock Levels: The system assumes that product stock is only updated during checkout. Other actions that could affect stock (e.g., refunds or cancellations) would require additional logic.
Caching Policy: Redis is configured with a simple TTL for product caching. In a larger system, a more sophisticated invalidation strategy might be necessary.


8. Future Improvements
User Authentication and Authorization: Implement proper user authentication to secure the API endpoints.
Product Reviews: Allow users to leave reviews for






Continue generating# Shopping-API
