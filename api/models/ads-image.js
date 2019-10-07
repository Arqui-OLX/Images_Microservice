const mongoose = require('mongoose');

const adImageSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    ad_id: String
});

module.exports = mongoose.model('AdImage', adImageSchema);