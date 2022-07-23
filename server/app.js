

 const dotenv = require("dotenv")


 const express = require("express")

 const bodyParser = require("body-parser");
 
 const app = express()
 dotenv.config({ path: "./config.env" })
 require("./db/conn")


 
 app.use(
   bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
 

 const PORT = process.env.PORT 


 

app.use(require("./router/auth.js"))
app.use(express.json())





 app.get('/',(req, res)=>{
    res.send("this is home page")
 })



 app.get('/contact',(req, res)=>{
    res.send("this is contact page")
 })

 app.get('/signin',(req, res)=>{
    res.send("this is signin page")
 })

 app.get('/signup',(req, res)=>{
    res.send("this is signup page")
 })

 
 app.listen(PORT, ()=>{
    console.log(`connection port is: ${PORT}`)
 })