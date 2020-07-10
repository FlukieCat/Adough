const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const moment = require('moment');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const infoParser = require('../../utils/infoParser');
const Diary = require('../../models/Diary');

// @route GET api/diary
// @desc  Query USDA database
// @acce  Public
router.get('/:fdcId', (req, res) => {
    try {
        const options = {
            uri: `https://api.nal.usda.gov/fdc/v1/food/${
                req.params.fdcId
            }?api_key=${config.get('USDAKey')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' },
        };
        request(options, (error, response, body) => {
            if (error) console.error(error);
            if (response.statusCode !== 200) {
                return res
                    .status(404)
                    .json({ msg: 'No item found in the dababase' });
            }
            return res.json(infoParser(JSON.parse(body)));
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

// @route POST api/diary
// @desc  Create/update diary
// @acce  Private
router.post(
    '/:fdcId',
    [auth, [check('quantity', 'How much did you have?').isNumeric()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const options = {
                uri: `https://api.nal.usda.gov/fdc/v1/food/${
                    req.params.fdcId
                }?api_key=${config.get('USDAKey')}`,
                method: 'GET',
                headers: { 'user-agent': 'node.js' },
            };
            request(options, async (error, response, body) => {
                if (error) console.error(error);
                if (response.statusCode !== 200) {
                    return res
                        .status(404)
                        .json({ msg: 'No item found in the dababase' });
                }
                let diaryFields = infoParser(JSON.parse(body));
                const { quantity, date } = req.body;
                diaryFields.user = req.user.id;

                diaryFields.date = moment(date, 'YYYY-MM-DD');
                diaryFields.quantity = quantity;
                let diary = await Diary.findOne({
                    user: req.user.id,
                    date: { $eq: diaryFields.date },
                    fdcId: diaryFields.fdcId,
                });
                if (diary) {
                    diary = await Diary.findByIdAndUpdate(
                        diary.id,
                        { $set: diaryFields },
                        { new: true }
                    );
                    return res.json(diary);
                }
                diary = new Diary(diaryFields);
                await diary.save();
                return res.json(diary);
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route POST api/diary
// @desc  Create/update diary without login
// @acce  Public
router.post(
    '/guest/:fdcId',
    [check('quantity', 'How much did you have?').isNumeric()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const options = {
                uri: `https://api.nal.usda.gov/fdc/v1/food/${
                    req.params.fdcId
                }?api_key=${config.get('USDAKey')}`,
                method: 'GET',
                headers: { 'user-agent': 'node.js' },
            };
            request(options, async (error, response, body) => {
                if (error) console.error(error);
                if (response.statusCode !== 200) {
                    return res
                        .status(404)
                        .json({ msg: 'No item found in the dababase' });
                }
                let diaryFields = infoParser(JSON.parse(body));
                const { quantity } = req.body;
                diaryFields.date = moment(moment.now(), 'YYYY-MM-DD');
                diaryFields.quantity = quantity;
                return res.json(diaryFields);
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route DELETE api/diary
// @desc  Delete diary
// @acce  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        await Diary.findByIdAndRemove(req.params.id);
        return res.json({ msg: 'Item deleted' });
    } catch (err) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/diary
// @desc  Get diary on a certain date
// @acce  Private
router.get('/date/:date', auth, async (req, res) => {
    try {
        const diary = await Diary.find({
            date: { $eq: moment(req.params.date, 'YYYY-MM-DD') },
        });
        return res.json(diary);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
