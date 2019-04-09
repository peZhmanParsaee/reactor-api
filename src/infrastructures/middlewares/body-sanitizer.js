module.exports = () => (req, res, next) => {
    if(req.body) {
        for(const prop in req.body) {
            if(req.body[prop] && typeof(req.body[prop]) != 'number') {
                console.log(req.body[prop]);
                req.body[prop] = req.sanitizeBody(prop).escape().trim();
                console.log(req.body[prop]);
            }
        }
    }
    next();
};
