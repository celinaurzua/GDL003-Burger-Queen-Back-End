const  mongoose= require('mongoose')
const express = require('express')
const Product= require('../models/products')
const router= express.Router()
const { check, validationResult } = require('express-validator');//libreria de validacion de informacion cliente

  
  router.get('/', async (req, res)=> {
    const products= await Product.find()
    res.json(products)
  })

  router.get('/:id', async (req, res)=>{
    const product= await Product.findById(req.params.id)
    if(!product) return res.status(404).send('No se encontró el producto')
    res.json(product)
  })
 
  router.post('/', [
    check('name').isLength({min:2}),
    check('price').isLength({min:1}),
    check('categories').isLength({min:1})
  ],async (req, res)=>{
      //validacion de los datos de name por parte de express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const product= new Product({
        name: req.body.name,
        price: req.body.price,
        categories: req.body.categories
      })

    const result= await product.save()
    res.status(201).send(result);//devolviendo el elemento nuevo que se creo con status 201 ya que es el resultado de solicitud metodo post
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
  



    //conexion con front a traves de direccion ip y hacer pruebas
    //