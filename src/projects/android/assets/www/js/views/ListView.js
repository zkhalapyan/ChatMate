
chatmate.views.ListView = (function() {
    
    return function( title, list, emptyListMessage ) {
        
        var that = {};
        
        var menu = null;
        
        var isEmptyList = false;
        
        that.addItem = function( label, callback ) {
            if( menu !== null ) {
                if( isEmptyList ) {
                    menu.removeMenuItemAt( 0 );
                    isEmptyList = false;
                }
                var menuItem = menu.addMenuLinkItem ( label );
                if( typeof( callback ) !== "undefined" ) {
                    TouchEnabledItemModel.bindTouchEvent(menuItem, menuItem, callback, "menu-highlight");    
                }   
            }
        };
        
        that.render = function() {
            menu = mwf.decorator.Menu( title );
            
            if( list.length === 0 ) {
                menu.addMenuLinkItem( emptyListMessage );
                isEmptyList = true;
                
            } else {
                for( var i = 0; i < list.length; i++ ) { 
                    that.addItem( list[i].label, list[i].callback );
                }
            }
            
            return menu;
        };
        
        return that;
       
    };
    
}());