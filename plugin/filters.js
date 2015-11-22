(function (Filters) {
    'use strict';

    var controller = require('./controller');

    Filters.composerFormatting = function (payload, callback) {
        payload.options.push({
            name     : 'ns-spoiler',
            className: 'fa fa-eye'
        });
        callback(null, payload);
    };

    Filters.composerHelp = function (helpText, callback) {
        helpText += '<h2>Spoiler</h2>';
        helpText += 'To hide content you could use spoilers:';
        helpText += '\n<pre>\n:::\nspoiler content, will be hidden under interactive button\n:::</pre>';
        callback(null, helpText);
    };

    Filters.parsePost = function (payload, callback) {
        controller.parsePost(payload, callback);
    };

})(module.exports);