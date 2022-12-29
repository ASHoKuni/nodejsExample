const express = require('express');
const router = express.Router();
const RoleController = require('../controller/RoleController');
const auth = require('../middleware/auth');

router.route('/getRoles').get(auth(),RoleController.getRoles);
router.route('/getRoleById/:id').post(auth(),RoleController.getRoleById);
router.route('/createRole').post(auth(),RoleController.createRole);
router.route('/updateRole/:id').put(auth(),RoleController.updateRole);
router.route('/deleteRole/:id').put(auth(),RoleController.deleteRole);
router.route('/updateBodyByRole').put(auth(),RoleController.updateBodyrole);


module.exports = router;