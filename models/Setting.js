const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    gender: {
        type: String,
    },
    age: {
        type: String,
    },
    height: {
        type: String,
    },
    weight: {
        type: String,
    },
});

module.exports = Setting = mongoose.model('setting', SettingSchema);
