const express = require("express")

const bcrypt =  require('bcryptjs')
require('../db/conn');
const User = require("../model/userschema")
 const authenticate = require('../middleware/authenticate')
 const router = express.Router()

router.get('/', (req, res)=>{
   res.send(" hello from auth js")
})

router.post('/register', async (req, res)=>{
   

  const { name, email, phone, work, password, cpassword } = req.body

  if(!name || !email || !phone || !work || !password || !cpassword){
    return res.status(422).json({error:"fill data properly"})
}

    try {
      
    
    const  userData = await User.findOne({email})

        if(userData){
                return res.status(422).json({error:"email already exit"})
        }else if(password != cpassword){
          return res.status(422).json({error:"email already exit"})
        }else{
          const user = new User({ name,email,phone,work, password,cpassword})

          const userresister = await user.save();
          if(userresister){
             return res.status(201).json({messgae:"siccessful resistration"})
          }
        }
        
    } catch (err) {
        console.log(err)}

})

// login route 

router.post('/signin', async (req, res) => {
  try {
      let token;
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({error:"Plz Filled the data"})
      }

      const userLogin = await User.findOne({ email: email });

      // console.log(userLogin);

      if (userLogin) {
          const isMatch = await bcrypt.compare(password, userLogin.password);

         

      if (!isMatch) {
          res.status(400).json({ error: "Invalid Credientials " });
      } else {
           // need to genereate the token and stored cookie after the password match 
          token = await userLogin.generateAuthToken();
          console.log(token);

          res.cookie("jwtoken", token, {
              expires: new Date(Date.now() + 25892000000),
              httpOnly:true
          });
          
          res.json({ message: "user Signin Successfully" });
      }
      } else {
           res.status(400).json({ error: "Invalid Credientials " });
      }

  } catch (err) {
      console.log(err);
  }
});



router.get('/about', authenticate, (req, res)=>{
  res.send(req.rootUser)
})

router.get('/getdata', authenticate, (req, res)=>{
  res.send(req.rootUser)
})

router.post('/contact', authenticate, async (req, res)=>{
  try {
    const {name, email, phone, message} = req.body

    if(!name || !email|| !phone|| !message){
      console.log('error in contact from')
       return res.json({error:"please fill the contact from"})
    }

    const userContact = await User.findOne({_id:req.userId})

    if(userContact){
        const unserMessages = await userContact.addMessages(name, email, phone, message)

        await userContact.save()

        res.status(201).json({message: "user contact successfully"})
    }


  } catch (error) {
    console.log(error)
  }
})

router.get('/logout', authenticate, (req, res)=>{
  res.clearCookie('jwtoken' , {path:'/'})
  res.status(200).send('logout user')
})

module.exports = router

