/*!
 * Tiny document.cookies library 1.1
 * 
 * Copyright 2011, Rafał Kukawski
 * Licensed under the terms of MIT license
 * http://kukawski.pl/mit-license.txt
 */

;(function(){
    function parse(ret){
        var cookies = {};
        (document.cookie + ';').replace(/([\w%]+)=?([^;]*);/g, function (ignore, name, value){
            cookies[name] = value;
        });
        
        if(ret) {
            return cookies;
        }
        document.cookies = cookies;
    }
    
    function parseAndReturn () {
        return parse(true);
    }
    
    if(document.__defineGetter__) {
        document.__defineGetter__('cookies', parseAndReturn);
    } else if(Object.defineProperty) {
        Object.defineProperty(document, 'cookies', {
            get: parseAndReturn, // IE8
            getter: parseAndReturn // IE8 beta
        });
    } else if (/*@cc_on @if (@_jscript)!@end @*/false) {
        parse();
        document.attachEvent('onpropertychange', function (e) {
            if(window.event && window.event.propertyName === 'cookie') {
                parse();
            }
        });
    }
})();