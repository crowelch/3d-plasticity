var exphbs = require('express-handlebars');

/**
 * GET /
 * Home page.
 */
exports.viewer = function (req, res) {
    console.log(req);
    res.render('viewer', {
        title: 'viewer',
        stlFile: req.session.filename
});
};
