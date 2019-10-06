const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

    res.status(200).json( {

        message: 'Handling GET request to /user-images'
    });
});


router.post('/', (req, res, next) => {

    res.status(200).json( {

        message: 'Handling POST request to /user-images'
    });
});

router.get('/:userImageId', (req, res, next) => {

    const id = req.params.userImageId;

    res.status(200).json({

        message: 'Product obtained!'
    });

});

router.patch('/:userImageId', (req, res, next) => {

    res.status(200).json({

        message: 'Updated product!'
    });
});

router.delete('/:userImageId', (req, res, next) => {

    res.status(200).json({

        message: 'deleted product!'
    });
});



module.exports = router;