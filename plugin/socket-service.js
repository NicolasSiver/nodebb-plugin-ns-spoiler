/**
 * Created by Nicolas on 10/8/16.
 */
(function (SocketService) {
    'use strict';

    var controller = require('./controller'),
        nodebb     = require('./nodebb');

    var NAMESPACE = 'ns-spoiler',
        sockets   = nodebb.pluginSockets;

    SocketService.init = function (callback) {
        sockets[NAMESPACE] = {};
        //Acknowledgements
        sockets[NAMESPACE].getSpoilerContent = SocketService.getSpoilerContent;

        callback();
    };

    SocketService.getSpoilerContent = function (socket, payload, callback) {
        if (!socket.uid) {
            return callback(new Error('Connection is not authorized.'));
        }

        controller.getSpoilerContent(Object.assign({}, {uid: socket.uid}, payload), callback);
    };

})(module.exports);
