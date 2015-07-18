var exphbs = require('express-handlebars');
var data = {"stlFile" : 'stl/cube.stl'}

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('viewer', {
    title: 'viewer',
    stlFile: 'stl/cube.stl'
  });
};
