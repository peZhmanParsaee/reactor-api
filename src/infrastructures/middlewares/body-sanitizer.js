const { fixYeKe } = require('../helpers/persian-helper');

module.exports = () => (req, res, next) => {
    if(req.body) {
        for(const prop in req.body) {
            if(req.body[prop] && typeof(req.body[prop]) != 'number') {
                req.body[prop] = req.sanitizeBody(prop).escape().trim();
                req.body[prop] = fixYeKe(req.body[prop]);
            }
        }
    }
    next();
};
