/* globals define, app, ajaxify, bootbox, socket, templates, utils */

$(document).ready(function () {
    'use strict';
    require([
        'translator'
    ], function (translator) {

        var elements = {
            MAIN   : '.ns-spoiler',
            BUTTON : '.ns-spoiler-control a',
            CONTENT: '.ns-spoiler-content'
        }, classes   = {
            OPEN_EYE : 'fa-eye',
            CLOSE_EYE: 'fa-eye-slash'
        };

        $(window).on('action:topic.loading', function (e) {
            addTopicListener();
        });

        function addTopicListener() {
            $('[component="topic"]').on("click", elements.BUTTON, function () {
                toggle($(this));
            });
        }

        function toggle($button) {
            var $spoiler = $button.parents(elements.MAIN),
                $content = $spoiler.find(elements.CONTENT),
                open     = $spoiler.attr('data-open') === 'true',
                postId   = parseInt($spoiler.parents('[data-pid]').attr('data-pid')),
                index    = parseInt($spoiler.attr('data-index')),
                icon     = $button.find('i');

            $spoiler.attr('data-open', !open);

            if (!open) {
                icon.removeClass(classes.OPEN_EYE).addClass(classes.CLOSE_EYE);
            } else {
                icon.removeClass(classes.CLOSE_EYE).addClass(classes.OPEN_EYE);
            }

            // Check if content is empty
            if ($content.html().length == 0) {
                socket.emit(
                    'plugins.ns-spoiler.getSpoilerContent',
                    {index: index, postId: postId},
                    function (error, content) {
                        if (error) {
                            return console.error('Error has occurred, error: %s', error.message);
                        }
                        $content.html(content);
                        $spoiler.find('img').attr('data-state', 'loaded');
                    }
                );
            }

        }
    });
});
