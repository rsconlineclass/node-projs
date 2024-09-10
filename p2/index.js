const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const fileRoutes = require('./routes/fileRoute');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
