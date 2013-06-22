(function() {
  var context = this;

  var crypto = require('crypto');
  var fs = require('fs');
  var util = require('util');
  var stream = require('stream');
  var Transform = stream.Transform;
  var HexTransform = require('./transforms/HexTransform');

  var filename = process.argv[2];
  var shasum = crypto.createHash('sha1');
  var readStream = fs.createReadStream(filename);

  var hexTransform = new HexTransform({objectMode: true});
  var newLineTransform = new stream.PassThrough({objectMode: true});
  newLineTransform._flush = function() {
    this.push('\n');
  }

  var streams = [readStream, shasum, hexTransform, newLineTransform, process.stdout];

  // like calling streams[0].pipe(streams[1]). ... .pipe(streams[n-1])
  streams.reduce(pipeIt);

  function pipeIt(a, x) {
    return a.pipe(x);
  }

}).call(this);
