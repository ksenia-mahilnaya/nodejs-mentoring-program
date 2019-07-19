const mongoose = require('mongoose');
const City = require('../models/City');

module.exports = {
    getAllCities: async (req, res) => {
      try {
        const cities = await City.find();
        res.status(200).json(cities);
      } catch(err) {
        res.status(500).send(err);
      }
    },
    getCityById: async (req, res) => {
      try {
        const city = await City.findById(req.params.id);
        res.status(200).json(city);
      } catch(err) {
        res.status(500).send(err);
      }
    },
    addNewCity: async (req, res) => {
      try {
        const city = new City({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          country: req.body.country,
          capital: req.body.capital,
          location: req.body.location
        });

        await city.save();
        res.status(200).json(city);
        } catch(err) {
          res.status(500).send(err);
        }
    },
    updateCity: async (req, res) => {
      const newCityProps = {
        name: req.query.name,
        country: req.query.country,
        capital: req.query.capital,
        location: req.query.location
      };

      try {
        const city = await City.findOneAndUpdate({ _id: req.params.id }, { $set: newCityProps }, { new: true });
        res.status(200).json(city);
      } catch(err) {
        res.status(500).send(err);
      }
    },
    removeCity: async (req, res) => {
      try {
        const city = await City.findByIdAndRemove({ _id: req.params.id });
        res.status(200).json(city);
      } catch(err) {
        res.status(500).send(err);
      }
    }
};
