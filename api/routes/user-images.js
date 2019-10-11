const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

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

const UserImage = require('../models/user-image');

router.get('/', (req, res, next) => {

    UserImage.find()
    .select("_id user_id user_image")
    .exec()
    .then(docs => {

        res.status(200).json(docs)
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
    
});

router.get('/byid/:userId', (req, res, next) => {

    UserImage.find({user_id: req.params.userId})
    .select('_id user_image')
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


router.post('/', upload.single('userImage'),(req, res, next) => {

    const userImage = new UserImage({
        user_id: req.body.user_id,
        user_image: req.file.path
    });


    userImage.save().then(result => {

        res.status(201).json( {
            message: "User image was created",
            _id: result._id,
            user_id: result.user_id,
            user_image: result.user_image
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })

});

router.get('/:userImageId', (req, res, next) => {

    const id = req.params.userImageId;

    UserImage.findById(id)
    .exec()
    .then(doc => {
        if(doc) {
            res.status(200).json({
                _id: doc._id,
                user_id: doc.user_id,
                user_image: doc.user_image
            });
        } else {
            res.status(404).json({
                message: 'User image not found'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

});


router.patch('/:userImageId', upload.single('userImage'), (req, res, next) => {
    const id = req.params.userImageId;

    UserImage.findById(id)
    .exec()
    .then(doc => {
        fs.unlink(doc.user_image, (err) => {
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

    UserImage.updateOne({_id: id}, {$set: {
        user_image: req.file.path
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

router.delete('/:userImageId', (req, res, next) => {

    const id = req.params.userImageId;

    UserImage.findById(id)
    .exec()
    .then(doc => {
        fs.unlink(doc.user_image, (err) => {
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

    UserImage.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

});


module.exports = router;