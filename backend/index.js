const express = require('express')

const cors = require('cors')
const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.get('/order', (req, res) => {
    res.json({ message: 'Hello world' })
})

app.get('/order/:orderId', (req, res) => {
    res.json('Hello World!')
})
app.post('/order/:orderId', (req, res) => {
    res.json('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})