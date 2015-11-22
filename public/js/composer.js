/* globals define, app, ajaxify, bootbox, socket, templates, utils */

$(document).ready(function () {
    'use strict';

    require([
        'composer/formatting', 'composer/controls'
    ], function (formatting, controls) {

        var tag    = ':::',
            nl     = '\n',
            prompt = 'spoiler text';

        formatting.addButtonDispatch('ns-spoiler', composerControlDidClick);

        function composerControlDidClick(textArea, selectionStart, selectionEnd) {
            if (selectionStart === selectionEnd) {
                var hlContentStart = selectionStart + tag.length + nl.length,
                    hlContentEnd   = hlContentStart + prompt.length;
                controls.insertIntoTextarea(textArea, getNewSpoiler());
                controls.updateTextareaSelection(textArea, hlContentStart, hlContentEnd);
            } else {
                controls.wrapSelectionInTextareaWith(textArea, tag, tag);
            }
        }

        function getNewSpoiler() {
            return tag + nl + prompt + nl + tag;
        }
    });
});
