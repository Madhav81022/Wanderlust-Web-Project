//Backend part
const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");   //wrapAsync is use to handle the error within req and res and It help to manuipluate the server and It is use to show error of client side
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");
const review = require("../models/review.js");

//Post Review Route
router.post("/",
isLoggedIn,
validateReview,
wrapAsync(reviewController.createReview));

  //Delete Review Route
  router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));

  //   }));
  module.exports = router;
  