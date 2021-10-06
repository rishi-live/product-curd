const express = require('express');
const dbConnection = require('./database/connection');
const app = express();
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// https://documenter.getpostman.com/view/10718680/UUy67QLh
app.use('/api/product', require('./Routes/productRoute'));

const PORT =  3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {}
  });
});
