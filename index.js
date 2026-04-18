const express = require('express');
const { Faker, en } = require('@faker-js/faker');

const app = express();
const port = process.env.PORT || 3000;

const faker = new Faker({ locale: [en] });

function generateUsers(count = 10) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    avatar: faker.image.avatar(),
    phone: faker.phone.number(),
    website: faker.internet.url(),
    company: faker.company.name(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country()
    }
  }));
}

function generatePosts(count = 10) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(2),
    published: faker.date.recent().toISOString(),
    author: `${faker.person.firstName()} ${faker.person.lastName()}`
  }));
}

function generateProducts(count = 10) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({ min: 5, max: 500, dec: 2 }),
    category: faker.commerce.department(),
    stock: faker.number.int({ min: 0, max: 100 }),
    sku: faker.string.alphanumeric(8).toUpperCase(),
    image: faker.image.urlLoremFlickr({ category: 'product', width: 320, height: 240 })
  }));
}

function generateOrders(count = 5) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    orderNumber: faker.string.alphanumeric(10).toUpperCase(),
    total: faker.commerce.price({ min: 20, max: 1500, dec: 2 }),
    status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
    createdAt: faker.date.recent({ days: 14 }).toISOString(),
    customer: `${faker.person.firstName()} ${faker.person.lastName()}`
  }));
}

const endpoints = {
  users: generateUsers,
  posts: generatePosts,
  products: generateProducts,
  orders: generateOrders
};

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'Fake API Generator is running.',
    endpoints: ['/users', '/posts', '/products', '/orders']
  });
});

app.get('/:resource', (req, res) => {
  const { resource } = req.params;
  const count = Number(req.query.count) || 10;

  if (!endpoints[resource]) {
    return res.status(404).json({
      error: 'Unknown resource',
      supportedResources: Object.keys(endpoints)
    });
  }

  const data = endpoints[resource](Math.min(Math.max(count, 1), 100));
  res.json({ resource, count: data.length, data });
});

app.listen(port, () => {
  console.log(`Fake API server listening at http://localhost:${port}`);
});
