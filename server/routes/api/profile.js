const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/profiles');
const User = require('../../models/user');
const validate = require('../../validation/profile');
const validateProfileInput = validate.validateProfileInput;
const validateExperianceInput = validate.validateExperianceInput;
const validateEducationInput = validate.validateEducationInput;


router.get('/handle/:handle',()=>{
    const errors = {};

    Profile.findOne({handle:req.params.handle})
    .populate('user','name')
    .then(profile=>{
        if(!profile){
            error.noprofile = 'there exists no profile';
            return res.status(404).json(errors);
        }
        res.json(profile)        
    })
    .catch(err=>res.status(404).json(err))
})

router.get('/user/:user_id',()=>{
    const errors = {};

    Profile.findOne({user:req.params.id})
    .populate('user','name')
    .then(profile=>{
        if(!profile){
            error.noprofile = 'there exists no profile';
            return res.status(404).json(errors);
        }
        res.json(profile)        
    })
    .catch(err=>res.status(404).json({profile:'there is no profile for this user'}))
})

router.get('/all',()=>{
    const errors = {};

    Profile.find()
    .populate('user','name')
    .then(profile=>{
        if(!profile){
            error.noprofile = 'there are no profiles';
            return res.status(404).json(errors);
        }
        res.json(profile)        
    })
    .catch(err=>res.status(404).json(err))
})

router.get('/', passport.authenticate('jwt',{sessions:false}),(req,res)=>{
    const {errors,isValid} = validateProfileInput(req.body);

    if(!isValid){
        return res.status.json(errors);
    }

    Profile.findOne({user:req.user.id})
    .populate('userId','name')
    .then(profile =>{
        if(!profile){
            error.noprofile = 'there exists no profile';
            return res.status(404).json(errors);
    }
    else{
        return res.send(profile);
    }

    })
    .catch(err=> res.status(404).json(err));
});
 router.post('/experiance', passport.authenticate('jwt',{sessions:false}),(req,res)=>{
    const {errors,isValid} = validateProfileInput(req.body);

    if(!isValid){
        return res.status.json(errors);
    }

     Profile.findOne({user:req.user.id})
     .then(profile=>{
     const newExp = {
      title:req.body.title,
      company:req.body.company,
      location:req.body.location,
      from:req.body.from,
      to: req.body.to,
      current:req.body.current,
      description:req.body.description
     }

     profile.experiance.unshift(newExp);
     profile.save().then(profile =>res.json(profile));
    })
 });

 router.put('/education', passport.authenticate('jwt',{sessions:false}), (req, res) => {
    const {errors,isValid} = validateEductaionInput(req.body);

    if(!isValid){
        return res.status.json(errors);
    }

      Profile.findOne({ user: req.user.id })
      .then(profile=>
        {
            const newEdu = {
                school:req.body.school,
                degree:req.body.degree,
                fieldofstudy:req.body.fieldofstudy,
                from:req.body.from,
                to:req.body.to,
                current:req.body.current,
                description:req.body.description,
            };
        profile.education.unshift(newEdu);
  
        profile.save().then(profile=>res.json(profile));
    })
    }
  );

  router.delete('/experience/:exp_id', passport.authenticate('jwt',{sessions:false}) ,(req, res) => {
      Profile.findOne({ user: req.user.id }).then(profile=>{
      const removeindex = profile.experience.map(exp => exp._id).indexOf(req.params.exp_id);
      if (removeIndex === -1) {
        return res.status(500).json({ msg: "Server error" });
      } else {
        profile.experience.splice(removeIndex, 1);
        profile.save().then(profile=> {res.json(profile) });
       
      }})
    .catch(err=>{
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
);
});
router.delete('/education/:edu_id', passport.authenticate('jwt',{sessions:false}) ,(req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile=>{
    const removeindex = profile.education.map(exp => exp._id).indexOf(req.params.edu_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: "Server error" });
    } else {
      profile.education.splice(removeIndex, 1);
      profile.save().then(profile=> {res.json(profile)});
    }})
  .catch(err=>{
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
);
});

router.delete('/', passport.authenticate('jwt',{sessions:false}) ,(req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(profile=>{
   User.findOneAndRemove({_id:req.user.id}).then(()=>res.json({success:true}))
    })
  .catch(err=>{
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
);
});

router.post('/', passport.authenticate('jwt',{sessions:false}),(req,res)=>{
    const {errors,isValid}=validateProfileInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
   const profileFields ={};
   profileFileds.user = req.user.id;
   if(req.body.handle) profileFields.handle = req.body.handle;
   if(req.body.company) profileFields.company = req.body.company;
   if(req.body.website) profileFields.website = req.body.website;
   if(req.body.bio) profileFieldybody.bio = req.body.bio;
   if(req.body.location) profileFieldybody.location = req.body.location;
   if(req.body.githubusername) profileFieldybody.githubusername = req.body.githubusername;
   if(typeof req.body.skills !=='undefined'){
       profileFields.skills = req.body.skills.split(',');
   }
   profileFields.social = {};
   if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
   if(req.body.twitter) profileFields.sociaybody.twitter = req.body.youtube;
   if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
   if(req.body.linkdin) profileFields.social.ylinkdin= req.body.linkdin;
   if(req.body.instagram) profileFields.social.yinstagram= req.body.instagram;

   profile.findOne({user:req.user.id})
   .then(profile=>
    {
        if(profile){
            Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true}).then(profile=>res.json(profile))
        }
        else{
        Profile.findOne({handle:profileFields.handle}).then(profile=>{
            if(profile){
                errors.handle='this handle already exists';
                res.status(400).json(errors);
               
                }
                    new Profile(profileFields).save().then(profile=>res.json(profile));            
        }
            );
        }
    })
   
});
module.exports = router;