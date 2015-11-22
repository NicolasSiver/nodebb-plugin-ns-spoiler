/* globals define, app, ajaxify, bootbox, socket, templates, utils */

$(document).ready(function () {
    'use strict';

    require([
        'translator'
    ], function (translator) {

        var elements = {
            MAIN   : '.ns-spoiler',
            BUTTON : '.ns-spoiler-control',
            CONTENT: '.ns-spoiler-content'
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
                var $el = $(this);
                toggleVisibility(getSpoiler($el));
            });
        }

        function getSpoiler($child) {
            return $child.parents(elements.MAIN);
        }

        function toggleVisibility($spoiler) {
            var open = $spoiler.attr('data-open') === 'true';
            $spoiler.attr('data-open', !open);
        }
    });
});
