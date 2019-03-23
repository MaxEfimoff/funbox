const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Location = require("../../models/Location");

//route GET api/locations/test
//desc  Tests location route
router.get("/test", (req, res) => res.json({ msg: "Locations works" }));

//route POST api/locations/create
//desc  Creates new location
//router.post("/");

router.post("/", (req, res) => {
  const newLocation = new Location({
    name: req.body.name
  });
  newLocation.save().then(post => res.json(post));
});

//route POST api/locations/create
//desc  Creates new location
router.get("/", (req, res) => {
  Location.find()
    .sort({ date: 1 })
    .then(locations => res.json(locations))
    .catch(err =>
      res.status(404).json({ nolocationfound: "No locations found" })
    );
});

//route DELETE api/locations/delete
//desc  Deletes location
router.delete("/:id", (req, res) => {
  Location.findById(req.params.id)
    .then(location => {
      //Delete
      location.remove().then(() => res.json({ success: true }));
    })
    .catch(err =>
      res.status(404).json({ locationnotfound: "No location found" })
    );
});

module.exports = router;
