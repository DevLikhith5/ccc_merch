const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

function deriveTags(category) {
  const words = category.replace(/['"`]/g, '').split(/[^a-zA-Z0-9]+/).filter(Boolean);
  const tagMap = {
    electronics: ['electronics', 'gadgets', 'tech'],
    jewelery: ['jewelery', 'accessories', 'ornaments'],
    'mens clothing': ['men', 'clothing', 'fashion', 'apparel'],
    'womens clothing': ['women', 'clothing', 'fashion', 'apparel'],
  };
  const key = words.join(' ').toLowerCase();
  return tagMap[key] || words;
}

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();

    const productsWithTags = products.map((p) => ({
      ...p,
      tags: deriveTags(p.category),
    }));

    await Product.deleteMany({});
    await Product.insertMany(productsWithTags);

    console.log(`${products.length} products seeded successfully`);

  } catch (error) {
    console.error('Seed error:', error.message);
  }
};

seedProducts();
