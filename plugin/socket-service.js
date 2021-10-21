(function (SocketService) {
    'use strict';
    var async = require('async');
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
        async.waterfall([
            function (next) {
                nodebb.privileges.posts.can('read', payload.postId, next);
            },
            function (canRead, next) {
                if (!canRead) {
                    return next(new Error('[[error:no-privileges]]'))
                }
                controller.getSpoilerContent(Object.assign({}, {uid: socket.uid}, payload), next);
            }
        ], callback);
    };

})(module.exports);
