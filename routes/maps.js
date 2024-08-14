const express = require('express');
const router = express.Router();

router.get('/introMap1', (req, res) => {
    res.render('introductionMap1')
})

module.exports = router;