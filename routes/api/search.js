const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');

// @route GET api/search
// @desc  Query USDA database
// @acce  Public
router.get('/:description', (req, res) => {
    try {
        const options = {
            uri: `https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${config.get(
                'USDAKey'
            )}&generalSearchInput=${
                req.params.description
            }&pageNumber=1&pageSize=25`,
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
            return res.send(body);
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;
