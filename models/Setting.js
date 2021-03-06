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
    activeLevel: {
        type: String,
    },
    calories: {
        type: String,
    },
    fiber: {
        type: String,
    },
    protein: {
        type: Object,
    },
    carb: {
        type: Object,
    },
    fat: {
        type: Object,
    },
    calcium: {
        type: Object,
    },
    iron: {
        type: Object,
    },
    magnesium: {
        type: Object,
    },
    potassium: {
        type: Object,
    },
    sodium: {
        type: Object,
    },
    zinc: {
        type: Object,
    },
    copper: {
        type: Object,
    },
    selenium: {
        type: Object,
    },
    vitaminA: {
        type: Object,
    },
    vitaminE: {
        type: Object,
    },
    vitaminD: {
        type: Object,
    },
    vitaminC: {
        type: Object,
    },
    vitaminB6: {
        type: Object,
    },
    vitaminB12: {
        type: Object,
    },
    vitaminK: {
        type: Object,
    },
});

module.exports = Setting = mongoose.model('setting', SettingSchema);
