# Capstone Project: Mobile application using RPA to assist the elderly

## 1. Install Appium

Please refer to the official [Appium Documentation](https://appium.io/docs/en/latest/quickstart/install/).

## 2. Clone the project
```
git clone https://github.com/Phust552002/CapstoneProject
```
## 3. Install each node modules in each folder
```
cd Backend
npm install
cd Client
npm install
```

## 4. Run the project
Please make sure your device is connected through ADB port and your Appium server is on.
In the CMD, use the command
```
appium
```
In the project folder:
```
cd Client
npx expo start
```

## 5. Replace the API endpoints
The API endpoints in the codes are local, in order for the Expo Go application to call the APIs, you would need to public your API endpoints, this can be done by using [Ngrok](https://dashboard.ngrok.com/get-started/setup/windows).

## 6. Modify the task (Locators + steps)
The tasks can be further modified to fit your needs, by using the Inspectors (Appium Inspector), and modify the steps required.
