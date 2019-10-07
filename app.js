const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userImagesRoutes = require('./api/routes/user-images');
const adImagesRoutes = require('./api/routes/ads-images')

mongoose.connect('mongodb+srv://jpgironb:' + process.env.MONGO_ATLAS_PW + '@olx-images-hkdiq.mongodb.net/olx-images?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true    
});

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if(req.method ==='OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

app.use('/user-images', userImagesRoutes);
app.use('/ads-images', adImagesRoutes);

app.use((req, res, next) => {

    const error = new Error('Invalid route');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {

    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;