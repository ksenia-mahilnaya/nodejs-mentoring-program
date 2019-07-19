const User = require('../models/User');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
            } catch(err) {
            res.status(500).send(err);
            }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndRemove({ _id: req.params.id });
            res.status(200).json(user);
          } catch(err) {
            res.status(500).send(err);
          }
    }
};
