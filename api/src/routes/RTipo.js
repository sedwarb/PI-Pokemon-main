const { Router } = require('express');
const {getType} = require('../Controllers/CTipo')

const router = Router();

router.get('/',getType)

module.exports = router