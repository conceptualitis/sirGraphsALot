(function($){
    $.fn.extend({
         
        graph: function(options) {
        
	        function hexColor(){
	    		var hex = '';
	 			var possibles = '0123456789ABCDEF';
	 			for( var i=0; i < 6; i++ ) {
			        hex += possibles.charAt(Math.floor(Math.random() * possibles.length));
			    }
			    return '#' + hex;
	    	}
            
            var defaults = {
                speed: 500,
                liWidth:100,
                spacing:10,
            }
                 
            var options =  $.extend(defaults, options);
 
            return this.each(function() {
            	var o = options;
                var list = $(this);
                var lis = $('li',list);
                var listWidth = lis.length * o.liWidth + lis.length * o.spacing;
                var biggest = 0;
                
                lis.each(function(index){
                	var guts = $(this).text().split(": ");
                	var leftPos = index * o.liWidth + index * o.spacing;
                	if ( biggest < guts[1] ){
                		biggest = guts[1] - 0;
                	}
                	
	                $('<div>').text(guts[0]).css({
	                	position: 'absolute',
	                	top: '100%',
	                	left: leftPos + 'px',
	                	width: o.liWidth + 'px',
	                	textAlign: 'center'
	                }).appendTo(list);
                	
                	$(this).data('label',guts[0]).data('total',guts[1]).text(guts[1]).css({
                		borderColor: function(){
                				if (undefined === o.color) return hexColor();
                				else if ( Array === o.color.constructor ) return o.color[index];
                				else return o.color;
                			},
                		borderBottomWidth: 0,
                		borderBottomStyle: 'solid',
                		position: 'absolute',
                		bottom: '0',
                		left: leftPos + 'px', 
                		width: o.liWidth + 'px', 
                		listStyle: 'none',
                		textAlign: 'center'
                	}).animate({ borderBottomWidth: guts[1]+'px' }, o.speed );
                });
                
                list.css({ width: listWidth + 'px', height:(biggest+20)+'px', position: 'relative', padding: '0'});
                               
            });
        }
    });
})(jQuery);