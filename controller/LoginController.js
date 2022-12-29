require("dotenv").config();
const User = require("../model/user");
const mongoose = require("../Database/database");
// const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const tokenKey = process.env.TOKEN_KEY;
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const JWT = require("jsonwebtoken");
const Role = require("../model/role");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  /* 
    #swagger.start
    #swagger.tags = ['Login']
    #swagger.description = 'User login'
    #security: [ { bearerAuth: [] } ],
    #swagger.parameters['object'] = {
        in: 'body',
        description: 'User login request',
        schema: { $ref: '#/definitions/LoginRequest'}
    }  
    */

  // console.log(req)
  try {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Email is invalid",
      }),
      password: Joi.string().min(3).max(255).required().messages({
        "any.required": "Password is required",
        "string.min": "Password minimum length is 3 characters",
        "string.max": "Password maximum length is 255 characters",
      }),
    });

    const validateResult = schema.validate(req.body);

    if (validateResult.error) {
        /*
        #swagger.responses[422] = {
            schema: { $ref: '#/definitions/LoginValidationError' }
        }
        */
      return res.status(422).json({ message: validateResult.error });
    }

    const user = await User.findOne({
      email: req.body.email.toLowerCase(),
    }).exec();
    const role = await Role.findOne({ roleName: user.userRole }).exec();

    if (!user) {
        /*
        #swagger.responses[401] = {
            schema: { $ref: '#/definitions/LoginErrorResponse' }
        }
        */
      return res.status(401).json({ message: "User does not exists!" });
    }
    // if (!role) {
    //   return res.status(401).json({ message: "Role not match" });
    // }

    // bcrypt.compare(req.body.password,user.passowrd,(err,match) => {
    //     if(match){
    //         //generated token

    //         return res.status(200).send({success: true,data:user, message:"login"});
    //     }
    //     else{
    //         return res.status(405).json({message:"Password is not match"});
    //     }
    // });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      //generated token
      const token = JWT.sign(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userRole: user.userRole,
          status: user.status,
        },
        tokenKey,
        { expiresIn: "1h" }
      );

      const data = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userRole: user.userRole,
        status: user.status,
        token: token,
      };
        /*
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/LoginSuccessResponse' }
        }
        */
      return res
        .status(200)
        .send({ success: true, data: data, message: "User login" });
    } else {
        /*
        #swagger.responses[401] = {
            schema: { $ref: '#/definitions/LoginErrorResponse' }
        }
        */
      return res.status(401).json({ message: "Password is not match" });
    }
  } catch (error) {
        /*
        #swagger.responses[500] = {
        schema: { $ref: '#/definitions/LoginServerError' }
        }
        */
    return res.status(500).send({ message: error.message });
  }
};


module.exports = { login };
