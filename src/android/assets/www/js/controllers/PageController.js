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
   
   that.register = function( pageName, initializer ){
       that[ "open" + pageName ] = initializer;
   };
   
   that.render = function( pageModel ) {
       
       pageHistoryStack.push( pageModel );
       
       var pageView = chatmate.models.PageView( pageModel );
       
       var canvas = getPageCanvas();
       canvas.innerHTML = "";
       canvas.appendChild( pageView.render() );
   };
   
   that.goBack = function() {
       
   };
   

   return that;

}());