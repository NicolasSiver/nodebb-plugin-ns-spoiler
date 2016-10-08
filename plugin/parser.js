(function (Parser) {
    'use strict';

    var async = require('async'),
        util  = require('util');

    var spoiler          = /:{3,}\s*(?:<br\s*\/?>\s*)*([\s\S]+?):{3,}/,
        sanitizeWrap     = /<(\w+)[^<]*>(:{3,})<\/\1>/g,
        safeCloseForList = /(<(ul|ol)>[\s\S]+?)(:{3,})([\s\S]+?<\/\2>)/g,
        safeShiftStart   = /^(<p>)(:{3,})$/gm,
        safeShiftEnd     = /^(:{3,})(<\/p>)$/gm,
        template         = '<div class="ns-spoiler" data-open="false"><div class="ns-spoiler-control"><a class="btn btn-default" href="#"><i class="fa fa-eye"></i> spoiler</a></div><div class="ns-spoiler-content">$1</div></div>';


    Parser.getContentAt = function (content, index, done) {
        async.waterfall([
            async.apply(Parser.prepare, content),
            function (sanitizedContent, next) {
                spoiler.lastIndex = index;
                next(null, spoiler.exec(sanitizedContent)[1]);
            }
        ], done);
    };

    Parser.parse = function (content, done) {
        async.waterfall([
            async.apply(Parser.prepare, content),
            function (sanitizedContent, next) {
                var execResult, textSegments = [sanitizedContent], cursor = 0;

                spoiler.lastIndex = 0;

                // If there is a Spoiler in the content, content will be shattered on the chunks
                while ((execResult = spoiler.exec(sanitizedContent)) !== null) {
                    textSegments[cursor] = sanitizedContent.slice(0, execResult.index);
                    textSegments[++cursor] = getTemplate(execResult.index);
                    // Rest content
                    sanitizedContent = sanitizedContent.slice(execResult.index + execResult[0].length);
                    textSegments[++cursor] = sanitizedContent;
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
            .replace(sanitizeWrap, '$2')
            .replace(safeCloseForList, '$1$4\n$3')
            .replace(safeShiftStart, '$2$1')
            .replace(safeShiftEnd, '$2$1');
        done(null, content);
    };

    function getTemplate(index) {
        return util.format('<div class="ns-spoiler" data-index="%d" data-open="false"><div class="ns-spoiler-control"><a class="btn btn-default" href="#"><i class="fa fa-eye"></i> spoiler</a></div><div class="ns-spoiler-content"></div></div>', index);
    }


})(module.exports);
