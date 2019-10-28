const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

let parser = bodyParser.urlencoded({extended: true});
router.post("/",parser,(req, res)=> {
    console.log(`Added text to page: ${req.body.t}`);
});

module.exports = router;