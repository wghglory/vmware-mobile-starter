# React Native Starter from VMware VCPP team

How is this project created?

`expo init <project-name>` and select tabs typescript managed workflow template.

## Add NativeBase UI library

https://docs.nativebase.io/install-expo

```shell
yarn add native-base
expo install react-native-svg
expo install react-native-safe-area-context
```

## Configure Android localhost API

By default, android emulator cannot access a localhost BE API. One way is to use local IP instead of localhost. The other way, as a better option, is to map your computer's local server port to same port in device.

See list of devices connected. It can be emulator or real device.

```shell
$ adb devices
```

```
List of devices attached
emulator-5554   device <--- emulator
2681523e        device <-- real device
```

Let's map the ports:

```shell
$ adb -s emulator-5554 reverse tcp:3000 tcp:3000
$ adb -s 2681572e reverse tcp:3000 tcp:3000
```

## Find Icons

https://icons.expo.fyi/
