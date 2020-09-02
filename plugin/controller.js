(function (Controller) {
    'use strict';

    var async = require('async');

    var constants = require('./constants'),
        nodebb    = require('./nodebb'),
        parser    = require('./parser');

    /**
     * Get spoiler content.
     * Because spoiler content is not cached or stored, previous hook chain should be accounted to find
     * a corresponding spoiler content.
     *
     * @param {object} payload request for spoiler content
     * @param {string} payload.postId post identifier
     * @param {number} payload.index initial index where spoiler content starts
     * @param {function} callback
     */
    Controller.getSpoilerContent = function (payload, callback) {
        async.waterfall([
            async.apply(nodebb.posts.getPostFields, payload.postId, ['content']),
            // Trigger parsing process
            function chainParse(post, next) {
                post[constants.PARSE_REJECT_TOKEN] = true;

                nodebb.plugins.fireHook('filter:parse.post', {postData: post}, function (error, hookResult) {
                    if (error) {
                        return next(error);
                    }

                    next(null, hookResult.postData);
                });
            },
            function (post, next) {
                parser.getContentAt(post.content, payload.index, next);
            }
        ], callback);
    };

    /**
     * Performs replacements on content field.
     *
     * @param {object} payload - includes full post entity
     * @param {object} payload.postData a post object with 'content' field
     * @param {function} callback returns updated content
     */
    Controller.parsePost = function (payload, callback) {
        var content     = payload.postData.content,
            pid         = payload.postData.pid,
            rejectParse = payload.postData[constants.PARSE_REJECT_TOKEN];

        if (content && !rejectParse) {
            parser.parse(content, pid, function (error, parsedContent) {
                payload.postData.content = parsedContent;
                callback(error, payload);
            });
        } else {
            // Skip hook chain if reject token is set
            callback(null, payload);
        }
    };

})(module.exports);
