const router = require('express').Router()
const Note_model=require('../models/Note');
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', ensureGuest ,(req, res) => {
    res.render('login')
  })

router.get("/log",ensureAuth, async(req,res)=>{
   
    const user=await Note_model.find({email_:req.user.email});
    res.render('index',{note:user,userinfo:req.user})
})
module.exports=router;