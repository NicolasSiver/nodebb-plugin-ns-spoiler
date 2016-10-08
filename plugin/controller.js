(function (Controller) {
    'use strict';

    var spoiler          = /:{3,}\s*(?:<br\s*\/?>\s*)*([\s\S]+?):{3,}/g,
        sanitizeWrap     = /<(\w+)[^<]*>(:{3,})<\/\1>/g,
        safeCloseForList = /(<(ul|ol)>[\s\S]+?)(:{3,})([\s\S]+?<\/\2>)/g,
        safeShiftStart   = /^(<p>)(:{3,})$/gm,
        safeShiftEnd     = /^(:{3,})(<\/p>)$/gm,
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
            // 2. Fix a not properly closed <ul> and <ol> lists
            // 3. Fix a text lines at Start, that concatenates with spoiler via paragraph
            content = content
                .replace(sanitizeWrap, '$2')
                .replace(safeCloseForList, '$1$4\n$3')
                .replace(safeShiftStart, '$2$1')
                .replace(safeShiftEnd, '$2$1');
            
            payload.postData.content = content.replace(spoiler, template);
        }

        callback(null, payload);
    };

})(module.exports);
