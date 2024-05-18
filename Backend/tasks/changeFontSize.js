const { remote } = require('webdriverio');

const args = process.argv.slice(2);

const deviceManufacturer = args[0];

var fontValue = args[1];

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  // 'appium:appPackage': 'com.android.settings',
  // 'appium:appActivity': '.Settings',
  'appium:noReset': true, // if not set, the app will lose all its login data
  'appium:fullReset': false,
};
const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

async function changeFont() {
  const driver = await remote(wdOpts);
  const appPackage = 'com.android.settings';
  var appActivity = '';
  try {
    if (deviceManufacturer == "samsung") {
      appActivity = '.Settings';
      // Available Font values: 0.0 1.0 2.0 3.0 4.0 5.0 6.0
    fontValue = Number(fontValue);
    await driver.startActivity(appPackage, appActivity);
        
    const displayItem = await driver.$('//*[@text="Display"]');
    await displayItem.click();
    const fontItem = await driver.$('//*[@text="Font and screen zoom"]');
    await fontItem.click();
    const fontSeekBar = await driver.$(
      '//*[@resource-id="com.android.settings:id/seekBarForFontSize"]');
    // If the seek bar already set to desired value, then nothing to do
    // WARN: Do not set the same value twice or it will get error
    const currentFont = await fontSeekBar.getText();
    if (Number(currentFont) !== fontValue) {
      await fontSeekBar.setValue(fontValue);
      const applyButton = await driver.$(
        '//*[@resource-id="com.android.settings:id/menu_done"]')
      await applyButton.click();
    }
    await driver.pause(1000);
    }
    else if (deviceManufacturer == "Xiaomi") {
      const textFont = {
        0.0: 'XXS',
        1.0: 'XXS',
        2.0: 'XS',
        3.0: 'S',
        4.0: 'L',
        5.0: 'XL',
        6.0: 'XXL'
      }
      fontValue = Number(fontValue);
      const textUserInput = textFont[fontValue];
      appActivity = '.MainSettings';
      await driver.startActivity(appPackage, appActivity);
      const searchbar = await driver.$('//*[@content-desc="Search"]');
      await searchbar.click();
      const search_send = await driver.$('//*[@content-desc="Search"]')
      await search_send.setValue("text size");
      const textSize = await driver.$('//*[@resource-id="com.android.settings:id/search_result"]/android.widget.LinearLayout[3]');
      await textSize.click();
      const fontButton = await driver.$('//*[@content-desc="' + textUserInput +'"]');
      await fontButton.click();
      await driver.pause(1000);
      const confirmFont = await driver.$('//*[@content-desc="Back"]');
      await confirmFont.click();
    }
    
    await driver.pause(3000);
    await driver.terminateApp(appPackage);
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

changeFont().catch(console.error);