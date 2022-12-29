require('dotenv').config();
const mongoString = process.env.DATABASE_URL
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);


  mongoose.connect(mongoString,{
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }).then(()=>{
      // console.log('mongoose started');
    }).catch(err =>{
      // console.log('mongoose starting error' ,err);
      process.exit(1);
    });
  

 


