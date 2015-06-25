var tinyEE = function() {
  if (!(this instanceof tinyEE))
    return new tinyEE();
  this.events = [];
};

tinyEE.prototype.addListener = function(id, cb, once) {
  if (!id || !cb)
    return console.error('tiny-ee: name and callback must not be null');
  if ('function' !== typeof cb)
    return console.error('tiny-ee: callback must be of type function');

  this.events.push({
    id   : id,
    cb   : cb,
    once : !!once
  });
};

tinyEE.prototype.listeners = function(id) {
  var ret = [];
  for (var i = 0; i < this.events.length; ++i) {
    if (this.events[i]
        && this.events[i].id === id)
      ret.push({
        id : this.events[i].id,
        cb : this.events[i].cb
      });
  }
  return ret;
};

tinyEE.prototype.removeListener = function(id, cb) {
  for (var i = 0; i < this.events.length; ++i) {
    if (this.events[i]
        && this.events[i].id === id
        && this.events[i].cb === cb)
      this.events.splice(i--, 1);
  }
};

tinyEE.prototype.removeAllListeners = function(id) {
  for (var i = 0; i < this.events.length; ++i) {
    if (this.events[i]
        && this.events[i].id === id)
      this.events.splice(i--, 1);
  }
};

tinyEE.prototype.on = function(id, cb) {
  this.addListener(id, cb, false);
};

tinyEE.prototype.once = function(id, cb) {
  this.addListener(id, cb, true);
};

tinyEE.prototype.emit = function() {
  var self = this;
  var args = arguments;
  var id   = args[0];

  delete args['0'];
  args = Object.keys(args).map(function(k) {return args[k]});

  for (var i = 0; i < self.events.length; ++i) {
    if (self.events[i]
        && self.events[i].id === id) {
      (function (i) {
        process.nextTick(function() {
          self.events[i].cb.apply(null, args);
          if (self.events[i].once)
            self.events.splice(i--, 1);
        });
      })(i);
    }
  }
};

module.exports = tinyEE;
