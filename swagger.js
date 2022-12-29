
const swaggerAutogen = require('swagger-autogen')
require('dotenv').config();
const doc = {
    swagger:"2.0",
    info:{
        version:"1.0.0",
        title:"ChatGPT APIs",
        description:"Documentation created by <b> digialpha.co</b>"
    },
    host:process.env.SWAGGER_API_BASE_URL,
    basePath:"/",
    schema:['http'],
    consumes:['application/json'],
    produces:['application/json'],
    tags:[
        {
            "name":"Role",
            "description":"Endpoints"
        },
        {
            "name":"Login",
            "description":"Endpoints"
        }
    ],
    securityDefinitions: {
        bearerAuth: {
            type: "apiKey",
            in: "header",      
            scheme: 'bearer',
            name: "Authorization", 
            description: "Bearer token authorization"
        }
    },
    '@definitions': {
        LoginRequest: {
            type: 'object',
            description: "Login request",
            required: ['email', 'password'],
            properties: {
                email: {
                    type: 'string',
                    description: 'User login email',
                    example: "user@example.com"
                },
                password: {
                    type: 'string',
                    description: 'User login password',
                    min: 8,
                    max: 255,
                    example: "password"
                }
            }
        }
    },
    definitions: {
        LoginSuccessResponse: {
            "sucess": true,
            "data": {
                "id": "8aaf5e3a-9d6b-499a-aede-937863af59e4",
                "email": "john@exmaple.com",
                "firstName": "John",
                "lastName": "Doe",
                "userRole": "Role",
                "token": "abcabcabcabcabcabcabcabcabcabcvvvvabcabcabcabcvvvvvvabcabcabcabcabcabcabcabc"
            }
        },LoginValidationError: {
            "_original": {
                "password": "Demo@123"
            },
            "details": [
                {
                    "message": "Email is required",
                    "path": [
                        "email"
                    ],
                    "type": "any.required",
                    "context": {
                        "label": "email",
                        "key": "email"
                    }
                }
            ]
        },
        LoginErrorResponse: {
            "success": false,
            "message": "Credientials does not match our records"
        },
        LoginServerError: {
            success: false,
            message: 'Something went wrong!'
        },
        UnauthorisedResponse: {
            "success": false,
            "message": "Unauthrized"
        },
        BadRequestResponse: {
            success: false,
            message: 'User already exists'
        },
        RoleListRequest:{
            success:true,
            data:[
                {
                    "id":"Xxxxx-xxx",
                    "roleName":"asss-s-d-"
                }

            ],
            "pagination": {
                "page": 1,
                "perPage": 10,
                "totalPages": 1,
                "totalRecords": 8,
                "startRecord": 1,
                "endRecord": 8
            }

            
        },
        UserListRequest:{
            success:true,
            data:[
                {
                    "id": "11-1-xxx",
                    "firstName":"asd",
                    "lastName": "adh",
                    "email": "asdf@gmail.com",
                    "password": "XxXXX",
                    "userRole": "admin",
                    "status": "true",
                    
                }

            ],
            "pagination": {
                "page": 1,
                "perPage": 10,
                "totalPages": 1,
                "totalRecords": 8,
                "startRecord": 1,
                "endRecord": 8
            }

            
        },
        InternalServerError: {
            success: false,
            message: 'Internal server error'
        },

    }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index')           // Your project's root file
})