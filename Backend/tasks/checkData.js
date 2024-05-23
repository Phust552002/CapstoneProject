const { remote } = require('webdriverio');

const args = process.argv.slice(2);

const deviceManufacturer = args[0];

const capabilities = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:noReset': true, // if not set, the app will lose all its login data
    'appium:fullReset': false,
};

const wdOpts = {
    hostname: process.env.APPIUM_HOST || 'localhost',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: 'info',
    capabilities,
};

async function check3G() {
    
    const driver = await remote(wdOpts);
    try {
        if (deviceManufacturer ==  'samsung'){
            driver.performActions(
                [
                    {
                        type: 'pointer',
                        id: 'touch',
                        parameters: { pointerType: 'touch' },
                        actions: [
                            { type: 'pointerMove', duration: 0, x: 559, y: 9 },
                            { type: 'pointerDown', button: 0 },
                            { type: 'pause', duration: 500 },
                            { type: 'pointerMove', duration: 1000, origin: 'pointer', x: 0, y: 1190 },
                            { type: 'pointerUp', button: 0 }
                        ]
                    },
                    {
                        type: 'pointer',
                        id: 'touch2',
                        parameters: { pointerType: 'touch' },
                        actions: [
                            { type: 'pointerMove', duration: 0, x: 559, y: 9 },
                            { type: 'pointerDown', button: 0 },
                            { type: 'pause', duration: 500 },
                            { type: 'pointerMove', duration: 1000, origin: 'pointer', x: 0, y: 1190 },
                            { type: 'pointerUp', button: 0 }
                        ]
                    }
                ]
            );//swiping the screen 
    
            const bluetoothItem = await driver.$('//*[contains(@content-desc, "Bluetooth") and contains(@content-desc, "On.") or contains(@content-desc, "Off.")]');
            const bluetoothMode = await bluetoothItem.getAttribute('content-desc');
            if (bluetoothMode.includes("On")) {
                await bluetoothItem.click();
            }
            await driver.execute('mobile: pressKey', { keycode: 4 });// press Back button in Android
        }
        else if (deviceManufacturer == "Xiaomi") {
            const appPackage = 'com.android.settings';
            const appActivity = '.MainSettings';
            await driver.startActivity(appPackage, appActivity);
            const searchbar = await driver.$('//*[@content-desc="Search"]');
            await searchbar.click();
            const search_send = await driver.$('//*[@content-desc="Search"]')
            await search_send.setValue("Mobile data");
            const mobileSearch = await driver.$('//*[@resource-id="com.android.settings:id/search_result"]/android.widget.LinearLayout[1]');
            await mobileSearch.click();
            const mobileToggle = await driver.$('//*[@resource-id="android:id/checkbox"]');
            var attMobile = await mobileToggle.getAttribute('checked');
            console.log(attMobile);
            // if is ON, toggle the switch
            if (attMobile == "true") {
                await mobileToggle.click();
            }
            await driver.pause(1000);
            await driver.execute('mobile: pressKey', { keycode: 4 });
            await driver.execute('mobile: pressKey', { keycode: 4 });
            await driver.execute('mobile: pressKey', { keycode: 4 });
            await driver.terminateApp(appPackage);
        }
    } finally {
        await driver.pause(1000);
        await driver.deleteSession();
    }
}

check3G().catch(console.error);