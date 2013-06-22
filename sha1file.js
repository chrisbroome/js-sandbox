(function() {
  var context = this;

  var crypto = require('crypto');
  var fs = require('fs');
  var HexTransform = require('./transforms/HexTransform');

  var eol = process.argv.indexOf('--eol') >= 0;

  var files = process.argv.slice(2).filter(function(arg) {
    return arg.indexOf('--') < 0;
  });

  // compute the sha1sum for each input file
  files.forEach(sha1sum);

  function sha1sum(filename) {
    var shasum = crypto.createHash('sha1');
    var readStream = fs.createReadStream(filename);
    var hexTransform = new HexTransform({objectMode: true, eol: eol});
    var streams = [readStream, shasum, hexTransform, process.stdout];
    // like calling streams[0].pipe(streams[1]). ... .pipe(streams[n-1])
    streams.reduce(pipeIt);
  }

  function pipeIt(a, x) {
    return a.pipe(x);
  }

}).call(this);
