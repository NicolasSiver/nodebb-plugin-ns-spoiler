(function (Controller) {
    'use strict';

    var spoiler = /:{3,}([\s\S]+?):{3,}/g;

    Controller.parsePost = function (payload, callback) {
        callback(null, payload);
    };

})(module.exports);