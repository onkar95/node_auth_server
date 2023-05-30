const { Router } = require('express');
const { GetAllUsers, DeleteUser, GetSingleUser, register, login, logout, verifyuser, UpdateProfile } = require('../controllers/authControllers');
// const authControllers = require('../controllers/authControllers');

const { isAuthenticatedUser } = require('../middleware/Auth');

const router = Router();


// router.route('/manager/users').get(isAuthenticatedUser, authorizeRoles("manager"), GetAllUsers)
// router.delete('/manager/deleteuser/:id', isAuthenticatedUser, authorizeRoles("manager"), DeleteUser)
// router.get('/manager/getuser/:id', isAuthenticatedUser, authorizeRoles("manager"), GetSingleUser)
// router.put('/manager/updateuser/:id', isAuthenticatedUser, authorizeRoles("manager"), UpdateUser)

router.route("/verifyuser").get(isAuthenticatedUser, verifyuser);
router.get('/Singleuser/:id', isAuthenticatedUser, GetSingleUser)
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router