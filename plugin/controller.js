(function (Controller) {
    'use strict';

    let async = require('async');

    let constants = require('./constants'),
        nodebb    = require('./nodebb'),
        parser    = require('./parser');

    Controller.getSpoilerContent = function (payload, callback) {
        async.waterfall([
            async.apply(nodebb.posts.getPostFields, payload.postId, ['content']),
            function preventParse(post, next) {
                post[constants.PARSE_REJECT_TOKEN] = true;
                next(null, post);
            },
            // Trigger parsing process, it will invoke `Controller.parsePost` through hooks
            async.apply(nodebb.posts.parsePost),
            function (post, next) {
                parser.getContentAt(post.content, payload.index, next);
            }
        ], callback);
    };

    /**
     * Performs replacements on content field.
     *
     * @param payload {object} - includes full post entity Payload.postData.content
     * @param callback returns updated content
     */
    Controller.parsePost = function (payload, callback) {
        let content     = payload.postData.content,
            rejectParse = payload.postData[constants.PARSE_REJECT_TOKEN];

        if (content && !rejectParse) {
            parser.parse(content, function (error, parsedContent) {
                payload.postData.content = parsedContent;
                callback(error, payload);
            });
        } else {
            callback(null, payload);
        }
    };

})(module.exports);
