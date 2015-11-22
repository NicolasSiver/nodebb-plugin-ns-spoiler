(function (Controller) {
    'use strict';

    var spoiler  = /:{3,}([\s\S]+?):{3,}/g,
        template = '<div class="ns-spoiler" data-open="false"><div class="ns-spoiler-control"><a class="btn btn-default" href="#"><i class="fa fa-eye"></i> spoiler</a></div><div class="ns-spoiler-content">$1</div></div>';

    /**
     * Performs replacements on content field.
     *
     * @param payload {object} - includes full post entity Payload.postData.content
     * @param callback returns updated content
     */
    Controller.parsePost = function (payload, callback) {
        var content = payload.postData.content;

        if (content) {
            content = content.replace(spoiler, template);
            payload.postData.content = content;
        }

        callback(null, payload);
    };

})(module.exports);