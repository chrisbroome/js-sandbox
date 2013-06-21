(function() {
  var context = this;

  var http = require('http');
  var util = require('util');

  var contentTypes = {
    'html': 'text/html',
    'json': 'application/json',
    'text': 'text/plain'
  };

  var router = {
    '/': function(request, response) {
      setContentType('html', response);
      response.write('<h1>Hi!</h1>');
    }
  };


  var server = http.createServer(requestListener);

  server.listen(3333);

  function requestListener(request, response) {
    var handler = router[request.url];
    logger(request);
    if( handler ) {
      handler(request, response);
    }
    else {
      response.statusCode = 404;
      response.write('Error: Not Found');
    }
    response.end();
  }

  function setContentType(type, response) {
    response.setHeader('Content-Type', contentTypes[type] || contentTypes.text);
  }

  function logger(request) {
    util.log(request.method + ' ' + request.url);
  }

}).call(this);
