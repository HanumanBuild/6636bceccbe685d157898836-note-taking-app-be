const express = require('express');
const cors = require('cors');
require('./src/db/mongoose');
const userRouter = require('./src/routes/user');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});