const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the review schema
const reviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming you have a User model
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    email: { type: String }, // Reference to the Product model
    text: { type: String, required: true },
    rating: { type: Number, min: [1, 'wrong min rating'], max: [5, 'wrong max rating'], required: true },
});

// Export the Review model
exports.Review = mongoose.model('Review', reviewSchema);