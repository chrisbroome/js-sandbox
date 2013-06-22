(function() {
  var context = this;

  var http = require('http');
  var util = require('util');
  var fs = require('fs');
  var path = require('path');
  var Router = require('./router');

  var contentTypes = {
    'text': 'text/plain',
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'json': 'application/json'
  };

  var router = new Router;

  router.notFound = staticFileProcessor;
  router.get('/', function(request, response) {
    processPath(request, response, './index.html');
  });

  var server = http.createServer(requestListener);

  server.listen(3333);

  function requestListener(request, response) {
    router.routeRequest(request, response);
    responseLogger(request, response);
  }

  function setContentType(request, response, type) {
    response.setHeader('Content-Type', contentTypes[type] || contentTypes.text);
  }

  function responseLogger(request, response) {
    util.log(response.statusCode + ' ' + request.method + ' ' + request.url + ' ');
  }

  function notFound(response) {
    response.statusCode = 404;
    response.write('Error: Not Found');
  }

  function staticFileProcessor(request, response) {
    var fsPath = path.normalize(path.join(__dirname, request.url));
    processPath(request, response, fsPath);
  }

  function processPath(request, response, fsPath) {
    fs.exists(fsPath, function(exists) {
      if( exists ) {
        var ext = path.extname(fsPath).substr(1);
        setContentType(request, response, ext)
        var readStream = fs.createReadStream(fsPath);
        readStream.pipe(response);
      } else {
        notFound(response);
        response.end();
      }
    });
  }

}).call(this);
