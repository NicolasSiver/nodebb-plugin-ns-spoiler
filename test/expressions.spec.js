var cloneRegexp = require('clone-regexp'),
    expect = require('chai').expect;

var constants = require('../plugin/constants');

describe('Regular Expressions', () => {
    var spoilerReg;

    beforeEach(() => {
        spoilerReg = cloneRegexp(constants.REG_SPOILER);
    });

    function wrap(content) {
        return `:::${content}:::`;
    }

    it('matches spoiler', function () {
        var content = `<p><br />
spoiler content 1<br />
</p>`;
        expect(spoilerReg.exec(wrap(content))).to.not.be.null;
    });

    it('captures all inner content', function () {
        var content = `<p>content<br /></p>`;
        expect(spoilerReg.exec(wrap(content))[1]).to.be.equal(content);
    });

    it('identifies several spoilers', function () {
        expect(':::a::: and :::<a>::: more :::\n:::'.replace(spoilerReg, '')).to.be.equal(' and  more ');
    });

});