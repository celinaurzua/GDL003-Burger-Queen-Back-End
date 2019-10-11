const mongoose = require('mongoose')
const express = require('express')
const Categories = require('../../models/categories')
const router = express.Router()
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    const categories = await Categories.find({name:''})
    res.send(categories)
  })  
  
  router.get('/:name', async (req, res)=>{
      const categories= await Categories.find(req.params.name)
      if(!categories) return res.status(404).send('No se encontró la categoría')
      res.send(categories)
    })
   
  module.exports = router