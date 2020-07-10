const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Setting = require('../../models/Setting');

// @route GET api/setting
// @desc  Get current user's setting
// @acce  Private
router.get('/', auth, async (req, res) => {
    try {
        const setting = await Setting.findOne({
            user: req.user.id,
        }).populate('user', ['name']);
        if (!setting) {
            return res.status(400).json({ msg: 'No setting found' });
        }
        return res.json(setting);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
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
            check('height', 'Please enter a valid height').isNumeric(),
            check('weight', 'Please enter a valid weight').isNumeric(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { gender, age, height, weight } = req.body;

            const newSetting = {};
            newSetting.user = req.user.id;
            if (gender) newSetting.gender = gender;
            if (age) newSetting.age = age;
            if (height) newSetting.height = height;
            if (weight) newSetting.weight = weight;

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
