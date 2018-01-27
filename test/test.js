var assert = require('assert');
var rssv2 = require('./samples/rssv2');
var rssv2InvalidFormat = require('./samples/rssv2-invalid-format');
var rssParser = require('../index');

describe('when rss parse', function() {
  describe('valid document', function() {
    it('should return rss items', function() {
      return rssParser.parse(rssv2.feed)
        .then((result) => {
          assert.equal(result.title, 'Scripting News');
          assert.equal(result.link, 'http://www.scripting.com/');
          assert.equal(result.description, 'A weblog about scripting and stuff like that.');
          assert.equal(result.language, 'en-us');
          assert.equal(result.copyright, 'Copyright 1997-2002 Dave Winer');
          assert.equal(result.lastBuildDate, 'Mon, 30 Sep 2002 11:00:00 GMT');
          assert.equal(result.generator, 'Radio UserLand v8.0.5');
          assert.equal(result.categories.length, 1);
          assert.equal(result.categories[0].value, '1765');
          assert.equal(result.managingEditor, 'dave@userland.com');
          assert.equal(result.webMaster, 'dave@userland.com');
          assert.equal(result.ttl, '40');
          assert.equal(result.items.length, 9);
          assert.equal(result.items[0].pubDate, 'Mon, 30 Sep 2002 01:56:02 GMT');
          assert.equal(result.items[0].guids.length, 1);
          assert.equal(result.items[0].guids[0].value, 'http://scriptingnews.userland.com/backissues/2002/09/29#When:6:56:02PM');
          assert.equal(result.items[0].enclosures.length, 1);
          assert.equal(result.items[0].enclosures[0].url, 'http://www.scripting.com/mp3s/weatherReportSuite.mp3');
          assert.equal(result.items[0].enclosures[0].length, '12216320');
          assert.equal(result.items[0].enclosures[0].type, 'audio/mpeg');
          assert.equal(result.items[1].pubDate, 'Sun, 29 Sep 2002 19:59:01 GMT');
          assert.equal(result.items[1].guids.length, 1);
          assert.equal(result.items[1].guids[0].value, 'http://scriptingnews.userland.com/backissues/2002/09/29#When:12:59:01PM');
        });
    });
  });

  describe('invalid document', function() {
    it('should reject promise', function() {
      rssParser.parse(rssv2InvalidFormat.feed)
        .then((result) => {
          assert.fail('Should be invalid');
        })
        .catch((error) => {
          //
        });
    });
  });
});