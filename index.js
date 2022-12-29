require('dotenv').config();
const express = require('express');
const database = require('./Database/database');
const helmet = require("helmet"); // for HTTP header security

// routes
const roleRoute = require('./routes/role');
const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');
const emailRoute = require('./routes/email');
//seeders
const seedRoles = require('./seeders/roleSeeder')
const userSeeder = require('./seeders/userSeeder')

//routes
const servicesRoute = require('./routes/services')
// model
const Role = require('./model/role')
const User = require('./model/user')

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json')

const handlebars = require('express-handlebars').engine;


const cors = require('cors');


var whitelist = ['localhost:3000','*']
var corsOption = {
  origin:whitelist,
}

const app = express();
const port = 4000;
const hostname = '127.0.0.1';




// console.log(seedRoles)
//const seedDB = async () => {
// // Seed the role data

// let roles = await Role.find({
//   roleName:seedRoles.roleName }).exec();

// console.log(roles);
// if (roles.length > 0) {
//   console.log('k')
// }else{
//   await Role.insertMany(seedRoles);
// }
  //await Role.deleteMany({});
  
// Seed the User data
 // await User.deleteMany({});
  //await User.insertMany(userSeeder);
//}

// seedDB().then(()=>{
// mongoose.connection.close();
// mongoose.connect(mongoString,{
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// }).catch(error => handleError(error));
// })

app.use(helmet())
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',loginRoute)
app.use('/api',roleRoute);
app.use('/api',userRoute);
app.use('/api',emailRoute);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerFile));
app.use('/api',servicesRoute);




// set handlebars

//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', handlebars({
layoutsDir: __dirname + '/views/layouts',
extname:'hbs',
defaultLayout:'planB',
partialsDir:__dirname+'/views/partials'
}));


var data = {
  name : "John Doe",
  age : 34,
  occupation : "Sr.Software Developer",
  hobbies:['Programming','music','travel']

}


app.get('/emailTemplate',(req,res)=>{
  res.render('main',{layout:'index',data:data
});
})

app.get('/get',(req,res)=>{
  res.status(200).json({ status:true,message:"sdf"});
})

app.use(express.static('public'));




// app.listen(port,hostname,() =>{
// })
if (process.env.NODE_ENV !== 'test') {
  app.listen(port,hostname,() => {
  })
}

module.exports = app;