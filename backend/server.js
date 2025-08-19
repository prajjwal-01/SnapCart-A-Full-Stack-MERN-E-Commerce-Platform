import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url'; // 1. Import this new function
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config({ path: './backend/.env' });

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- THIS IS THE KEY FIX ---
// This is the modern, standard way to get the directory name in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// This now creates a correct, absolute path to the images folder
app.use('/images', express.static(path.join(__dirname, 'images')));
// --- END OF FIX ---

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});