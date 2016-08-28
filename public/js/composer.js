/* globals define, app, ajaxify, bootbox, socket, templates, utils */

$(document).ready(function () {
    'use strict';

    $(window).on('action:composer.enhanced', function () {
        require([
            'composer/formatting', 'composer/controls'
        ], function (formatting, controls) {

            var tag    = ':::',
                nl     = '\n\n',
                prompt = 'spoiler text';

            formatting.addButtonDispatch('ns-spoiler', composerControlDidClick);

            function composerControlDidClick(textArea, selectionStart, selectionEnd) {
                if (selectionStart === selectionEnd) {
                    var hlContentStart = selectionStart + getTag().length,
                        hlContentEnd   = hlContentStart + prompt.length;
                    controls.insertIntoTextarea(textArea, getNewSpoiler(prompt));
                    controls.updateTextareaSelection(textArea, hlContentStart, hlContentEnd);
                } else {
                    controls.wrapSelectionInTextareaWith(textArea, getTag(), getTag());
                }
            }

            function getNewSpoiler(message) {
                return getTag() + message + getTag();
            }

            function getTag() {
                return nl + tag + nl;
            }
        });
    });

});
