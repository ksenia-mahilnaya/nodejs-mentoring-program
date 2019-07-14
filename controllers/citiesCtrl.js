const City = require('../models/City');

module.exports = {
    getAllCities: (req, res) => {
      City.find((err, cities) => {
        if (err) throw err;
        res.json(cities);
      });
    },
    addNewCity: (req, res) => {
      const city = new City({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        country: req.body.country,
        capital: req.body.capital,
        location: req.body.location
      });
    
      // city.schema.pre('save', function(next) {
      //   this.lastModifiedDate = new Date();
      //   next();
      // });
    
      city.save((err) => {
        if (err) throw err;
        console.log('City saved successfully');
        res.json(city);
        });
    },
    updateCity: (req, res) => {
      const newCityProps = {
        name: req.params.name,
        country: req.params.country,
        capital: req.params.capital,
        location: req.params.location
      };
    
      // City.schema.pre('findOneAndUpdate', function(next) {
      //   this._update.$set.newCityProps.lastModifiedDate = new Date();
      //   next();
      // });
      
      City.findOneAndUpdate({ _id: req.params.id }, { $set: newCityProps }, { new: true }, (err, city) => {
        if (err) throw err;
        console.log('City updated successfully');
          res.json(city);
      });
    },
    removeCity: (req, res) => {
      City.findByIdAndRemove(req.params.id, (err, city) => {
        if (err) throw err;
        res.json(city);
      });
    }
};