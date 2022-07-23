const jwt = require('jsonwebtoken')

const User = require('../model/userschema')

const authenticate = async (req,res,next)=>{
   try {
    const token = req.cookies.jwtoken

    const verfyToken = jwt.verify(token, process.env.SECRET_KEY)
    const rootUser = await User.findOne({_id: verfyToken._id, "tokens.token":token})

    if(!rootUser) { throw new Error ('user not found')}

    req.token = token
    req.rootUser = rootUser
    req.userId = rootUser._id

    next()
   } catch (error) {
      res.status(401).send('unauthorised:no token provided')
      console.log(error)
   }
    
}

module.exports = authenticate