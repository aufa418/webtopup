import express from "express";
import productRoute from './routes/ProductRoute.js'
import cors from 'cors'

const app = express();

// Pastikan middleware untuk mengurai JSON ditempatkan sebelum route yang membutuhkan akses ke req.body
app.use(express.json());
app.use(cors());

// Route untuk produk
app.use('/product', productRoute);

// Menjalankan server pada port 3000
app.listen(3000, () => console.log('Server is running on http://localhost:3000'));

