const mongoose = require('mongoose');

const RDASchema = new mongoose.Schema({
    age: {
        type: Object,
    },
    gender: {
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

module.exports = RDA = mongoose.model('rda', RDASchema);
