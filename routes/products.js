const express = require('express')
const router= express.Router()
const { check, validationResult } = require('express-validator');//libreria de validacion de informacion cliente


let products=[
    {id:0, name:'frappe mazapan', price:'30', upgrade:'2019-09-26'},
    {id:1, name:'frapuccino', price:'40', upgrade:'2019-09-26'},
    {id:2, name:'frappe moka', price:'35', upgrade:'2019-09-26'}
  ]

router.get('/list',(req, res)=> {
    res.send(['frape mazapan', 'frapuccino', 'frape moka' ])
  })
  
  router.get('/',(req, res)=> {
    res.send(products)
  })
  
  router.get('/:name', (req, res)=> {
    const product= products.find(product=>product.name === req.params.name)
    if (!product){
      res.status(404).send('producto no encontrado!')
    }else{res.send(products)}
    
  })
  
  router.get('/:name/:price/:upgrade', (req, res)=> {
    res.send(req.params)
  })
  
  router.post('/',(req, res)=>{
    let productId= products.length;//definiendo id para el nuevo producto
    let product={ //creando la estructura del objeto que se crea mediante post
      id:productId,
      name: req.body.name,
      price: req.body.price,
      upgrade: req.body.upgrade
    }
  
    products.push(product);//se agrega el nuevo product al array que ya se tiene
    res.status(201).send(product);//devolviendo el elemento nuevo que se creo con status 201 ya que es el resultado de solicitud metodo post
  })
   
  router.post('/2',(req, res)=>{
  //validacion de los datos de name
  
  if(!req.body.name || req.body.name.length < 3){
    res.status(400).send('nombre no valido!, introduce de nuevo un nombre valido')//estado 400 que es algo incorrecto
    return
  }//la parte donde no hay dato incorrecto en name se crea el producto
  
    let productId= products.length;//definiendo id para el nuevo producto
    let product={ //creando la estructura del objeto que se crea mediante post
      id:productId,
      name: req.body.name,
      price: req.body.price,
      upgrade: req.body.upgrade
    }
  
    products.push(product);//se agrega el nuevo product al array que ya se tiene
    res.status(201).send(product);//devolviendo el elemento nuevo que se creo con status 201 ya que es el resultado de solicitud metodo post
  })
  
  router.post('/3', [
    check('name').isLength({min:3}),
    check('price').isLength({min:2})
  ],(req, res)=>{
    //validacion de los datos de name por parte de express-validator
    //la parte donde no hay dato incorrecto en name se crea el producto
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
      let productId= products.length;//definiendo id para el nuevo producto
      let product={ //creando la estructura del objeto que se crea mediante post
        id:productId,
        name: req.body.name,
        price: req.body.price,
        upgrade: req.body.upgrade
      }
    
      products.push(product);//se agrega el nuevo product al array que ya se tiene
      res.status(201).send(product);//devolviendo el elemento nuevo que se creo con status 201 ya que es el resultado de solicitud metodo post
    })
  
    router.put('/:id', [
      check('name').isLength({min:3}),//validacion de los datos de name por parte de express-validator
      check('price').isLength({min:2})
    ], (req, res)=>{
      //validacion de los datos de name por parte de express-validator
      //la parte donde no hay dato incorrecto en name se crea el producto
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
        const product= products.find(product => product.id === parseInt(req.params.id))
          if(!product){
            return res.status(404).send('Id de producto no existe!!')//status 404 por error
          }
  
          product.name= req.body.name
          product.price= req.body.price
          product.upgrade= req.body.upgrade
  
          res.status(204).send(product)//devolviendo el elemento nuevo que se creo con status 204 ya que es el resultado de solicitud metodo put correcto
    })
  
    router.delete('/:id', (req, res)=>{
      const product= products.find(product => product.id === parseInt(req.params.id))
      if(!product){
        return res.status(404).send('Id de producto no existe y no se puede borrar!!')//status 404 por error
      } 
  
      const index= products.indexOf(product)
      products.splice(index,1)
      res.status(200).send('producto borrado (=')
    })

    module.exports = router
  