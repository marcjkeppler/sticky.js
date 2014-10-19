(function ($, window, undefined) {

    $.fn.sticky = function (options) {

        if (this.length === 0) {
            return this;
        }

        if (this.length > 1) {
            this.each(function () {
                $(this).sticky(options);
            });

            return this;
        }

        var element = $(this);
        var clone;
        var maxVerticalHeight = 0;
        var defaults = {
            getMaxVerticalHeight: function() {
                return 0;
            },
            minWidth: 0
        };
        var settings = $.extend({}, defaults, options);

        // Functions
        var init, onScroll, onResize, setFixedWidth, updatePosition;

        init = function () {

            // Fixed elements require a width
            // Use a cloned element to help us keep track of width
            clone = element.clone();
            clone.empty();
            clone.removeAttr("id");
            clone.css({
                visibility: "hidden",
                height: 0,
                margin: 0,
                border: 0
            });
            element.before(clone);
            
            // Cache maxVerticalHeight until a resize event fires
            maxVerticalHeight = settings.getMaxVerticalHeight();

            // Attach events
            $(window).scroll(onScroll);
            $(window).resize(onResize);

            updatePosition();
        };

        onScroll = function () {
            updatePosition();
        };

        onResize = function () {
            if ($(window).width() < settings.minWidth) {
                element.css("position", "static");
                element.css("width", "");
            } else {
                // Update cached value
                maxVerticalHeight = settings.getMaxVerticalHeight();
                updatePosition();
            }
        };

        setFixedWidth = function () {
            element.css("width", clone.css("width"));
        };

        updatePosition = function () {
            
            if ($(window).width() < settings.minWidth) {
                return;
            }
            
            var elementHeight = element.height();
            var scrollTop = $(window).scrollTop();
            var initialOffset = clone.offset().top;

            if ($(window).height() > elementHeight && scrollTop - initialOffset > 0) {
                
                setFixedWidth();

                $(element).css({
                    "position": "fixed",
                    "top": "0"
                });

                var currentOffset = element.offset().top;

                if (maxVerticalHeight !== 0) {
                    var top = 0;
                    var limit = maxVerticalHeight - elementHeight + initialOffset;
                    if (limit < currentOffset) {
                        top = limit - currentOffset;
                    }
                    element.css("top", top + "px");
                }

            } else {
                element.css("position", "static");
                element.css("width", "");
            }
        };

        // Public function
        this.update = function() {
            updatePosition();
        };

        init();

        return this;
    };

})(jQuery, window);