import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Load from './src/models/Load';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/teambhariya';

const seedLoads = [
  {
    origin: 'Kathmandu',
    destination: 'Pokhara',
    weight: 500,
    vehicleTypeRequired: 'Mini Truck',
    price: 15000,
  },
  {
    origin: 'Biratnagar',
    destination: 'Dharan',
    weight: 2000,
    vehicleTypeRequired: 'Heavy Truck',
    price: 8000,
  },
  {
    origin: 'Chitwan',
    destination: 'Kathmandu',
    weight: 1200,
    vehicleTypeRequired: 'Pickup',
    price: 10000,
  }
];

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear existing loads
    await Load.deleteMany({});
    console.log('Cleared existing loads');
    
    // Insert new seed data
    await Load.insertMany(seedLoads);
    console.log('Successfully seeded test loads');
    
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error seeding data:', err);
    process.exit(1);
  });
