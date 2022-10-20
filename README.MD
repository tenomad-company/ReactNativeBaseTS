# REACT NATIVE TS

## Rename project

https://github.com/junedomingo/react-native-rename

## Library

- Native Base
- React native permission

## First time setup

- if using MacOS, run init script:

```
    bin/setup
```

- Link fonts

```
    yarn linkfont
```

## Deploy

### 1. Install [fastlane](https://docs.fastlane.tools/getting-started/ios/setup/)

### 2. Setting ENV:

Config env inside file `fastlane/.env.dev` and `fastlane/.env.dev` flow: [`DIAWI_TOKEN`](https://github.com/pacification/fastlane-plugin-diawi) [fastlane env](http://docs.fastlane.tools/best-practices/continuous-integration/#environment-variables-to-set)

### 3. Deploy for each platform

run scrip in terminal

```ts
// for ios
yarn ios:deploy:prod
yarn ios:deploy:dev

// for ios
yarn android:deploy:prod
yarn android:deploy:dev
```
