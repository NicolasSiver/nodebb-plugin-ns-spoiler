(function (Filters) {
    'use strict';

    var controller = require('./controller');

    Filters.parsePost = function (payload, callback) {
        controller.parsePost(payload, callback);
    };

})(module.exports);