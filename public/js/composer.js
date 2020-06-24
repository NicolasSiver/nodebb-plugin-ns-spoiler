'use strict';
/* globals define, app, ajaxify, bootbox, socket, templates, utils */

$(document).ready(function () {
    var tag    = ':::',
        nl     = '\n',
        textPrompt = 'Spoiler Text';

    function getTag() {
        return nl + tag + nl;
    }

    // Quill only adds buttons if there is a listener, so this adds a no-op and is overridden later on
    require(['composer/formatting'], function (formatting) {
        formatting.addButtonDispatch('ns-spoiler', function () {});
    });

    $(window).on('action:composer.loaded', function (ev, data) {
        if ($.Redactor && $.Redactor.opts.plugins.indexOf('ns-spoiler') === -1) {
            $.Redactor.opts.plugins.push('ns-spoiler');
        }
    });

    $(window).on('action:composer.enhanced', function () {
        require([
            'composer/formatting', 'composer/controls'
        ], function (formatting, controls) {
            formatting.addButtonDispatch('ns-spoiler', composerControlDidClick);

            function composerControlDidClick(textArea, selectionStart, selectionEnd) {
                if (selectionStart === selectionEnd) {
                    var hlContentStart = selectionStart + getTag().length,
                        hlContentEnd   = hlContentStart + textPrompt.length;
                    controls.insertIntoTextarea(textArea, getNewSpoiler(textPrompt));
                    controls.updateTextareaSelection(textArea, hlContentStart, hlContentEnd);
                } else {
                    controls.wrapSelectionInTextareaWith(textArea, getTag(), getTag());
                }
            }

            function getNewSpoiler(message) {
                return getTag() + message + getTag();
            }
        });
    });

    $(window).on('action:redactor.load', function () {
        $.Redactor.prototype['ns-spoiler'] = function () {
            return {
                init   : function () {
                    var button = this.button.add('ns-spoiler', 'Add Spoiler');
                    this.button.setIcon(button, '<i class="fa fa-eye-slash"></i>');
                    this.button.addCallback(button, this['ns-spoiler'].onClick);
                },
                onClick: function () {
                    this.insert.html('<p>' + tag + '<br /><br />' + textPrompt + '<br /><br />' + tag + '</p>');
                }
            };
        };
    });

    $(window).on('action:quill.load', function (ev, quill) {
        require(['quill', 'composer/formatting'], function (Quill, formatting) {
            // Override the composer-default handler for ns-spoiler and use one for Quill
            const Delta = Quill.import('delta');

            formatting.addButtonDispatch('ns-spoiler', function () {
                const range = quill.getSelection();
                let insertionDelta;

                if (range.length) {
                    insertionDelta = quill.getContents(range.index, range.length);
                } else {
                    insertionDelta = new Delta().insert(textPrompt);
                }

                // Wrap selection in spoiler tags
                quill.updateContents(new Delta()
                    .retain(range.index)
                    .delete(range.length)
                    .insert(getTag())
                    .concat(insertionDelta)
                    .insert(getTag())
                );

                if (range.length) {
                    // Update selection
                    quill.setSelection(range.index + 5, range.length);
                } else {
                    quill.setSelection(range.index + 5, textPrompt.length);
                }
            });
        });
    });
});
