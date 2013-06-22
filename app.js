(function() {
  var context = this;

  var http = require('http');
  var util = require('util');
  var fs = require('fs');
  var path = require('path');

  var routes = require('./routes');

  var server = http.createServer(requestListener);

  server.listen(3333);

  function requestListener(request, response) {
    routes.routeRequest(request, response);
    responseLogger(request, response);
  }

  function responseLogger(request, response) {
    util.log(response.statusCode + ' ' + request.method + ' ' + request.url + ' ');
  }

}).call(this);
