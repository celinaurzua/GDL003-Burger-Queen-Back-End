const  mongoose= require('mongoose')

const productSchema= new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: true,
    },
    categories: {
      type: String,
      required: true,
      uppercase:true,
      minlength: 2,
      maxlength:20,
      enum: ['BEBIDAS CALIENTES', 'BEBIDAS FRIAS', 'ALIMENTOS', 'POSTRES', 'EXTRAS']
    },
    date: {type: Date, default: Date.now}
  })
  
  
  const Product= mongoose.model('products', productSchema)

  module.exports= Product