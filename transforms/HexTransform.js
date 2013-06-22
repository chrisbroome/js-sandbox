(function() {
  var context = this;

  var os = require('os');
  var stream = require('stream');
  var PassThrough = stream.PassThrough;

  function HexTransform(options) {
    PassThrough.call(this, options);
    this._eol = options.eol;
  }
  HexTransform.prototype = Object.create( PassThrough.prototype, {
    constructor: {value: HexTransform}
  });
  HexTransform.prototype._transform = function(chunk, encoding, done) {
    var data = chunk.toString('hex');
    this.push(data);
    done();
  }
  HexTransform.prototype._flush = function() {
    if( this._eol ) {
      this.push(os.EOL);
    }
  }
  module.exports = HexTransform;

}).call(this);
