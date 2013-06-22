(function() {
  var context = this;

  var stream = require('stream');
  var PassThrough = stream.PassThrough;

  function HexTransform(options) {
    PassThrough.call(this, options);
  }
  HexTransform.prototype = Object.create( PassThrough.prototype, {
    constructor: {value: HexTransform}
  });
  HexTransform.prototype._transform = function(chunk, encoding, done) {
    var data = chunk.toString('hex');
    this.push(data);
    done();
  }
  module.exports = HexTransform;

}).call(this);
