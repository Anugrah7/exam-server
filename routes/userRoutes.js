const express = require('express')
const {registerUser,loginUser,listUsers,viewUserDetails} = require('../Controllers/userControl');

const authenticate = require('../Middleware/authMiddleware')


const router = express.Router();

router.post('/register', registerUser); // User registration
router.post('/login', loginUser); // User login
router.get('/', authenticate, listUsers); // List users (secured)
router.get('/:id', authenticate, viewUserDetails); // View user details (secured)

module.exports = router;