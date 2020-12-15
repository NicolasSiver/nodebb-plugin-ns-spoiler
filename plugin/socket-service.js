(function (SocketService) {
    'use strict';

    var constants  = require('./constants'),
        controller = require('./controller'),
        nodebb     = require('./nodebb');

    var sockets = nodebb.pluginSockets;

    SocketService.init = function (callback) {
        sockets[constants.SOCKET_NAMESPACE] = {};
        //Acknowledgements
        sockets[constants.SOCKET_NAMESPACE].getSpoilerContent = SocketService.getSpoilerContent;

        callback();
    };

    SocketService.getSpoilerContent = function (socket, payload, callback) {        
        controller.getSpoilerContent(Object.assign({}, {uid: socket.uid}, payload), callback);
    };

})(module.exports);
