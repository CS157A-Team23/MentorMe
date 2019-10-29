const _ = require('lodash');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/User');
const express = require('express');
const router = express.Router();
const tokenGen = require('../modules/authtoken');

/**
 * Login a User:
 * POST Request.
 *  req.body=
 *  {    
 *      "email": [STRING],
 *      "password": [STRING]
 *  }
 * Response.
 * JsonWebToken in header as x-auth-token
 * res.body = 
 * {    
 *      "id": [NUMBER], 
 *      "firstname": [STRING], 
 *      "lastname": [STRING],
 *      "email": [STRING]
 * }
 */
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({where: {email: req.body.email}});
    if (!user) return res.status(400).send('Invalid email or password');
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');
    const token = await tokenGen.generateAuthToken(user);
    res.header('x-auth-token', token).send(_.pick(user, ['id','first_name','last_name', 'email']));
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(req);
}

module.exports = router;