(function (Controller) {
    'use strict';

    var spoiler          = /:{3,}\s*(?:<br\s*\/?>\s*)*([\s\S]+?):{3,}/g,
        sanitizeWrap     = /<(\w+)[^<]*>(:{3,})<\/\1>/g,
        safeCloseForList = /(<(ul|ol)>[\s\S]+?)(:{3,})([\s\S]+?<\/\2>)/g,
        safeInitialText  = /<p>(:{3,})<br[^<]*>\n([\s\S]*)<\/p>/g,
        template         = '<div class="ns-spoiler" data-open="false"><div class="ns-spoiler-control"><a class="btn btn-default" href="#"><i class="fa fa-eye"></i> spoiler</a></div><div class="ns-spoiler-content">$1</div></div>';

    /**
     * Performs replacements on content field.
     *
     * @param payload {object} - includes full post entity Payload.postData.content
     * @param callback returns updated content
     */
    Controller.parsePost = function (payload, callback) {
        var content = payload.postData.content;

        if (content) {
            // 1. Sanitize: remove wrapping tags, like <p>
            // 2. Fix not properly closed <ul> and <ol> lists
            // 3. Fix initial text lines, that concat with spoiler via paragraph
            content = content
                .replace(sanitizeWrap, '$2')
                .replace(safeCloseForList, '$1$4\n$3')
                .replace(safeInitialText, '$1\n<p>$2</p>');
            console.log(content);
            content = content.replace(spoiler, template);
            payload.postData.content = content;
        }

        callback(null, payload);
    };

})(module.exports);