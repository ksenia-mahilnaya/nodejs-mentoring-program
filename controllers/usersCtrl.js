const User = require('../models/User');

module.exports = {
    getAllUsers: (req, res) => {
        User.find((err, users) => {
          if (err) throw err;
          res.json(users);
        });
    },
    deleteUser: (req, res) => {
        User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    }
};