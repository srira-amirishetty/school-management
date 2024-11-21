const express = require("express");
const router = express.Router();
const School = require("../models/schools");

router.post("/addSchool", async (req, res) => {
    try {
    const { name, address, latitude, longitude } = req.body;

    console.log("Request Payload:", req.body);

    if (!name || !address || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    
      const school = new School({ name, address, latitude, longitude });
      await school.save();
      res.status(201).json({ message: "School added successfully", school });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
  

router.get('/listSchoolsNearBy', async (req, res) => {
    const { latitude, longitude } = req.query;
  
    
    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and Longitude are required" });
    }
  
    try {
      const schools = await School.find();
  
      
      const userLocation = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
  
      const sortedSchools = schools
        .map((school) => {
          const distance = getDistance(
            userLocation.latitude,
            userLocation.longitude,
            school.latitude,
            school.longitude
          );
          return { ...school.toObject(), distance };
        })
        .sort((a, b) => a.distance - b.distance);
  
      res.json(sortedSchools);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
  
  function getDistance(lat1, lon1, lat2, lon2) {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  router.get("/listAllSchools", async (req, res) => {
    try {

      const schools = await School.find();

      res.status(200).json({
        message: "Schools fetched successfully",
        data: schools,
      });
    } catch (error) {
      console.error("Error fetching schools:", error.message);
      res.status(500).json({ error: "An error occurred while fetching schools" });
    }
  });
  
  module.exports = router;
  