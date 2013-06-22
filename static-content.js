(function() {
  var context = this;

  var fs = require('fs');
  var path = require('path');

  var contentTypes = {
    'text': 'text/plain',
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'json': 'application/json'
  };

  var util = require('util');

  function StaticContent(options) {
    this.basedir = path.join(path.dirname(), options.basedir || '');
  }
  var proto = {};
  proto.normalize = function(url) {
    return path.normalize(path.join(this.basedir, url));
  }
  proto.routeRequest = function(request, response, fsPath) {
    var self = this;
    var fsPath = fsPath || request.url;
    var normPath = self.normalize(fsPath);
    fs.exists(normPath, function(exists) {
      if( exists ) {
        util.log('Getting File: ' + normPath);
        setContentTypeByPath(request, response, normPath);
        fs.createReadStream(normPath).pipe(response);
      } else {
        self.notFound(request, response);
      }
    });
  };

  // default 404 response
  proto.notFound = notFound;

  function notFound(request, response) {
    response.statusCode = 404;
    response.write('Error: not found');
    response.end();
  }

  function getContentType(url) {
    var ext = path.extname(url).substr(1);
    return contentTypes[ext];
  }

  function setContentType(request, response, type) {
    response.setHeader('Content-Type', type);
  }

  function setContentTypeByPath(request, response, fsPath) {
    var contentType = getContentType(fsPath) || contentTypes.text;
    setContentType(request, response, contentType)
  }

  StaticContent.prototype = proto;

  module.exports = StaticContent;

}).call(this);
