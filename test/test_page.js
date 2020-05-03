const assert = require('assert');
const urlExists = require('url-exists');
const loadPage = require('./html_helper');

describe('Page', () => {
  before((done) => {
    loadPage((pageHTML, pageObj) => {
      page = pageHTML;
      $ = pageObj;
      done();
    });
  });

  describe('#page', () => {
    it('should exist', () => {
      assert.equal(true, !!page);
    });

    it('should have title', () => {
      assert.equal('Felipe Tuyama', $('title').text(), 'Invalid page title');
    });
  });

  describe('#links', () => {
    before((done) => {
      links = $('a');
      done();
    });

    it('should have target blank', () => {
      links.each((i, link) => {
        if (!link.attribs.href.match(/.*(resume|google|#).*/)) {
          // console.log(link.attribs.href);
          assert.equal('_blank', link.attribs.target, `${link.attribs.href} should have target _blank`);
        }
      });
    });

    it('should be valid', () => {
      links.each((i, link) => {
        if (!link.attribs.href.match(/.*(resume|google|vigil|#).*/)) {
          urlExists(link.attribs.href, (err, exists) => {
            if (err) throw err;
            assert.equal(true, exists, `${link.attribs.href} no longer exists`);
          });
        }
      });
    });
  });
});
