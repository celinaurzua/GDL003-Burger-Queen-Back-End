const mongoose = require('mongoose')
const express = require('express')
const Product = require('../models/products')
const router = express.Router()
const { check, validationResult } = require('express-validator');//libreria de validacion de informacion cliente


router.get('/', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

router.get('/:id', async (req, resp) => {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).send('No se encontró el producto')
  res.json(product)
})

router.post('/', [
  check('name').isLength({ min: 2 }),
  check('price').isLength({ min: 1 })
], async (req, res) => {
  //validacion de los datos de name por parte de express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    categories: req.body.categories
  })

  const result = await product.save()
  res.status(201).send(product);//devolviendo el elemento nuevo que se creo con status 201 ya que es el resultado de solicitud metodo post
})

router.put('/:id', [
  check('name').isLength({ min: 2 }),//validacion de los datos de name por parte de express-validator
  check('price').isLength({ min: 1 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const product = await product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    price: req.body.price,
    categories: req.body.categories
  },
    {
      new: true
    })
  if (!product) {
    return res.status(404).send('El producto con ese ID no existe')
  }
  res.status(204).send(product)
})

router.delete('/:id', async (req, res) => {

  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) {
    return res.status(404).send('Id de producto no existe y no se puede borrar')
  }

  res.status(200).send('Producto eliminado')
})

module.exports = router
