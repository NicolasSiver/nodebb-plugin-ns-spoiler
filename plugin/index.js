(function (Plugin) {
    'use strict';

    var filters       = require('./filters'),
        socketService = require('./socket-service');

    //NodeBB list of Hooks: https://github.com/NodeBB/NodeBB/wiki/Hooks
    Plugin.hooks = {
        filters: filters,
        statics: {
            appLoad: function (params, callback) {
                var router      = params.router,
                    middleware  = params.middleware,
                    controllers = params.controllers,
                    app         = params.app;

                socketService.init(callback);
            }
        }
    };

})(module.exports);
