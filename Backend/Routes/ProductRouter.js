const  ensureAuthenticated  = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    console.log('-------logged in user deetails-------', req.user);
    res.status(200).json([
        {
            message: 'mobile',
            price: 1500,
        },
        {
            message: 'laptop',
            price: 2500,
        },


    ]);
});

module.exports = router;