
chatmate.views.ListView = (function() {
    
    return function( title, list, emptyListMessage ) {
        
        var that = {};
        
        that.render = function() {
            var menu = mwf.decorator.Menu(title);
            
            if( list.length === 0 ) {
                menu.addMenuLinkItem( emptyListMessage );
                
            } else {
                var menuItem, i = 0;
                for( ; i < list.length; i++ ) { 
                    menuItem = menu.addMenuLinkItem ( list[i].label );
                    if( typeof( list[i].callback ) !== "undefined" ) {
                        TouchEnabledItemModel.bindTouchEvent(menuItem, menuItem, list[i].callback, "menu-highlight");    
                    }   
                }
            }
            
            return menu;
        };
        
        return that;
       
    };
    
}());