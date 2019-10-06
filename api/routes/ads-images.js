const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

    res.status(200).json( {

        message: 'Ads images were fetched'
    });
});

router.post('/', (req, res, next) => {

    res.status(201).json( {

        message: 'Ad images was created'
    });
});

router.get('/:userImageId', (req, res, next) => {

    res.status(201).json( {

        message: 'ad image details',
        id: req.params.userImageId
    });
});

router.delete('/:userImageId', (req, res, next) => {

    res.status(201).json( {

        message: 'ad image deleted!',
        id: req.params.userImageId
    });
});

module.exports = router;