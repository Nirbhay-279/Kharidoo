const { Review } = require("../model/Review"); // Adjust the path based on your project structure

// Create a new review
const createReview = async (req, res) => {
  try {
    const { user, product, text, rating, email } = req.body;
    const newReview = new Review({ user, product, text, email, rating });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getReviewsByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find all reviews for the specified product ID
    const reviews = await Review.find({ product: productId });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a review by ID
const updateReview = async (req, res) => {
  try {
    const { text, rating } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.reviewId,
      { text, rating },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.reviewId);
    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getReviewsByProductId,
};
