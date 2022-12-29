require("dotenv").config();
const Role = require("../model/role");
const mongoose = require("../Database/database");
const { merge } = require("../routes/role");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const { restart } = require("nodemon");

// Get all Role list
const getRoles = async (req, res, next) => {

    /* 
       #swagger.start
       #swagger.tags = ['Role']
       #swagger.description = 'Get list of role api'
       #swagger.security = [{ 'bearerAuth' : [] } ]
       #swagger.parameters['page'] = {
        in: 'query',
        description: 'Page number to be fetched',
        example: 1,
        default: 1
    }  

     #swagger.parameters['perpage'] = {
        in: 'query',
        description: 'Results per page',
        example: 10,
        default: 10
    } 
    */
    
try{
  let totalRole = await Role.countDocuments();

  let page = req.query.page ? parseInt(req.query.page) : 1;
  let perPage = req.query.perpage ? parseInt(req.query.perpage) : 10;
  let offset = 0;

  if (page > 1) {
    offset = page * perPage - perPage;
  }

  let roles = await Role.find({ roleName: { $ne: "SuperAdmin" } })
    .select({
      _id: 0,
      __v: 0,
    })
    .skip(offset)
    .limit(perPage)
    .sort({ id: -1 })
    .exec();

  var pagination = {
    page: page,
    perPage: perPage,
    totalPages: 0,
    totalRecords: 0,
    startRecord: 0,
    endRecord: 0,
  };

  if (roles.length > 0) {
    pagination = {
      page: page,
      perPage: perPage,
      totalPages: parseInt(Math.ceil(totalRole / perPage)),
      totalRecords: totalRole,
      startRecord: page * perPage - perPage + 1,
      endRecord: totalRole < page * perPage ? totalRole : page * perPage,
    };
    
    /*
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/RoleListRequest' }
        }
    */
    return res
      .status(200)
      .json({ success: true, data: roles, pagination: pagination });
  }
  return res
      .status(200)
      .json({ success: true, data: null, pagination: pagination });
}catch(error){

    /*
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/InternalServerError' }
        }
    */

    return res.status(500).send({success:false,message:error.messages})
}
};

// get role by id

const getRoleById = async (req, res, next) => {

    /* 
       #swagger.start
       #swagger.tags = ['Role']
       #swagger.description = 'Get list of role api'
       #swagger.security = [{ 'bearerAuth' : [] } ]
       

    */
  try {
    const data = await Role.find({ id: req.params.id });
    if (data) {
      return res.status(200).send(data);
    } else {
       
      /*
        #swagger.responses[401] = {
            schema: { $ref: '#/definitions/UnauthorisedResponse' }
        }
    */

      return res.status(401).json({ message: "Record is not found " });
    }
  } catch (error) {
    /*
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/InternalServerError' }
        }
    */
    return res.status(500).json({ message: error.message });
  }
};

// Create Role api
const createRole = async (req, res, next) => {
    /* #swagger.start
       #swagger.tags = ['Role']

    /*
    #swagger.description = 'Create new role api'
    #swagger.security = [{ 'bearerAuth' : [] } ]

    #swagger.parameters['object'] = {
        in: 'body',
        description: 'Create new role request',
        schema: { $ref: '#/definitions/CreateRoleRequest'}
    }  
    */

  // Joi validation on request body
  const schema = Joi.object({
    roleName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z ]*$"))
      .messages({
        "any.required": "Role name is required",
        "string.min": "Role minimum lenght is 3 characters",
        "string.max": "Role maximum lenght is 30 characters",
        "string.pattern.base": "Role name is invalid",
      }),
  });
  const validateschema = schema.validate(req.body);

  if (validateschema.error) {
    return res
      .status(400)
      .send({ success: false, message: validateschema.error });
  }

  //option i is for case insensitive
  let roles = await Role.find({
    roleName: { $regex: new RegExp(req.body.roleName, "i") },
  }).exec();

  if (roles.length > 0) {
    /*
        #swagger.responses[401] = {
            schema: { $ref: '#/definitions/UnauthorisedResponse' }
        }
    */

    return res
      .status(401)
      .send({ sucess: false, message: "Role already exists" });
  }

  try {
    let data = await Role.create({
      id: uuidv4(),
      roleName: req.body.roleName,
    });
    // const dataSave = data.save();
    return res.status(200).json({ sucess: false, message: "Role created successfully" ,data:data});
  } catch (error) {
    /*
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/InternalServerError' }
        }
    */
    return res.status(500).send({ success: false, message: error.message });
  }
};

const updateRole = async (req, res, next) => {

    /* 
       #swagger.start
       #swagger.tags = ['Role']
       #swagger.description = 'Get list of role api'
       #swagger.security = [{ 'bearerAuth' : [] } ]
       
       

    */
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const schema = Joi.object({
    roleName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z ]*$"))
      .messages({
        "any.required": "Role name is required",
        "string.min": "Role minimum length is 3 characters",
        "string.max": "Role maximum length is 30 characters",
        "string.pattern.base": "Role name is invalid",
      }),
  });
  const validateschema = schema.validate(req.body);

  if (validateschema.error) {
    return res
      .status(401)
      .send({ success: false, message: validateschema.error });
  }

  try {
    let roles = await Role.findOneAndUpdate(
      { id: req.params.id },
      { $set: { roleName: req.body.roleName } }
    );
    return res
      .status(200)
      .send({ success: true, message: "Role update successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//delete Role api
const deleteRole = async (req, res, next) => {

        /* 
       #swagger.start
       #swagger.tags = ['Role']
       #swagger.description = 'Get list of role api'
       #swagger.security = [{ 'bearerAuth' : [] } ]
       

    */
  try {
    // console.log(req.params.id,271)
    let roles = await Role.findOneAndDelete({ id: req.params.id });
    return res
      .status(200)
      .send({ success: true, message: "Role delete successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// update role using get id from body

const updateBodyrole = async (req, res, next) => {

    /* 
       #swagger.start
       #swagger.tags = ['Role']
       #swagger.description = 'Get list of role api'
       #swagger.security = [{ 'bearerAuth' : [] } ]
       

    */
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const schema = Joi.object({
    id: Joi.string().required().messages({ "any.required": "Id is required" }),
    roleName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z ]*$"))
      .messages({
        "any.required": "Role name is required",
        "string.min": "Role minimum lenght is 3 characters",
        "string.max": "Role maximum lenght is 30 characters",
        "string.pattern.base": "Role name is invalid",
      }),
  });
  const validateschema = schema.validate(req.body);

  if (validateschema.error) {
    return res
      .status(401)
      .send({ success: false, message: validateschema.error });
  }

  try {
    console.log(req.body.id, 179);
    let roles = await Role.findOneAndUpdate(
      { id: req.body.id },
      { $set: { roleName: req.body.roleName } }
    );
    return res
      .status(200)
      .send({ success: true, message: "Role update sucessfuly" });
  } catch (error) {
    /*
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/InternalServerError' }
        }
    */
    return res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  updateBodyrole,
  getRoleById,
};
