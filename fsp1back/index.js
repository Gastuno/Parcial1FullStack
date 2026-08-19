const express = require('express')
const morgan = require('morgan');

const router = require('./routes/routes')
const app = express()

app.use(express.json())
app.use(morgan('tiny'));
app.use(router)

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT || 3001}`)
})