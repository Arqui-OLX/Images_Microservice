const mongoose = require('mongoose');

const userImageSchema = mongoose.Schema({

    user_id: {type: String, required: true, unique: true},
    user_image: {type: String, required: true}
});

module.exports = mongoose.model('UserImage', userImageSchema);