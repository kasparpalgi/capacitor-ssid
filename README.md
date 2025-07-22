# Capacitor SSID Plugin

## Usage in your Capacitor app

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

### Example usage in a component

```typescript
async function handleCheckNetwork() {
  const ssid = await checkCurrentNetwork();
  
  if (ssid) {
    // Device is connected to WiFi
    if (ssid === 'YourTargetNetwork') {
      // Connected to the expected network
      console.log('Connected to target network!');
    } else {
      // Connected to a different network
      console.log(`Connected to ${ssid}, but expected YourTargetNetwork`);
    }
  } else {
    // Not connected to WiFi or couldn't detect SSID
    console.log('No WiFi connection detected');
  }
}
```

## Plugin directory structure:

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

1. Build the plugin:
   npm run build

2. Install in your app:
   npm install path/to/your-plugin
   npx cap sync

3. Add permissions to your app:

   Android (android/app/src/main/AndroidManifest.xml):
   <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
   <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

   iOS (ios/App/App/Info.plist):
   <key>NSLocationWhenInUseUsageDescription</key>
   <string>This app needs location access to detect WiFi network names.</string>

   iOS also requires adding entitlements (ios/App/App/App.entitlements):
   <key>com.apple.developer.networking.HotspotConfiguration</key>
   <true/>
   <key>com.apple.developer.networking.networkextension</key>
   <array>
       <string>hotspot-configuration</string>
   </array>

4. Important Notes:
   - On Android 10+ (API 29+), you need location permissions to access SSID
   - On iOS 14+, apps need special entitlements from Apple for SSID access
   - For production apps, you might need to request these entitlements from Apple
   - Test thoroughly on real devices, not simulators

5. Alternative for development/testing:
   If you have issues with permissions/entitlements, you can modify the plugin
   to return a mock SSID in development mode.
*/