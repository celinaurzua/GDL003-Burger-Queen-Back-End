const express = require('express')
const app = express()

const products= require('./routes/products')
app.use(express.json())//parsear los objetos json atraves del middleware, el cual analizara la peticion y la convierte en json
app.use('/api/products', products)//creando path que va a llamar con el modulo products.js

const port = process.env.PORT || 3003

const date= require('./date')//usando middleware propio
const morgan= require('morgan')//usando middleware de express




app.use(date)

app.use(morgan('tiny'))

/* middleware para que solamente funcione en el path asignado
app.use('/api/products/list',(req, res, next)=>{
  console.log('Request Type: ', req.method)
  next()
})*/



app.get('/',(req, res)=> {
  res.send('Hola desde el backend')
})


app.listen(port, console.log('Escuchando en puerto: '+port))