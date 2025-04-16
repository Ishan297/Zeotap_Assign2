const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ingestRoutes = require('./routes/ingestRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/', ingestRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
