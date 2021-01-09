const express = require('express')
const Router = express.Router()
const Athletes = require('../models/Athletes')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req,file,cb){
        cb( null, file.originalname)
    }
})

const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(null,false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter})

const { check, validationResult } = require('express-validator')

Router.get('/', async (req, res) => {
    try {
        const athletes = await Athletes.find().sort({ date: -1})
        res.send(athletes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error', error)
    }
})

Router.post('/image/:id', upload.single('image'), async (req,res) => {
    try {
        const uploadImage = await Athletes.findByIdAndUpdate(req.params.id, 
            {
                profileImage: req.file.path
            },
            {
                new: true
            }
        )
        res.send(uploadImage)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error',error)
    }
})

Router.post('/',[
    check('email', 'Please include a valid email').isEmail(),
    check('name', 'Name is required').not().isEmpty(),
    check('dob', 'Date of Birth is required').not().isEmpty(),
], async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send(errors.array())
    }
    try {
        const { name, email, dob, team, gender, about, interests, sports, location } = req.body
        const newAthlete = new Athletes({
            name,
            email,
            dob,
            team,
            gender,
            about,
            interests,
            sports,
            location
        })
        
        const athlete =  await newAthlete.save()

        res.send(athlete)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error',error)
    }
})

Router.put('/:id', [
    check('email', 'Please include a valid email').isEmail(),
    check('name', 'Name is required').not().isEmpty(),
    check('dob', 'Date of Birth is required').not().isEmpty(),
], async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send(errors.array())
    }
    try {
        const athlete = await Athletes.findByIdAndUpdate(req.params.id, 
            {
                $set: req.body
            }, {
                new: true
            }
        )

        res.send(athlete)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error', error)
    }
})


module.exports = Router
