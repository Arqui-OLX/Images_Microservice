const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

    res.status(200).json( {

        message: 'Handling GET request to /user-images'
    });
});


router.post('/', (req, res, next) => {

    const userImage = {
        id: req.body.id
    };

    res.status(200).json( {

        message: 'Handling POST request to /user-images',
        createdUseimage: userImage
    });
});

router.get('/:userImageId', (req, res, next) => {

    const id = req.params.userImageId;

    res.status(200).json({

        message: 'User Image  obtained!'
    });

});

router.patch('/:userImageId', (req, res, next) => {

    res.status(200).json({

        message: 'User Image updates!'
    });
});

router.delete('/:userImageId', (req, res, next) => {

    res.status(200).json({

        message: 'deleted User Image!'
    });
});



module.exports = router;