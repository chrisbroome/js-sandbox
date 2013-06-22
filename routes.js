(function() {
  var context = this;

  var StaticContent = require('./static-content')
  var Router = require('./router');

  var routes = new Router;
  var statics = new StaticContent({ basedir: 'static' });

  routes.notFound = statics.routeRequest.bind(statics);
  routes.get('/', function(request, response) {
    statics.routeRequest(request, response, './index.html');
  });

  module.exports = routes;

}).call(this);
