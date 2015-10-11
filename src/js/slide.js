;(function (window) {

    function Slide(options) {
        this.options = options;
        this.el =  util.select(options.el);
        this.items = this.el.querySelectorAll('.slide-item');
        this.index = 0;
        this.length = this.items.length;
        this.slideInClass = 'animated slideInLeft';
        this.zoomOutClass = 'animated zoomOut';
        this.slideOutClass = 'animated slideOutLeft';
        this.zoomInClass = 'animated zoomIn';
        util.addClass(this.items[0], 'active ' + this.slideInClass);
        this._listen();
        this.isAnimating = false;
    }

    Slide.prototype._listen = function() {
        var that = this;
        window.addEventListener('keydown', function(e) {
            if (e.keyCode === 39 || e.keyCode === 40) {
                that.next();
                e.preventDefault();
            }
            if (e.keyCode === 38 || e.keyCode === 37) {
                that.prev();
                e.preventDefault();
            }
        }, false);
        this
        .el
        .querySelector('.slide-trigger-right')
        .addEventListener('click', function(e) {
            that.next();
        });
        this
        .el
        .querySelector('.slide-trigger-left')
        .addEventListener('click', function(e) {
            that.prev();
        });
    };

    Slide.prototype._clearAnimateStyle = function(el) {
        util.removeClass(el, this.slideInClass);
        util.removeClass(el, this.slideOutClass);
        util.removeClass(el, this.zoomOutClass);
        util.removeClass(el, this.zoomInClass);
    };

    Slide.prototype.next = function() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        var lastIndex = this.index;
        var currentIndex = ++this.index;
        this._clearAnimateStyle(this.items[lastIndex]);
        util.addClass(this.items[lastIndex], this.zoomOutClass);
        if (currentIndex === this.length) {
            this.index = 0;
            currentIndex = 0;
        }
        util.addClass(this.items[currentIndex], 'active ' + this.slideInClass);
        var that = this;
        setTimeout(function() {
            that._clearAnimateStyle(that.items[lastIndex]);
            util.removeClass(that.items[lastIndex], 'active');
            that.isAnimating = false;
        }, 1000);
    };

    Slide.prototype.prev = function() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        var lastIndex = this.index;
        var currentIndex = --this.index;
        this._clearAnimateStyle(this.items[lastIndex]);
        util.addClass(this.items[lastIndex], this.slideOutClass);
        if (currentIndex === -1) {
            this.index = this.length - 1;
            currentIndex = this.length - 1;
        }
        util.addClass(this.items[currentIndex], 'active ' + this.zoomInClass);
        var that = this;
        setTimeout(function() {
            that._clearAnimateStyle(that.items[lastIndex]);
            util.removeClass(that.items[lastIndex], 'active');
            that.isAnimating = false;
        }, 1000);
    };

    window.Slide = Slide;

})(window);
