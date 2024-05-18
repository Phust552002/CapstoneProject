const { remote } = require('webdriverio');

const args = process.argv.slice(2);

const capabilities = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    //'appium:udid':'MY_PHONE_UDID',
    // 'appium:appPackage': 'com.zing.zalo',
    // 'appium:appActivity': '.ui.ZaloLauncherActivity',
    'appium:noReset': true, // if not set, the app will lose all its login data
    'appium:fullReset': false,
};

const wdOpts = {
    hostname: process.env.APPIUM_HOST || 'localhost',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: 'info',
    capabilities,
};

async function deleteZaloCache() {
    const appPackage = 'com.zing.zalo';
    const appActivity = '.ui.ZaloLauncherActivity';
    const driver = await remote(wdOpts);
    try {
        // check if Zalo is installed in the device
        const hasZalo = await driver.isAppInstalled(appPackage);

        if (hasZalo) {
            await driver.startActivity(appPackage, appActivity);
            const profileTab = await driver.$('//*[@resource-id="com.zing.zalo:id/maintab_metab"]');
            await profileTab.click();
            const dataOnDevice = await driver.$('//*[@resource-id="com.zing.zalo:id/recyclerView"]/android.widget.LinearLayout[4]');
            await dataOnDevice.click();
            const clearCacheBtn = await driver.$('//*[@resource-id="com.zing.zalo:id/btn_clean_cache"]');
            await clearCacheBtn.click();
            const clearConfirm = await driver.$('//*[@resource-id="com.zing.zalo:id/btn_positive_modal"]');
            await clearConfirm.click();
         }

        else {
            throw "Zalo chưa được tải!";
            // console.log("Zalo has not been installed!")
        }
        
        await driver.pause(3000);
        await driver.terminateApp(appPackage);
    }
    // catch(err) {
    //     console.log(err);
    // }
    finally {
        await driver.pause(1000);
        await driver.deleteSession();
    }
}

deleteZaloCache().catch(console.error);