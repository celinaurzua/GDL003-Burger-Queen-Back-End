const  mongoose= require('mongoose')

const orderSchema= new mongoose.Schema({
    user: {
      type: Number,
      required: true,
      minlength: 1
    },
    items:
    {
        type: Array,
        required: true,
    },
    status: {
      type: Boolean,
      required: true,
      minlength: 2,
      enum: ['abierta']
    },
    date: {type: Date, default: Date.now}
  })
  
  
  const Order= mongoose.model('orders', orderSchema)

  module.exports= Order