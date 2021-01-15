const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check jwt exist & valid
    if (token) {
        jwt.verify(token, 'net ninja secret', (err, decodedToken) => {

        });
    }
    else {
        res.redirect('/login');
    }
}