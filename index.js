const express = require('express')
const app = express()
const port = process.env.PORT || 3003



let products=[
  {id:'01', name:'frappe mazapan', price:'30', upgrade:'2019-09'},
  {id:'02', name:'frapuccino', price:'40', upgrade:'2019-09'},
  {id:'03', name:'frape moka', price:'35', upgrade:'2019-09'}
]

app.get('/',(req, res)=> {
  res.send('Hola desde el backend')
})
app.get('/api/products/list',(req, res)=> {
  res.send(['frape mazapan', 'frapuccino', 'frape moka' ])
})
app.get('/api/products',(req, res)=> {
  res.send(products)
})
app.get('/api/products/:name', (req, res)=> {
  const product= products.find(product=>product.name === req.params.name)
  if (!product){
    res.status(404).send('producto no encontrado!')
  }else{res.send(products)}
  
})

app.get('/api/products/:name/:price/:upgrade', (req, res)=> {
  res.send(req.params)
})

app.post('/api/products',(req, res)=>{
  let productId= products.length;
  let product={
    id:productId,
    name: req.params.name,
    price: req.params.price,
    upgrade: req.params.upgrade
  }

  products.push(product);
  res.send(product);
})
 
app.listen(port, console.log('Escuchando en puerto: '+port))