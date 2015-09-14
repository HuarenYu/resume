;(function(window) {
    var util = {
        select: function(selector) {
            return document.querySelector(selector);
        },
        selectAll: function(selector) {
            return document.querySelectorAll();
        },
        addClass: function(elem, value){
            var rspaces = /\s+/;
            var classNames = (value || "").split( rspaces );
            var className = " " + elem.className + " ",
            setClass = elem.className;
            for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
                if ( className.indexOf( " " + classNames[c] + " " ) < 0 ) {
                    setClass += " " + classNames[c];
                }
            }
            elem.className = setClass.replace(/^\s+|\s+$/g,'');
        },
        removeClass: function(elem, value) {
            var rspaces = /\s+/;
            var rclass = /[\n\t]/g
            var classNames = (value || "").split( rspaces );
            var className = (" " + elem.className + " ").replace(rclass, " ");
            for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
                className = className.replace(" " + classNames[c] + " ", " ");
            }
            elem.className = className.replace(/^\s+|\s+$/g,'');
        }
    };
    window.util = util;
})(window);

;(function (window) {

    function Slide(options) {
        this.options = options;
        this.el =  util.select(options.el);
        this.items = this.el.querySelectorAll('.slide-item');
        this.index = 0;
        this.length = this.items.length;
        this.slideInClass = 'animated slideInLeft';
        this.slideOutClass = 'animated zoomOut';
        util.addClass(this.items[0], 'active ' + this.slideInClass);
        this._listen();
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
        this.el.querySelector('.slide-trigger')
        .addEventListener('click', function(e) {
            that.next();
        });
    };

    Slide.prototype.next = function() {
        var lastIndex = this.index;
        var currentIndex = ++this.index;
        util.removeClass(this.items[lastIndex], this.slideInClass);
        util.addClass(this.items[lastIndex], this.slideOutClass);
        if (currentIndex === this.length) {
            this.index = 0;
            currentIndex = 0;
        }
        util.addClass(this.items[currentIndex], 'active ' + this.slideInClass);
        var that = this;
        var t = setTimeout(function() {
            util.removeClass(that.items[lastIndex], 'active ' + that.slideOutClass);
        }, 1000);
    };

    Slide.prototype.prev = function() {
        var lastIndex = this.index;
        var currentIndex = --this.index;
        util.removeClass(this.items[lastIndex], this.slideInClass);
        util.addClass(this.items[lastIndex], this.slideOutClass);
        if (currentIndex === -1) {
            this.index = this.length - 1;
            currentIndex = this.length - 1;
        }
        util.addClass(this.items[currentIndex], 'active ' + this.slideInClass);
        var that = this;
        var t = setTimeout(function() {
            util.removeClass(that.items[lastIndex], 'active ' + that.slideOutClass);
        }, 1000);
    };

    window.Slide = Slide;

})(window);
