const conn = require("./db")
const cors = require('cors');

const express = require('express')
const app = express()
const port = 5000

conn()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  credentials: true, // Allow credentials (cookies, authorization headers)
}));

app.use(function (req, res, next) {
  try {
    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
  
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } catch (error) {
    
  }


  next();
});


app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})