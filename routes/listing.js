const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");   //wrapAsync is use to handle the error within req and res and It help to manuipluate the server and It is use to show error of client side
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload= multer({storage});  // here multer automatically create the upload name folder and save the file


router
.route("/")
.get(wrapAsync(listingController.index))
.post(
isLoggedIn,
upload.single("listing[image]"),
validateListing,
wrapAsync( listingController.createListing)
);


//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
isLoggedIn,
isOwner,
upload.single("listing[image]"),
validateListing,
wrapAsync(listingController.updateListing)
)
.delete(
isLoggedIn,
isOwner,
wrapAsync(listingController.destroyListing)
);

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync( listingController.renderEditForm));

// //Index Route
// router.get("/",wrapAsync(listingController.index));


//Show Route
// router.get("/:id",wrapAsync(listingController.showListing));


// //Create Route
// router.post("/",isLoggedIn,validateListing,wrapAsync( listingController.createListing));


//Update Route
// router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

//Delete Route
// router.delete("/:id",isLoggedIn,wrapAsync( listingController.destroyListing));

module.exports= router;