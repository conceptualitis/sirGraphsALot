(function($){
    $.fn.extend({ 
         
        graph: function(options) {
        
            var defaults = {
                speed: 500,
                liWidth:100,
                spacing:10,
                color:'#1b6de0',
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
                	
	                $('<div>').text(guts[0]).css({ position: 'absolute', top: '100%', left: leftPos + 'px', width: o.liWidth + 'px', textAlign: 'center' }).appendTo(list);
                	
                	$(this).attr('label',guts[0]).attr('total',guts[1]).text(guts[1]).css(
                		{ borderColor: o.color, borderBottomWidth: 0, borderBottomStyle: 'solid', position: 'absolute', bottom: '0', left: leftPos + 'px', width: o.liWidth + 'px', listStyle: 'none', textAlign: 'center' }
                	).animate({ borderBottomWidth: $(this).attr('total')+'px' }, o.speed );
                });
                list.css({ width: listWidth + 'px', height:(biggest+20)+'px', position: 'relative', padding: '0', margin: '0'});
                               
            });
        }
    });
})(jQuery);