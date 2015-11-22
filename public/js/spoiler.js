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
            addListener($(elements.BUTTON));
        });

        $(window).on('action:posts.loaded', function (e, data) {
            data.posts.forEach(function (post, index) {
                addListener($('[data-pid="' + post.pid + '"]').find(elements.BUTTON));
            });
        });

        function addListener($button) {
            $button.on('click', function (e) {
                toggle($(this));
            });
        }

        function getSpoiler($child) {
            return $child.parents(elements.MAIN);
        }

        function toggle($button) {
            var $spoiler = getSpoiler($button);
            var open = $spoiler.attr('data-open') === 'true';
            var icon = $button.find('i');

            $spoiler.attr('data-open', !open);

            if (!open) {
                icon.removeClass(classes.OPEN_EYE).addClass(classes.CLOSE_EYE);
            } else {
                icon.removeClass(classes.CLOSE_EYE).addClass(classes.OPEN_EYE);
            }
        }
    });
});
