var exphbs = require('express-handlebars');
/**
 * GET /
 * Home page.
 */
exports.viewer = function (req, res) {
        var objthingy = req.session.filename
        res.render('viewer', {
            title: 'viewer',
            stlFile: objthingy
        });
};

exports.bidPost = function (req, res) {
      res.redirect('/bids');
}
