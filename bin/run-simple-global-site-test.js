//
// Ref) https://www.browserstack.com/automate/node#getting-started
//

var webdriver = require('browserstack-webdriver');

var browserstackConf = require('../browserstack-conf.json');

// Input capabilities
var capabilities = {
  'browserName' : 'firefox',
  'browserstack.user' : browserstackConf['browserstack.user'],
  'browserstack.key' : browserstackConf['browserstack.key']
}

var driver = new webdriver.Builder().
  usingServer('http://hub.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

driver.get('http://www.google.com/ncr');
driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack');
driver.findElement(webdriver.By.name('btnG')).click();

driver.getTitle().then(function(title) {
  console.log(title);
});

driver.quit();
