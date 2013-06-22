(function() {
  var context = this;

  var supportedHttpMethods = ['get', 'post', 'put', 'delete'];

  function Router() {
    this.routes = {};
  }
  // create convenience methods for supported http methods
  var self = supportedHttpMethods.reduce(newMethodRedux, {});

  self.add = function(url, method, handler) {
    if( this.routes[url] === void(0) ) {
      this.routes[url] = {};
    }
    this.routes[url][method] = handler;
  }

  self.getHandler = function(url, method) {
    var methods = this.routes[url];
    return methods ? methods[method] : void(0);
  }

  self.routeRequest = function(request, response) {
    var handler = this.getHandler(request.url, request.method) || this.notFound;
    handler(request, response);
  }

  self.notFound = notFound;

  // default 404 handler
  function notFound(request, response) {
    response.statusCode = 404;
    response.write('Error: Not Found');
    response.end();
  }

  function newMethodFunction(method) {
    return function(url, handler) {
      this.add(url, method.toUpperCase(), handler);
    };
  }

  function newMethodRedux(a, method) {
    a[method] = newMethodFunction(method);
    return a;
  }

  Router.prototype = self;

  module.exports = Router;

}).call(this);
