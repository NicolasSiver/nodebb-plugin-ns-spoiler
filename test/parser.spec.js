var expect = require('chai').expect;

var parser = require('../plugin/parser');

describe('Parser', () => {

    it('remove wrapping tags', function () {
        parser.prepare('<a>:::</a>', function (error, result) {
            expect(result).to.be.equal('\n:::\n');
        });
    });

    it('moves paragraph tag inside', function () {
        parser.prepare('<p>:::', function (error, result) {
            expect(result).to.be.equal('\n:::\n<p>');
        });
    });

    it('moves closed paragraph tag inside', function () {
        parser.prepare(':::</p>', function (error, result) {
            expect(result).to.be.equal('</p>\n:::\n');
        });
    });

    it('adds extra new lines', function () {
        parser.prepare(':::', function (error, result) {
            expect(result).to.be.equal('\n:::\n');
        });
    });

    it('ignores multi-list layout', function() {
        parser.prepare(':::<ol>content</ol>:::<ol>content 2</ol>', function (error, result) {
            expect(result).to.be.equal('\n:::\n<ol>content</ol>\n:::\n<ol>content 2</ol>');
        });
    });

    it('moves spoiler tag from the list', function() {
        parser.prepare('<ol>content:::</ol>', function (error, result) {
            expect(result).to.be.equal('<ol>content</ol>\n\n:::\n');
        });
    })

});