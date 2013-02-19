
chatmate.controllers.PageController = (function () {
    "use strict";
    var that = {};

    var pageHistoryStack = [];

    var pageCanvas = null;

    var logger = chatmate.utils.Logger("PageController");

    var getPageCanvas = function () {
        if (pageCanvas === null) {
            pageCanvas = document.getElementById("page-canvas");
        }
        return pageCanvas;
    };

    var displayPage = function (pageModel) {
        logger.info("Displaying page " + pageModel.getPageTitle() + ".");
        var pageView = chatmate.models.PageView(pageModel);
        var canvas = getPageCanvas();
        canvas.innerHTML = "";
        canvas.appendChild(pageView.render());
    };

    that.register = function (pageName, initializer) {
        that["open" + pageName] = initializer;
    };

    that.render = function (pageModel) {
        logger.info("Adding page model " + pageModel.getPageTitle() + " to history stack.");
        pageHistoryStack.push(pageModel);
        displayPage(pageModel);
    };

    that.canGoBack = function () {
        return pageHistoryStack.length > 1;
    };

    that.goBack = function () {
        pageHistoryStack.pop();
        logger.info("goBack() invoked.");
        displayPage(pageHistoryStack[pageHistoryStack.length - 1]);
    };

    return that;

}());