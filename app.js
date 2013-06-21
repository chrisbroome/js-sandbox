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

  function setContentType(type, response) {
    response.setHeader('Content-Type', contentTypes[type] || contentTypes.text);
  }

  function logger(request) {
    console.log(util.inspect(request, {colors: true}));
  }

  var server = http.createServer(function requestListener(request, response) {
    var handler = router[request.url];
    logger(request);
    if( handler ) {
      handler(request, response);
    }
    else {
      response.write('Error: Not Found');
      response.statusCode = 404;
    }
    response.end();
  });

  server.listen(3333);

}).call(this);
