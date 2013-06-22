(function() {
  var context = this;

  var os = require('os');
  var stream = require('stream');
  var PassThrough = stream.PassThrough;

  function HexTransform(options) {
    PassThrough.call(this, options);
    this._eol = options.eol;
  }
  var self = Object.create( PassThrough.prototype, {
    constructor: {value: HexTransform}
  });
  self._transform = function(chunk, encoding, done) {
    var data = chunk.toString('hex');
    this.push(data);
    done();
  }
  self._flush = function() {
    if( this._eol ) {
      this.push(os.EOL);
    }
  }

  HexTransform.prototype = self;

  module.exports = HexTransform;

}).call(this);
