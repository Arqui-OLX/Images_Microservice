const express = require('express');
const app = express();

const userImagesRoutes = require('./api/routes/user-images');
const adImagesRoutes = require('./api/routes/ads-images')

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