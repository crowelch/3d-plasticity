var exphbs = require('express-handlebars');

/**
 * GET /
 * Home page.
 */
exports.viewer = function (req, res) {
        res.render('viewer', {
            title: 'viewer',
            stlFile: req.session.filename,
        });
};
