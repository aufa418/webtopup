const express = require('express')
const Index = require('./routes/Index.js')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', Index);

// Menjalankan server pada port 3000
app.listen(3000, () => console.log('Server is running on http://localhost:3000'));

