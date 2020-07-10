const mongoose = require('mongoose');

const DiarySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: true,
    },
    fdcId: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        require: true,
    },
    calories: {
        type: String,
        require: true,
    },
    carb: {
        type: String,
    },
    fat: {
        type: String,
    },
    protein: {
        type: String,
    },
    sugar: {
        type: String,
    },
    fiber: {
        type: String,
    },
    vitaminA: {
        type: String,
    },
    vitaminB6: {
        type: String,
    },
    vitaminB12: {
        type: String,
    },
    vitaminC: {
        type: String,
    },
    vitaminD: {
        type: String,
    },
    vitaminE: {
        type: String,
    },
    vitaminK: {
        type: String,
    },
    Calcium: {
        type: String,
    },
    Iron: {
        type: String,
    },
    Magnesium: {
        type: String,
    },
    Potassium: {
        type: String,
    },
    Sodium: {
        type: String,
    },
    Zinc: {
        type: String,
    },
    Copper: {
        type: String,
    },
    Selenium: {
        type: String,
    },
});

module.exports = Diary = mongoose.model('diary', DiarySchema);
