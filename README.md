# NodeBB: Spoiler

Spoiler. Ability to control visibility of the content in posts. Works better with Markdown syntax.

![Version](https://img.shields.io/npm/v/nodebb-plugin-ns-spoiler.svg)
![Dependencies](https://david-dm.org/NicolasSiver/nodebb-plugin-ns-spoiler.svg)

Example:

```
:::

Spoiler's content goes here, it should start and end with at least 3 colons.
It should have a blank lines around the 3 colons tags.

:::
```

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
 

- [General](#general)
- [Styling](#styling)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## General

Implementation is based on ideas from [CommonMark Talk](http://talk.commonmark.org/t/what-could-a-spoiler-tag-extension-look-like/767) group.

## Styling

If you want to alter look of the spoiler, you could use these CSS classes: 

- `ns-spoiler` 
- `ns-spoiler-control` 
- `ns-spoiler-content`
