# ![Icon](./dist/icon16.png) Clockify Balance

**Show your current hourly balance on [clockify.me](https://clockify.me)**

A browser extension that adds a new section to the [tracker](https://clockify.me/tracker) where a section shows up that tells you your current balance for this month in regards of working hours

## Assumptions made at this moment (hopefully configurable in the future)

- You live in Finland
- You use Firefox
- You work 7.5 hours per day
- You have days off on Finnish holidays according to [date-holidays](https://github.com/commenthol/date-holidays)
- You log your work in one workspace and with one user
- Probably something else that I can't see or think of right now

## Requirements

To be able to run the extension you need

- Node.js version 17.x or higher
- npm version 7 or higher

## Setting up

1. `npm i` installs the required dependencies.
2. `npm run watch` starts the dev webpack process, that will watch the TypeScript source code and compile it to `./dist/js` on each new file save.
3. `npm run firefox` starts development of the extension locally on firefox. This uses [web-ext](https://github.com/mozilla/web-ext) and installs the extension in development mode on the browser. `web-ext` watches the output folder (./dist/js) of the webpack process and automatically reloads everytime there is an update to the compiled output.

## Browser

The browser instance is started with new profile and settings that are stored in `.firefox` folder. This enables to make changes to the browser settings that are persisted in those folders while running the extensions in development mode.

## Production build

To build a production version of the source code, run `npm run build`. This will output the code into `./dist/js`

## Tests

Big TODO

## Linting

To run the linter run `npm run lint`
