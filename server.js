require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const { router } = require('./routes.js')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(router)

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
