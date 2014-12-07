var webdriver = require('browserstack-webdriver');

var browserstackConf = require('../browserstack-conf.json');

// Input capabilities
var capabilities = {
  'browserName' : 'firefox',
  'browserstack.user' : browserstackConf['browserstack.user'],
  'browserstack.key' : browserstackConf['browserstack.key'],
  'browserstack.local' : 'true'
}

var driver = new webdriver.Builder().
  usingServer('http://hub.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

driver.get('http://localhost:3000/');

driver.getTitle().then(function(title) {
  console.log(title);  // -> "Express"
});

driver.quit();
