const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check jwt exist & valid
    if (token) {

    }
    else {
        res.redirect('/login');
    }
}