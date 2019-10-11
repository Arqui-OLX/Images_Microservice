const mongoose = require('mongoose');

const adImageSchema = mongoose.Schema({

    ad_id: {type: String, required: true},
    ad_image: {type: String, required: true}
});

module.exports = mongoose.model('AdImage', adImageSchema);