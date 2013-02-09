
chatmate.models.PageView = (function() {
    return function( pageModel ){
        var that = {};
        that.render = function() {
            document.getElementById("header-title").innerHTML = pageModel.getPageTitle();
            mwf.decorator.TopButton( pageModel.getTopButtonLabel() , null, pageModel.getTopButtonCallback(), true );
            var headerLink = document.getElementById("header-link");
            TouchEnabledItemModel.bindTouchEvent(headerLink, headerLink, chatmate.controllers.PageController.openHomePage);
            return pageModel.getContent();
        };        
        return that;
    };
}());