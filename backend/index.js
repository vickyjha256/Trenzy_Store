const mongoConnection = require('./db'); // Imported db.js file.

const express = require('express');
var cors = require('cors');

mongoConnection();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// This is for authentication of user and admin.
app.use('/api/userauth', require('./routes/userauth'));
app.use('/api/adminauth', require('./routes/adminauth'));

// This is for Stored data of the user and admin.
app.use('/api/adminproducts', require('./routes/adminproducts'));
app.use('/api/usercart', require('./routes/usercart'));
app.use('/api/userorder', require('./routes/userorder'));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


// mongoConnection().then(() => {
  app.listen(port, () => {
    console.log(`ShoeStore app listening on port ${port}`)
  })
// })