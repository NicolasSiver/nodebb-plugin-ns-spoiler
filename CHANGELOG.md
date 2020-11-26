# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [7.2.1] - 2020-11-26

- Fixed infinite scrolling and post edits to provide missing Spoiler interactions (Thanks to tudor2004)

## [7.2.0] - 2020-09-08

- Added support for post queue where spoiler content will be rendered as is (Thanks to julianlam)

## [7.1.0] - 2020-09-02

- Added support for rendering beyond Topic pages (Thanks to julianlam)
- Changed module dependencies to resole security issues with Lodash

## [7.0.1] - 2020-07-03

- Changed library dependencies to have the latest development and production libraries
- Removed images module dependency from Spoiler client (Thanks to julianlam)

## [7.0.0] - 2019-05-10

- Changed compatibility with NodeBB v1.12.x

## [6.0.0] - 2019-01-13

- Changed compatibility with NodeBB v1.11.x

## [5.0.1] - 2018-05-06

- Fixed issue with multi-list layouts.

## [5.0.0] - 2018-04-30

- Added compatibility with NodeBB v1.8.2

## [4.1.0] - 2017-03-11

- Changed the icon in the new version of redactor

## [4.0.1] - 2017-02-08

- Changed parent content identifier for image loading

## [4.0.0] - 2017-02-06

- Added compatibility with NodeBB v1.1.0
- Changed content rendering to accommodate image lazy loading (Thanks to segura2010)

## [3.1.0] - 2017-01-16

- Changed internal logic to use a plugins hooks
- Fixed issue with spoiler content

## [3.0.3] - 2016-11-15

- Fixed a duplicate spoiler template for a Redactor WYSIWYG

## [3.0.2] - 2016-10-10

- Fixed RegExp clone for Node v4 environments

## [3.0.1] - 2016-10-10

- Added template string for spoiler template

## [3.0.0] - 2016-10-08

- Added requirement for multi-line spoiler, i.e. inline spoiler will not be parsed
- Changed spoiler delivering. Content of a spoiler isn't delivered anymore to the client.
- Changed HTML manipulation to create more safe result for paragraphs

## [2.0.0] - 2016-10-08

- Added Redactor WYSIWYG support
- Added installation support for NodeBB v1

## [1.2.0] - 2016-08-28

- Added extra line around spoiler tags
- Added a load of composer tools when composer is activated
- Changed spoiler rendering to prevent inline representation

## [1.1.1] - 2015-11-23

- Removed logging information

## [1.1.0] - 2015-11-23

- Added several handlers for Markdown plugin: paragraph shifts, list unwrap
- Removed extra paragraph for the spoiler tag

## [1.0.0] - 2015-11-22

- Initial release
