var webdriver = require('browserstack-webdriver');
var test = require('browserstack-webdriver/testing');
var browserstackConf = require('../browserstack-conf.json');

var assert = require('assert');

var app = require('../app');


test.describe('minimum e2e', function() {

  test.before(function() {
    var self = this;

    var capabilities = {
      'browserName' : 'firefox',
      'browserstack.user' : browserstackConf['browserstack.user'],
      'browserstack.key' : browserstackConf['browserstack.key'],
      'browserstack.debug' : 'true',
      'browserstack.local' : 'true'
    };
    this.driver = new webdriver.Builder()
      .usingServer('http://hub.browserstack.com/wd/hub')
      .withCapabilities(capabilities)
      .build();

    var d = webdriver.promise.defer();
    app.set('port', 3001);
    this.server = app.listen(app.get('port'), function(err) {
      if (err) { return d.reject(err); }
      console.log('Express server listening on port ' + self.server.address().port);
      self.driver.get('http://localhost:3001/');
      d.fulfill();
    });

    return d.promise;
  });

  test.it('should title be "Express"', function() {
    this.driver.getTitle().then(function(title) {
      assert.strictEqual(title, "Express");
    });
  });

  test.after(function() {
    var self = this;

    var d = webdriver.promise.defer();
    this.server.close(function(err) {
      if (err) { return d.reject(err); }
      console.log('Close express server listening');
      self.driver.quit();
      d.fulfill();
    });

    return d.promise;
  });
});
