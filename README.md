# NodeBB: Spoiler

Spoiler. Ability to control visibility of the content in posts. Works better with Markdown syntax.

![Version](https://img.shields.io/npm/v/nodebb-plugin-ns-spoiler.svg)
![Dependencies](https://david-dm.org/NicolasSiver/nodebb-plugin-ns-spoiler.svg)
![bitHound Score](https://www.bithound.io/github/NicolasSiver/nodebb-plugin-ns-spoiler/badges/score.svg)
![Code Climate](https://img.shields.io/codeclimate/github/NicolasSiver/nodebb-plugin-ns-spoiler.svg)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
 

- [General](#general)
- [TODO](#todo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## General

Implementation is based on ideas from [CommonMark Talk](http://talk.commonmark.org/t/what-could-a-spoiler-tag-extension-look-like/767) group.

## TODO

- Tag Feature: Messages/Title (ability to specify message, ex. `:::sexy images:::`, in the end it will produce button with additional comment)
- Tag Feature: meta conditions, ex. `:::{title:'sexy images', reputation: 80}:::` spoiler expandable for the users with 100 or more posts, with 8 or more points, with 80 or more reputation, etc.
- Animation: expand/collapse