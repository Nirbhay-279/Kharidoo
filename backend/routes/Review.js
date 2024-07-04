const express = require('express');
const {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
    getReviewsByProductId
} = require('../controller/Review'); // Adjust the path based on your project structure

const ReviewRouter = express.Router();

ReviewRouter
    .post('/', createReview)
    .get('/:productId', getReviewsByProductId)
    .get('/:reviewId', getReviewById)
    .patch('/:reviewId', updateReview)
    .delete('/:reviewId', deleteReview);

module.exports = ReviewRouter;
