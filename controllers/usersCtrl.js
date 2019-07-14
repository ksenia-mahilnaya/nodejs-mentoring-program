const mockDataUsers = require('../data/MOCK_DATA_USERS');

module.exports = {
    getAllUsers: (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(mockDataUsers));
    }
};