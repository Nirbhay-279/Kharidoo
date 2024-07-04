const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
    name: String,
    email: {type :String,unique: true},
    phone: String,
    street: String,
    city: String,
    state: String,
    pinCode: String,
});

const userSchema = new Schema({
    email: String,
    password: { type: Buffer, required: true },
    confirmpassword: String,
    status: String,
    salt: Buffer,
    addresses: [addressSchema], // Array of addresses using the addressSchema
});
const virtualId  = userSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})
// we can't sort using the virtual fields. better to make this field at time of doc creation
// const virtualDiscountPrice =  productSchema.virtual('discountPrice');
// virtualDiscountPrice.get(function(){
//     return Math.round(this.price*(1-this.discountPercentage/100));
// })
userSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})
const User = mongoose.model('User', userSchema);

module.exports = User;
