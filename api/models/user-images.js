const mongoose = require('mongoose');

const userImageSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    user_id: {type: String, required: true, unique: true}
});

module.exports = mongoose.model('UserImage', userImageSchema);