function CountDownTimer(duration, granularity) {
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
  this.timer=function(){return undefined;};
}

CountDownTimer.prototype.start = function() {
  if (this.running) {
    return;
  }
  this.running = true;
  var start = Date.now(),
      that = this,
      diff, obj;

  this.timer=setInterval(
    function() {
    diff = that.duration - (((Date.now() - start) / 1000) | 0);
    
    if (diff < 0) {
      diff = 0;
      clearInterval(this.timer);
      that.running = false;
    }

    obj = CountDownTimer.parse(diff);
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this, obj.hours, obj.minutes, obj.seconds);
    }, that);
  }, that.granularity);
};

CountDownTimer.prototype.reset = function() {
  clearInterval(this.timer);
  this.running = false;
  this.duration = 0;
};

CountDownTimer.prototype.onTick = function(ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function() {
  return !this.running;
};

CountDownTimer.parse = function(seconds) {
  return {
    'hours': (seconds / 3600) | 0,
    'minutes': ((seconds % 3600) / 60) | 0,
    'seconds': (seconds % 60) | 0
  };
};
