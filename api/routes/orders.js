const mongoose = require('mongoose')
const express = require('express')
const Order = require('../../models/orders')
const router = express.Router()
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    const orders = await Order.find()
    res.json(orders)
  })  
  
  router.get('/:id', async (req, res)=>{
      const orders= await Order.findById(req.params.id)
      if(!order) return res.status(404).send('No se encontró la orden')
      res.json(orders)
    })
   
    router.post('/', [
      check('user').isLength({min:1}),
      check('items').isLength({min:1}),
      check('status').isLength({min:1})
    ],async (req, res)=>{
        //validacion de los datos de name por parte de express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        const order= new Order({
          user: req.body.user,
          items: req.body.items,
          status: req.body.status
        })
  
      const result= await order.save()
      res.status(201).send(result);//devolviendo el elemento nuevo que se creo con status 201 ya que es el resultado de solicitud metodo post
  
    })





    router.put('/:id', [
      check('user').isLength({ min: 1 }),//validacion de los datos de name por parte de express-validator
      check('items').isLength({ min: 1 })
    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
    
      const order = await Order.findByIdAndUpdate(req.params.id, {
        user: req.body.user,
        items: req.body.items,
      
      },
      {
          new: true
      })
    
      if (!product){
        return res.status(404).send('La orden con ese ID no existe')
      }
    
      res.status(200).send('La orden ha sido editada')
    
    })
    
    
    router.delete('/:id', async (req, res) => {
    
      const order = await Order.findByIdAndDelete(req.params.id)
      if (!order) {
        return res.status(404).send('Id de esa orden no existe y no se puede borrar')
      }
    
      res.status(200).send('Orden eliminada')
    })


module.exports = router