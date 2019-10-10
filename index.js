const  mongoose= require('mongoose')
const express = require('express')
const app = express()
const products= require('./routes/products')
app.use(express.json())//parsear los objetos json atraves del middleware, el cual analizara la peticion y la convierte en json
app.use('/api/products', products)//creando path que va a llamar con  el modulo products.js
const port = process.env.PORT || 27017
app.listen(port, console.log('Escuchando en puerto: '+port))


mongoose.connect('mongodb+srv://tagleurzua:mothersofcode@ciboullet-fc4ex.gcp.mongodb.net/cafedb', {useNewUrlParser: true, useUnifiedTopology:true})
  .then(resp=>console.log('Conectando correctamente a MongoDB'))
  .catch(err => console.log('Error al conectarse a MongoDB'))



/*

const date= require('./date')//usando middleware propio
const morgan= require('morgan')//usando middleware de express
app.use(date)
Té durazno-naranja
app.use(morgan('tiny'))*/

/* middleware para que solamente funcione en el path asignado
app.use('/api/products/list',(req, res, next)=>{
  console.log('Request Type: ', req.method)
  next()
})*/




/*app.get('/',(req, res)=> {
  res.send('Hola desde el backend')
})
*/


/*
*********************************************************************************************

//agregando mongoose
const mongoose = require('mongoose');

//Usando connect your application:=>  mongodb+srv://tagleurzua:<password>@ciboullet-fc4ex.gcp.mongodb.net/admin?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://tagleurzua:mothersofcode@ciboullet-fc4ex.gcp.mongodb.net/cafedb', {useNewUrlParser: true})
//mongoose.connect('mongodb://localhost/cafedb', {useNewUrlParser: true})  
  .then(resp=>console.log('Conectando correctamente a MongoDB'))
  .catch(err => console.log('Error al conectarse a MongoDB'))


    const productSchema= new mongoose.Schema({
      name: String,
      price: Number,
      categories: String,
      date: {type: Date, default: Date.now}
    })


  const Product= mongoose.model('products', productSchema)



const createProduct= async()=>{
  const product = new Product({
    name:'Baguette 3 quesos',
    price:55,
    categories: 'ALIMENTOS'
  })

  const result = await product.save()
  console.log(result)
}

//createProduct()


const getProducts= async ()=>{
  const products = await Product.find()
  console.log(products)
}
//getProducts()

const getCateforyAndPriceProducts= async ()=>{
  const products= await Product.find({categories:'BEBIDAS FRIAS', price:30})
  console.log(products)
}
//getCateforyAndPriceProducts()

const getBebidasCalientesAndPrice= async()=>{
  const products= await Product.find({categories:'BEBIDAS CALIENTES'})
    .sort({price: -1})
    .limit(10)
  console.log(products) 
}
//getBebidasCalientesAndPrice()

const getFilterPriceProducts= async ()=>{
  const products= await Product.find({price:{$gt:25, $lt:35}})
  console.log(products)
}
//getFilterPriceProducts()

const getFilterInNinProducts= async ()=>{
  const products= await Product.find({date:{$in:2019}})
  console.log(products)
}
//getFilterInNinProducts()
const getCountProducts= async()=>{
  const products= await Product.find().count()
  const bebidasFrias= await Product.find({categories:'BEBIDAS FRIAS'}).count()
  const bebidasCalientes= await Product.find({categories: 'BEBIDAS CALIENTES'}).count()
  console.log('El total de productos: '+products)
  console.log('El total de BEBIDAS FRIAS: '+bebidasFrias)
  console.log('El total de BEBIDAS CALIENTES:'+bebidasCalientes)
}
//getCountProducts()


const getPaginationPorducts= async ()=> {
  const pageNumber= 1
  const pageSize=5
  
  const products= await Product.find()
    .skip((pageNumber-1)*pageSize)
    .limit(pageSize)

    console.log(products)
}

//getPaginationPorducts()

const updateProduct= async (id)=> {
  const product= await Product.findById(id)
  if(!product){
    return
  }else{
    product.price= 30
    product.name='Frappé de Mazapán'
    //product.image='https://i.imgur.com/f1i52N4.jpg'

    const result= await product.save()
    console.log('El cambio es: ',result)
  }
}

updateProduct('5d96d2ef18d8dc2b6a430015')

const updateSecondtProduct= async (id)=>{
  const result= await Product.update(
    {_id: id},
    {
      $set:{
        name: 'Frappé Moka VIP PLUS',
        price:200
      }
    }
  )
  console.log(result)
}
//updateSecondtProduct('5d9672707f42291b6a15c4fc')


const deletProduct= async (id)=>{
  const result= await Product.deleteOne({_id: id})
  console.log(result)
}
//deletProduct('5d967532e9a06d1d6696f3c1')



*/



