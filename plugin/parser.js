(function (Parser) {
    'use strict';

    let async = require('async'),
        util  = require('util');

    let constants = require('./constants');

    var spoiler = new RegExp(constants.REG_SPOILER.source, constants.REG_SPOILER.flags);


    Parser.getContentAt = function (content, index, done) {
        console.log(content);
        async.waterfall([
            async.apply(Parser.prepare, content),
            function (sanitizedContent, next) {
                console.log(sanitizedContent);
                var spoilerContent;
                spoiler.lastIndex = index;
                spoilerContent = spoiler.exec(sanitizedContent);
                if (spoilerContent) {
                    next(null, spoilerContent[1]);
                } else {
                    next(new Error('Something went wrong. Spoiler content can not be found.'));
                }
            }
        ], done);
    };

    Parser.parse = function (content, done) {
        async.waterfall([
            async.apply(Parser.prepare, content),
            function (sanitizedContent, next) {
                var execResult, textSegments = [sanitizedContent], cursor = 0, position = 0;
                spoiler.lastIndex = 0;

                // If there is a Spoiler in the content, content will be shattered on the chunks
                while ((execResult = spoiler.exec(sanitizedContent)) !== null) {
                    textSegments[cursor] = sanitizedContent.slice(position, execResult.index);
                    textSegments[++cursor] = getTemplate(execResult.index);
                    // Rest content
                    textSegments[++cursor] = sanitizedContent.slice(spoiler.lastIndex);
                    position = spoiler.lastIndex;
                }

                next(null, textSegments.join(''));
            }
        ], done);
    };

    /**
     * 1. Sanitize: remove wrapping tags, like <p>
     * 2. Fix a not properly closed <ul> and <ol> lists
     * 3. Fix a text lines at Start, that concatenates with spoiler via paragraph
     * @param {string} content post message to process
     * @param {function} done
     */
    Parser.prepare = function (content, done) {
        content = content
            .replace(constants.REG_SANITIZE_WRAP, '$2')
            .replace(constants.REG_SAFE_LIST_CLOSE, '$1$4\n$3')
            .replace(constants.REG_SAFE_SHIFT_START, '$2$1')
            .replace(constants.REG_SAFE_SHIFT_END, '$2$1');
        done(null, content);
    };

    function getTemplate(index) {
        return util.format('<div class="ns-spoiler" data-index="%d" data-open="false"><div class="ns-spoiler-control"><a class="btn btn-default" href="#"><i class="fa fa-eye"></i> spoiler</a></div><div class="ns-spoiler-content"></div></div>', index);
    }


})(module.exports);
