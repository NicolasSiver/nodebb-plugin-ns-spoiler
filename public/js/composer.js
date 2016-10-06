/* globals define, app, ajaxify, bootbox, socket, templates, utils */

$(document).ready(function () {
    'use strict';

    $(window).on('action:redactor.load', initRedactor);

    $(window).on('action:composer.loaded', function(ev, data) {
        if ($.Redactor && $.Redactor.opts.plugins.indexOf('ns-spoiler') === -1) {
            console.log('here');
            $.Redactor.opts.plugins.push('ns-spoiler');
        }
    });

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

    function initRedactor() {
        $.Redactor.prototype['ns-spoiler'] = function () {
            return {
                init: function () {
                    var button = this.button.add('ns-spoiler', 'Add Spoiler');
                    this.button.setAwesome('ns-spoiler', 'fa fa-eye-slash');
                    this.button.addCallback(button, this['ns-spoiler'].onClick);
                },
                onClick: function () {
                    this.insert.html('<p>:::<br />Spoiler Text<br />:::</p>');
                }
            };
        };
    }
});
