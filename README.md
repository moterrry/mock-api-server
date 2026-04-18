# Fake API Generator

A simple local Node.js API generator for development and testing.

## Features

- `GET /users` - returns a fake user list
- `GET /posts` - returns fake blog posts
- `GET /products` - returns fake products
- `GET /orders` - returns fake orders
- `GET /:resource?count=20` - returns a configurable number of fake items for supported resources

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Open:

- `http://localhost:3000/`
- `http://localhost:3000/users`
- `http://localhost:3000/posts`
- `http://localhost:3000/products`
- `http://localhost:3000/orders`

## Notes

- The server uses `express` and `@faker-js/faker`
- CORS is enabled for local testing
- Query `count` to control the number of returned items
