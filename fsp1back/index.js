const express = require('express')
const morgan = require('morgan');

const router = require('./routes/routes')
const app = express()

app.use(express.json())
app.use(morgan('tiny'));
app.use(router)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})