const { getUserById } = require('../controllers/UserController');

// Example middleware to fetch user data
async function fetchUser(req, res, next) {
    await getUserById(req, res, next);
}

module.exports = {
    fetchUser
};
