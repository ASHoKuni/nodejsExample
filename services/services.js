const axios = require('axios');

const getAxio = async (req,res,next) => {
    //  try{
     axios.get('https://api.github.com/users/mapbox').then(response =>{
        //return res.status(200).json({data:data})
        console.log(response.data.created_at)
        return res.status(200).json({response});
     }).catch(error => {
        console.log(error);
        return res.status(500).json({message:error.message});;

        // return res.status(200).json({message:error.message});

     })
     
}
module.exports = {getAxio}