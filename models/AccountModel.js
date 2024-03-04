//账单model
const mongoose = require('mongoose')

console.log('succuess')
let AccountSchema = new mongoose.Schema({
	name:String,
	price:Number,
	time:Date
})

let AccountModel = mongoose.model('accounts',AccountSchema)


module.exports = AccountModel