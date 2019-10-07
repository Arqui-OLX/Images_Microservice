const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const AdImage = require("../models/ads-image")

router.get('/', (req, res, next) => {

    AdImage.find()
    .select('_id ad_id ad_image')
    .exec()
    .then(docs => {
        
        res.status(200).json(docs);

    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/byid/:adId', (req, res, next) => {

    AdImage.find({ad_id: req.params.adId})
    .select('_id ad_image')
    .exec()
    .then(docs => {
        
        if(docs.length > 0) {
            res.status(200).json(docs);
        } else {
            res.status(404).json({message:'no image found'})
        }

    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', upload.single('adImage'),(req, res, next) => {

    console.log(req.file);

    const adImage = new AdImage({
        _id: new mongoose.Types.ObjectId(),
        ad_id: req.body.ad_id,
        ad_image: req.file.path
    });

    adImage.save().then(result => {

        res.status(201).json( {

            message: 'Ad image was created',
            createAdImage: {
                _id: result._id,
                ad_id: result.ad_id,
                ad_image: result.ad_image
            }
        });
    })
    .catch(err =>  {

        res.status(500).json({
            error: err
        })
    });

});

router.get('/:adImageId', (req, res, next) => {

    const id = req.params.adImageId;

    AdImage.findById(id)
    .exec()
    .then(doc => {
        if(doc) {
            res.status(200).json({
                _id: doc._id,
                ad_id: doc.ad_id,
                ad_image: doc.ad_image
            });
        } else {
            res.status(404).json({
                message: 'Ad image not found'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/:adImageId', (req, res, next) => {
    const id = req.params.adImageId;

    AdImage.updateOne({_id: id}, {$set: {
        ad_id: req.body.new_ad_id
    }})
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

router.delete('/:adImageId', (req, res, next) => {

    const id = req.params.adImageId;

    AdImage.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;