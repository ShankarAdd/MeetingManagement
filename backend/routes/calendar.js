const express = require('express');

const router = express.Router();

const calController = require('../controller/calendar')

router.get('/get-cal',calController.getCal)

router.post('/post-cal',calController.postCal);

router.delete('/delete-cal/:id',calController.deleteCal)

module.exports = router;