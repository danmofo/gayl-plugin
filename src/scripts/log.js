var showLogging = require('./config').logging;

/**
 * Taken from http://stackoverflow.com/questions/9521921/why-does-console-log-apply-throw-an-illegal-invocation-error
 *
 * Ideally I'd like to replace this with console.log.apply(console, arguments).
 *
 */
/* jshint evil: true */
function consoleLogger() {
    var i = -1, l = arguments.length, args = [], fn = 'console.log(args)';
    while(++i<l){
        args.push('args['+i+']');
    }
    fn = new Function('args',fn.replace(/args/,args.join(',')));
    fn(arguments);
}

module.exports = showLogging ? consoleLogger : function() {};
