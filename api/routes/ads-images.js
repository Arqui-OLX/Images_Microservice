const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const AdImage = require("../models/ads-image")

router.get('/', (req, res, next) => {

    AdImage.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {

    const adImage = new AdImage({
        _id: new mongoose.Types.ObjectId(),
        ad_id: req.body.ad_id
    });

    adImage.save().then(result => {

        console.log(result);
        res.status(201).json( {

            message: 'Ad image was created',
            createAdImage: adImage
        });
    })
    .catch(err =>  {
        console.log(err);
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
        console.log(doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: 'Ad image not found'
            });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/:adImageId', (req, res, next) => {
    const id = req.params.adImageId;

    AdImage.update({_id: id}, {$set: {
        ad_id: req.body.new_ad_id
    }})
    .exec()
    .then(result => {
        console.log(res);
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
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