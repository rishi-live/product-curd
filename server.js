const express = require('express');
const dbConnection = require('./database/connection');
const app = express();
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// https://speeding-sunset-543748.postman.co/documentation/10718680-fa0f5bdc-0b9d-4350-a3fa-16947c3456c4/publish?workspaceId=ebb1cca5-603b-40bf-a658-6d6ae1892b8d
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