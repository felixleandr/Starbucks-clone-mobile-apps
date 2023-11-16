if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express')
const app = express()
const port = process.env.PORT || 4002
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)
app.use(errorHandler)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})