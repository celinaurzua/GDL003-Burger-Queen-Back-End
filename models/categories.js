const  mongoose= require('mongoose')

const categoriesSchema= new mongoose.Schema({
    categories: [String],
      date: {type: Date, default: Date.now}
    })
   
  const Categories= mongoose.model('categories', categoriesSchema)

  module.exports= Categories