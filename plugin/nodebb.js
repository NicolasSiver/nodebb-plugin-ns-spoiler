(function (Module, NodeBB) {
    'use strict';

    Module.exports = {
        adminSockets : NodeBB.require('./src/socket.io/admin').plugins,
        db           : NodeBB.require('./src/database'),
        groups       : NodeBB.require('./src/groups'),
        meta         : NodeBB.require('./src/meta'),
        plugins      : NodeBB.require('./src/plugins'),
        pluginSockets: NodeBB.require('./src/socket.io/plugins'),
        posts        : NodeBB.require('./src/posts'),
        privileges   : NodeBB.require('./src/privileges'),
        serverSockets: NodeBB.require('./src/socket.io').server.sockets,
        settings     : NodeBB.require('./src/settings'),
        socketIndex  : NodeBB.require('./src/socket.io/index'),
        topics       : NodeBB.require('./src/topics'),
        user         : NodeBB.require('./src/user'),

        utils  : NodeBB.require('./public/src/utils'),
        helpers: NodeBB.require('./src/controllers/helpers'),

        /**
         * List is incomplete
         *
         * base_dir: '/path/to/NodeBB',
         * themes_path: '/path/to/NodeBB/node_modules',
         * views_dir: '/path/to/NodeBB/public/templates',
         * version: 'NodeBB Version',
         * url: 'http://localhost:4567',
         * core_templates_path: '/path/to/NodeBB/src/views',
         * base_templates_path: '/path/to/NodeBB/node_modules/nodebb-theme-vanilla/templates',
         * upload_path: '/public/uploads',
         * relative_path: '',
         * port: '4567',
         * upload_url: '/uploads/',
         * theme_templates_path: '/path/to/NodeBB/node_modules/nodebb-theme-lavender/templates',
         * theme_config: '/path/to/NodeBB/node_modules/nodebb-theme-lavender/theme.json',
         * NODE_ENV: 'development'
         */
        nconf   : NodeBB.require('nconf'),
        passport: NodeBB.require('passport'),
        express : NodeBB.require('express')
    };
})(module, require.main);
