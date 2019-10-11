const  mongoose= require('mongoose')

const categoriesSchema= new mongoose.Schema({
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
   
  const Categories= mongoose.model('categories', categoriesSchema)

  module.exports= Categories