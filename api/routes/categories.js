const mongoose = require('mongoose')
const express = require('express')
const Categories = require('../../models/categories')
const router = express.Router()
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    const categories = await Categories.find()
    res.send(categories)
  })  
  
router.get('/:categories', async (req, res)=>{
    const categories= await Categories.find(req.params.categories)
    if(!categories) return res.status(404).send('No se encontró la categoría')
    res.send(categories)
  })

  router.post('/', [
    check('categories').isLength({min:1})
  ],async (req, res)=>{
      //validacion de los datos de name por parte de express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const categories= new Categories({
        categories: req.body.categories
      })

    const result= await categories.save()
    res.status(201).send(result);//devolviendo el elemento nuevo que se creo con status 201 ya que es el resultado de solicitud metodo post

  })
  
module.exports = router