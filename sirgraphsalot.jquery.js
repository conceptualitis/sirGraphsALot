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
                var listWidth = lis.length * o.liWidth + lis.length * o.spacing + o.spacing;
                var biggest = 0;
                
                lis.each(function(index){
                	var guts = $(this).text().split(": ");
                	var leftPos = index * o.liWidth + index * o.spacing + o.spacing;
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
                		zIndex: '100',
                		bottom: '0',
                		left: leftPos + 'px', 
                		width: o.liWidth + 'px', 
                		listStyle: 'none',
                		textAlign: 'center'
                	}).animate({ borderBottomWidth: guts[1]+'px' }, o.speed );
                });
                
                if ( undefined !== o.scale && undefined !== o.interval ) {
                	var lines = '';
                	for(var i = 0; i <= o.scale; i+=o.interval){
                		lines += '<span style="background:#ccc;position:absolute;z-index:10;display:block;width:100%;height:1px;top:'+ i +'px;"></span>';
                		lines += '<span style="display:block;width:50px;padding-right:5px;position:absolute;z-index:10;bottom:'+ (i - 7) +'px;right:100%;font-size:10px;text-align:right;color:#ccc;">'+ i +'</span>';
                	}
                	list.append(lines);
                	list.css({
                		width: listWidth + 'px',
                		height:o.scale+'px', 
                		position: 'relative', 
                		padding: '0', 
                		borderLeft: '1px solid #ccc',
                	});
                }
                else {
	                list.css({ width: listWidth + 'px', height:(biggest+20)+'px', position: 'relative', padding: '0'});
	            }
                               
            });
        }
    });
})(jQuery);