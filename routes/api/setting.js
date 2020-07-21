const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Setting = require('../../models/Setting');
const caloriesCal = require('../../utils/caloriesCal');
const RDA = require('../../models/RDA');

// @route GET api/setting
// @desc  Get current user's setting
// @acce  Private
router.get('/', auth, async (req, res) => {
    try {
        const setting = await Setting.findOne({
            user: req.user.id,
        }).populate('user', ['name']);
        if (!setting) {
            return res.json({});
        }
        return res.json(setting);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Authentication Error');
    }
});

// @route POST api/setting
// @desc  Create/update setting
// @acce  Private
router.post(
    '/',
    [
        auth,
        [
            check('age', 'Please enter a valid age').isNumeric(),
            check(
                'gender',
                'Gender is required to calculate your nutritional needs'
            )
                .not()
                .isEmpty(),
            check('height', 'Please enter a valid height').isNumeric(),
            check('weight', 'Please enter a valid weight').isNumeric(),
            check('activeLevel', 'Please select your active level')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { gender, age, height, weight, activeLevel } = req.body;

            const newSetting = {};
            newSetting.user = req.user.id;
            if (gender) newSetting.gender = gender;
            if (age) newSetting.age = age;
            if (height) newSetting.height = height;
            if (weight) newSetting.weight = weight;
            if (activeLevel) newSetting.activeLevel = activeLevel;

            newSetting.calories = caloriesCal(
                gender,
                age,
                height,
                weight,
                activeLevel
            );

            const rda = await RDA.findOne({
                gender: gender,
                'age.min': { $lt: parseInt(age) },
                'age.max': { $gt: parseInt(age) },
            });

            newSetting.protein = rda.protein;
            newSetting.carb = rda.carb;
            newSetting.fat = rda.fat;
            newSetting.fiber = Math.round((newSetting.calories / 1000) * 14);
            newSetting.calcium = rda.calcium;
            newSetting.iron = rda.iron;
            newSetting.magnesium = rda.magnesium;
            newSetting.potassium = rda.potassium;
            newSetting.sodium = rda.sodium;
            newSetting.zinc = rda.zinc;
            newSetting.copper = rda.copper;
            newSetting.selenium = rda.selenium;
            newSetting.vitaminA = rda.vitaminA;
            newSetting.vitaminE = rda.vitaminE;
            newSetting.vitaminD = rda.vitaminD;
            newSetting.vitaminC = rda.vitaminC;
            newSetting.vitaminB6 = rda.vitaminB6;
            newSetting.vitaminB12 = rda.vitaminB12;
            newSetting.vitaminK = rda.vitaminK;

            let setting = await Setting.findOne({
                user: req.user.id,
            });

            if (setting) {
                setting = await Setting.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: newSetting },
                    { new: true }
                );
                return res.json(setting);
            }

            setting = new Setting(newSetting);
            await setting.save();
            return res.json(setting);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
