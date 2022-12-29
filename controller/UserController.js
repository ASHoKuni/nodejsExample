require("dotenv").config();
const Role = require("../model/role");
const mongoose = require("../Database/database");
const { merge } = require("../routes/role");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const { restart } = require("nodemon");
const User = require("../model/user");



// Get all Users list
const getUsers = async (req, res, next) => {

    /* 
       #swagger.start
       #swagger.tags = ['User']
       #swagger.description = 'Get list User'
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
  let totalUser = await User.countDocuments();
  let page = req.query.page ? parseInt(req.query.page) : 1;
  let perPage = req.query.perpage ? parseInt(req.query.perpage) : 10;
  let offset = 0;

  if (page > 1) {
    offset = page * perPage - perPage;
  }

  let users = await User.find()
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

  if (users.length > 0) {
    pagination = {
      page: page,
      perPage: perPage,
      totalPages: parseInt(Math.ceil(totalUser / perPage)),
      totalRecords: totalUser,
      startRecord: page * perPage - perPage + 1,
      endRecord: totalUser < page * perPage ? totalUser : page * perPage,
    };
    
    /*
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/UserListRequest' }
        }
    */
    return res
      .status(200)
      .json({ success: true, data: users, pagination: pagination });
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


module.exports = { getUsers}
