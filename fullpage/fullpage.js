/* ==========================================================
 * fullpage.js v20151211
 * ==========================================================
 * Copyright shihua
 * shihuacivis@163.com
 * fullpage全屏滑动效果
 * ========================================================== */
;(function(e) {
  _fpData = {
    count: 0
  };
  var fp = function(opt) {
    this.options = opt || {};
    this.nCurIdx = 0;
    this.TStartX;
    this.TStartY;
    this.nWrapHeight;
    this.nWrapWidth;
    this.sTouchDir;
    this.nMovedWrapPos;
    this.bScrolling;
    this.nStart = 0 || this.options.startpage;
    this.$fpWraper = document.querySelector(this.options.id);
    this.swipeDir = this.options.direction || 'X';
    this.swipeDir = this.swipeDir.toUpperCase();
    this.init().bindEvents();
    (typeof this.nStart != 'undefined') && this.setStartPage(this.nStart);
    _fpData.count++;
  };

  fp.prototype.index = function() {
    return this.nCurIdx;
  }

  fp.prototype.setStartPage = function(idx) {
    var nPageCount = this.$fpWraper.childElementCount;
    idx = 0 || idx;
    idx = nPageCount <= idx ? 0 : idx;
    this.setCurrent(idx);
  };
  fp.prototype.start = function(idx) {
    var $selPage = this.getCurrent();
    $selPage.classList.add('active');
    this.finish();
  };
  fp.prototype.resize = function() {
    this.nWrapWidth = this.$fpWraper.parentNode.clientWidth;
    this.nWrapHeight = this.$fpWraper.parentNode.clientHeight;
    return this;
  };
  fp.prototype.init = function(idx) {
    var self = this;
    this.resize();
    var $firstPage = this.$fpWraper.firstElementChild;
    if (!$firstPage) throw 'ERROR';
    for(var i = 0; i < this.$fpWraper.children.length; i++){
      var $child = this.$fpWraper.children[i];
      var move = 'X' == this.swipeDir ? 'translate3d('+ this.nWrapWidth * i +'px,0,0)' : 'translate3d(0,'+this.nWrapHeight*i+'px,0)';
      $child.style.webkitTransform = move;
      $child.style.transform = move;
    }
    return this;
  };
  fp.prototype.bindEvents = function() {
    var self = this;
    window.addEventListener('resize orientationchange', this.init(this), false);
    window.addEventListener('touchmove', function(e){
      e.preventDefault();
    }, false);
    _fpData.count < 2 && window.addEventListener('mousewheel', this.mousewheel.bind(this), false);
    'touchstart touchmove touchend touchcancel'.split(' ').forEach(function(events) {
      self.$fpWraper.addEventListener(events, self[events].bind(self), false)
    });
    return this;
  };
  fp.prototype.mousewheel = function(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = !1;
    this.bScrolling || (this.bScrolling = !0, (e.wheelDelta>0? this.prev() : this.next()));
  };
  fp.prototype.touchstart = function(e) {
    var oTouch = e.touches[0];
    this.sTouchDir = null;
    this.nMovedWrapPos = 0;
    this.TStartX = oTouch.pageX;
    this.TStartY = oTouch.pageY;
  };
  fp.prototype.touchmove = function(e) {
    var oTouch = e.touches[0];
    var nMoveX = oTouch.pageX - this.TStartX;
    var nMoveY = oTouch.pageY - this.TStartY;
    var nCurWrapX = -this.nCurIdx * this.nWrapWidth + nMoveX;
    var nCurWrapY = -this.nCurIdx * this.nWrapHeight + nMoveY;
    var nDefaultPos = -this.nCurIdx * ('X' == this.swipeDir ? this.nWrapWidth : this.nWrapHeight);
    var $curPage = this.getCurrent();
    var $nextPage = $curPage.nextElementSibling;
    var $prevPage = $curPage.previousElementSibling;
    var $wrap = this.$fpWraper;
    if (!this.sTouchDir) {
      this.sTouchDir = Math.abs(nMoveX) > Math.abs(nMoveY) ? 'X' : 'Y';
      if (this.sTouchDir ===  this.swipeDir) {
        $wrap.classList.add('moving');
      }
    }
    if (this.sTouchDir ===  this.swipeDir) {
      e.preventDefault();
      e.stopPropagation();
      switch  ( this.swipeDir ) {
      case 'X':
        this.nMovedWrapPos = nCurWrapX;
        nCurWrapX > nDefaultPos ? (!$prevPage && (nCurWrapX = nDefaultPos)) : (!$nextPage && (nCurWrapX = nDefaultPos));
        this.setX(nCurWrapX);
        break;
      case 'Y':
        this.nMovedWrapPos = nCurWrapY;
        nCurWrapY > nDefaultPos ? (!$prevPage && (nCurWrapY = nDefaultPos)) : (!$nextPage && (nCurWrapY = nDefaultPos));
        this.setY(nCurWrapY);
        break;
      }
    }
  };
  fp.prototype.touchend = function(e) {
    var nMinMove = 50;
    var nMoveDistant = this.nMovedWrapPos + this.nCurIdx * ('X' == this.swipeDir ? this.nWrapWidth: this.nWrapHeight);
    var $curPage = this.getCurrent();
    var $nextPage = $curPage.nextElementSibling;
    var $prevPage = $curPage.previousElementSibling;
    var $wrap = this.$fpWraper;
    $wrap.classList.remove('moving');
    if (!this.sTouchDir) return;
    e.preventDefault();
    if (nMoveDistant < -nMinMove && $nextPage) return this.next();
    if (nMoveDistant > nMinMove && $prevPage) return this.prev();
    this.reset();
  };
  fp.prototype.touchcancel = function(e) {
    this.$fpWraper.classList.remove('moving');
    this.reset();
  };
  fp.prototype.setX = function(nMove, n) {
    this.$fpWraper.style.webkitTransform = 'translate3d(' + nMove + 'px,0,0)';
    this.$fpWraper.style.transform = 'translate3d(' + nMove + 'px,0,0)';
  };
  fp.prototype.setY = function (nMove, n) {
    this.$fpWraper.style.webkitTransform = 'translate3d(0,' + nMove + 'px,0)';
    this.$fpWraper.style.transform = 'translate3d(0,' + nMove + 'px,0)';
  };
  fp.prototype.getCurrent = function() {
    return this.$fpWraper.children[+this.nCurIdx];
  };
  fp.prototype.setCurrent = function(idx) {
    this.nCurIdx = idx ? idx  : this.nCurIdx;
    var nDefaultPos = -this.nCurIdx * ('X' == this.swipeDir ? this.nWrapWidth: this.nWrapHeight);
    'X' == this.swipeDir ? this.setX(nDefaultPos) : this.setY(nDefaultPos);
  };
  fp.prototype.reset = function() {
    this.setCurrent();
  };
  fp.prototype.next = function() {
    this.go(+this.nCurIdx + 1);
  };
  fp.prototype.prev = function() {
    this.go(+this.nCurIdx - 1);
  };

  fp.prototype.go = function(nAimPage) {
    var $curPage = this.getCurrent();
    var nPageCount = this.$fpWraper.childElementCount;
    var $aimPage = this.$fpWraper.children[nAimPage];
    if (nAimPage === this.nCurIdx || nAimPage < 0 || nAimPage >= nPageCount) {
      this.bScrolling = false;
      return;
    }
    this.nCurIdx = +nAimPage;
    this.setCurrent(+nAimPage);
    this.finish($curPage, $aimPage);
  };
  fp.prototype.finish = function($curPage, $aimPage) {
    var self = this;
    self.sTouchDir = null;
    var callback = this.options.callback;
    setTimeout(function() {
      $curPage && $curPage.classList.remove('active');
      $aimPage && $aimPage.classList.add('active');
      self.bScrolling = false;
    }, 300);
    if (callback && typeof callback === 'function') callback.call(this, this.nCurIdx);
  };
  window.fullpage = fp;
})(this);