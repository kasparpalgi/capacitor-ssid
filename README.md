# Capacitor SSID Plugin

NOTE: tested and working on Android with Capacitor 7.x but not tested on iOS!

## Usage in your Capacitor app

1. Install the plugin in your Capacitor project:  

   ```bash
   npm i capacitor-ssid-plugin
   npx cap sync
   ```

2. Add permissions to your app:

Android (android/app/src/main/AndroidManifest.xml):

```xml
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

iOS (ios/App/App/Info.plist):

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs location access to detect WiFi network names.</string>
```

iOS also requires adding entitlements (ios/App/App/App.entitlements):

```xml
<key>com.apple.developer.networking.HotspotConfiguration</key>
<true/>
<key>com.apple.developer.networking.networkextension</key>
<array>
  <string>hotspot-configuration</string>
</array>
```

### Import the plugin to your app

```typescript
import { SSIDPlugin } from 'capacitor-ssid-plugin';
```

### Check current SSID

```typescript
async function checkCurrentNetwork() {
  try {
    const result = await SSIDPlugin.getCurrentSSID();
    if (result.ssid) {
      console.log('Connected to:', result.ssid);
      return result.ssid;
    } else {
      console.log('Not connected to WiFi or SSID unavailable');
      return null;
    }
  } catch (error) {
    console.error('Error getting SSID:', error);
    return null;
  }
}
```

## Plugin directory structure:

```
   ssid-plugin/
   ├── src/
   │   ├── definitions.ts
   │   ├── index.ts
   │   └── web.ts
   ├── android/
   │   ├── build.gradle
   │   └── src/main/java/com/yourpackage/ssidplugin/SSIDPlugin.java
   ├── ios/
   │   └── Plugin/
   │       ├── SSIDPlugin.swift
   │       └── SSIDPlugin.m
   ├── package.json
   └── CapacitorSsidPlugin.podspec
```

## Important Notes

   - On Android 10+ (API 29+), you need location permissions to access SSID
   - On iOS 14+, apps need special entitlements from Apple for SSID access
   - For production apps, you might need to request these entitlements from Apple
   - Test thoroughly on real devices, not simulators before production use