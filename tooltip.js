/*
 * Copyright (c) 2011 The Wonderfactory, http://www.thewonderfactory.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @fileOverview File overview goes here.
 * @version 0.1
 * @author Your Name <technology@thewonderfactory.com> 
 */

/**
 * See (http://jquery.com/).
 * @name jQuery
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This documents
 * the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See (http://jquery.com/)
 * @name jQuery.fn
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This documents
 * the function and classes that are added to jQuery by this plug-in.
 * @memberOf jQuery
 */

(function($) {
    var methods = {
        init: function(options) {
            options = $.extend({}, $.fn.toolTips.defaults, options);
			var toolTipWrapper = functions.createToolTipWrapper(options);
						
            return this.each(function() {
                var self = $(this);
								
				self.data('tooltip', {
					title: self.attr('title'),
					isShown: false,
					options: options
				});
				
				self.removeAttr('title');
								
				self.bind({
					mousemove: function(event){
						functions.mouseMove.call(self, event, toolTipWrapper);						
						return false;						
					},
					
					mouseout: function(event){
						functions.hideToolTip.call(self, event, toolTipWrapper);						
						return false;
					}
				});
            });
        }
    };
      
    var functions = {
		createToolTipWrapper: function(options){
			var toolTipWrapper;
			if(options.toolTipWrapper){
				toolTipWrapper = $(options.toolTipWrapper);				
			}else{
				toolTipWrapper = $('<div>').addClass(options.toolTipWrapperClass);
				$(document.body).append(toolTipWrapper);
			}
			return toolTipWrapper;
		},
		
		mouseMove: function(event, toolTipWrapper){
			var self = $(this);			
			var data = self.data('tooltip');
			
			clearTimeout(data.timer);
			data.timer = setTimeout(function() {
				functions.showToolTip.call(self, event, toolTipWrapper);
			}, data.options.toolTipShowDelay);
		},
		
		showToolTip: function(event, toolTipWrapper){			
			var self = $(this);
			var data = self.data('tooltip');
			if(!data.isShown){			
				toolTipWrapper
					.text(data.title)
					.css('top', event.pageY + data.options.toolTipXOffset)
					.css('left', event.pageX + data.options.toolTipXOffset)
					.fadeIn(data.options.toolTipFadeSpeed);
				data.isShown = true;
			}
		},
		
		hideToolTip: function(event, toolTipWrapper){
			var self = $(this);
			var data = self.data('tooltip');			
			toolTipWrapper.fadeOut(data.options.toolTipFadeSpeed);					
			clearTimeout(data.timer);
			data.isShown = false;
		}	
    };
    
    /**
     * <p>This plugin will show a tooltip based on the title attribute of an anchor tag.</p>
     *
     * @example
	 * 	$('.with-wrapper').toolTips({					
	 *		toolTipWrapper: '.my-wrapper'			
	 *	});
     *
     * @param options An optional options object.
     * @param options.toolTipWrapper The selector of the element to hold the tooltip text.
     * @param options.toolTipWrapperClass Class to be applied to style the tooltip.
     * @param options.toolTipShowDelay The time it takes to show the tooltip when mouse is idle.
     * @param options.toolTipFadeSpeed Milliseconds of how fast you want the tooltip to fade in and out.
										or use 'fast' = 600ms and 'slow'=200ms
     * @param options.toolTipXOffset How far to move the tooltip away form the cursor on x-axis.
     * @param options.toolTipYOffset How far to move the tooltip away form the cursor on y-axis.
     *
     */
    jQuery.fn.toolTips = function(method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist');
        }
    };
    
    jQuery.fn.toolTips.defaults = {
		toolTipWrapper: null,
		toolTipWrapperClass: 'tool-tip-wrapper',
		toolTipShowDelay: 750,
		toolTipFadeSpeed: 600,
		toolTipXOffset: 10,
		toolTipYOffset: 20
    };
})(jQuery);