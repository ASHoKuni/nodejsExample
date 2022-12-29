const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const auth = require('../middleware/auth');

router.route('/getUsers').get(auth(),UserController.getUsers);
// router.route('/getRoleById/:id').post(auth(),RoleController.getRoleById);
// router.route('/createRole').post(auth(),RoleController.createRole);
// router.route('/updateRole/:id').put(auth(),RoleController.updateRole);
// router.route('/deleteRole/:id').put(auth(),RoleController.deleteRole);
// router.route('/updateBodyByRole').put(auth(),RoleController.updateBodyrole);


module.exports = router;
