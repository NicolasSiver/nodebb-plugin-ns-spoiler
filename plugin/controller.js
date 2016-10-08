(function (Controller) {
    'use strict';

    var parser = require('./parser');

    /**
     * Performs replacements on content field.
     *
     * @param payload {object} - includes full post entity Payload.postData.content
     * @param callback returns updated content
     */
    Controller.parsePost = function (payload, callback) {
        var content = payload.postData.content;

        if (content) {
            parser.parse(content, function (error, parsedContent) {
                payload.postData.content = parsedContent;
                callback(error, payload);
            });
        } else {
            callback(null, payload);
        }
    };

})(module.exports);
