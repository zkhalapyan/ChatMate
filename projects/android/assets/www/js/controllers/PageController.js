chatmate.controllers.PageController = (function() {
    
   var that = {};
   
   var pageHistoryStack = [];
   
   var pageCanvas = null;
   
   var getPageCanvas = function() {
       if( pageCanvas === null ) {
           pageCanvas = document.getElementById("page-canvas");
       }
       return pageCanvas;
   };
   
   var displayPage = function( pageModel ) {
       console.log("PageController: Displaying page " + pageModel.getPageTitle());
       var pageView = chatmate.models.PageView( pageModel );
       var canvas = getPageCanvas();
       canvas.innerHTML = "";
       canvas.appendChild( pageView.render() );
   };
   
   that.register = function( pageName, initializer ){
       that[ "open" + pageName ] = initializer;
   };
   
   that.render = function( pageModel ) {
       console.log( "PageController: Adding page model " + pageModel.getPageTitle() + " to history stack." );
       pageHistoryStack.push( pageModel );
       displayPage(pageModel);
   };
   
   that.canGoBack = function() {
       return pageHistoryStack.length > 1;
   };
   
   that.goBack = function() {
       pageHistoryStack.pop();
       console.log("PageController: goBack() invoked.");
       displayPage( pageHistoryStack[pageHistoryStack.length - 1] );
   };
   
   return that;

}());