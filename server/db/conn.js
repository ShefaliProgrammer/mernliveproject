
// const mongoose = require("mongoose")

// const DB = process.env.DATABSE

//  mongoose.connect(DB , { useNewUrlParser: true })

//  .then(()=>{
//     console.log('connection successful')
    
//   }).catch(()=>{
//      console.log("not connected")
     
//   })

const mongoose = require('mongoose');

const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })

const DB = process.env.DATABSE;

mongoose.connect(DB).then(() => {
    console.log(`connnection successful`);
}).catch((err) => console.log(`no connection ${err}`));

   