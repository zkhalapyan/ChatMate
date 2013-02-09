/**
 * @constructor TouchEnabledModel
 * @author Zorayr Khalapyan
 * @version 8/9/2012
 */
var TouchEnabledItemModel = (function () {
    "use strict";
    var that = {};

    var TOUCH_MOVE_SENSITIVITY = 15;

    that.bindClickEvents = function (item, highlightItem, onClickCallback, onMouseoverHighlightClass) {
        if (typeof (onClickCallback) === "function") {
            $(item).mouseover(function () {
                $(highlightItem).addClass(onMouseoverHighlightClass);
            }).mouseout(function () {
                $(highlightItem).removeClass(onMouseoverHighlightClass);
            }).click(onClickCallback);
        }
    };

    that.bindTouchEvents = function (item, highlightItem, onTouchCallback, onTouchHighlightClass) {

        that.bindClickEvents(item, function (e) {
            e.preventDefault();
            return false;
        });

        var moveCounter;

        $(item).bind("touchstart", function (e) {
            moveCounter = 0;
            $(highlightItem).addClass(onTouchHighlightClass);
        });

        $(item).bind("touchmove", function (e) {
            if ($(highlightItem).is("." + onTouchHighlightClass)) {
                moveCounter += 1;
                var item = e.srcElement;
                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                var elm = $(item).offset();
                var x = touch.pageX - elm.left;
                var y = touch.pageY - elm.top;
                if (moveCounter > TOUCH_MOVE_SENSITIVITY || !((x < $(item).width() && x > 0) && (y < $(item).height() && y > 0))) {
                    $(highlightItem).removeClass(onTouchHighlightClass);
                }
            }
        });

        $(item).bind("touchend", function (e) {
            e.preventDefault();
            if (moveCounter <= TOUCH_MOVE_SENSITIVITY && $(highlightItem).is("." + onTouchHighlightClass)) {
                $(highlightItem).removeClass(onTouchHighlightClass);
                if (typeof (onTouchCallback) === "function") {
                    onTouchCallback(e);
                }
            }
        });
    };

    that.bindTouchEvent = function (item, highlightItem, onTouchCallback, highlightClass) {
        highlightItem = highlightItem || item;
        highlightClass = highlightClass || "pressed";
        if (DeviceDetection.isOnDevice()) {
            that.bindTouchEvents(item, highlightItem, onTouchCallback, highlightClass);
        } else {
            that.bindClickEvents(item, highlightItem, onTouchCallback, highlightClass);
        }
    };

    return that;
}());
