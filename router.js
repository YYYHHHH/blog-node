var express = require('express');
var router = express.Router();
router.get('/',function (req,res,next) {
    res.send('/')
});
router.get('/add',function (req,res,next) {
    res.send('/add')
});
module.exports = router;