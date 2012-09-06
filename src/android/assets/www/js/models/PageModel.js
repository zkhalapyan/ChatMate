
chatmate.models.PageModel = (function(){
    
    return function( pageTitle, pageParams ){
        
        var that = {};
        
        var pageContent;
        
        var topButtonCallback;
        
        var topButtonLabel;
        
        that.setPageContent = function( newPageContent ) {
            pageContent = newPageContent;
        };
        
        that.getContent = function() {
            return pageContent;
        };
        
        that.setPageTitle = function( newPageTitle ) {
            pageTitle = newPageTitle;
        };
        
        that.getPageTitle = function() {
            return pageTitle;
        };
        
        
        that.setPageParams = function ( newPageParams ) {
            pageParams = newPageParams;
        };
        
        that.getPageParams = function() {
            return pageParams;
        };
        
        
        that.setTopButton = function( newTopButtonLabel, newTopButtonCallback ) {
            topButtonLabel    = newTopButtonLabel;
            topButtonCallback = newTopButtonCallback;
        };
        
        that.getTopButtonLabel = function() {
            return topButtonLabel;
        };
        
        that.getTopButtonCallback = function() {
            return topButtonCallback;
        };
        
        return that;
    };
}());