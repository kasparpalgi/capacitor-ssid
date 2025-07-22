// android/src/main/java/com/capacitorssidplugin/plugin/SSIDPlugin.java
package com.capacitorssidplugin.plugin;

import android.Manifest;
import android.content.Context;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkInfo;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;

@CapacitorPlugin(
    name = "SSIDPlugin",
    permissions = {
        @Permission(strings = { Manifest.permission.ACCESS_WIFI_STATE }),
        @Permission(strings = { Manifest.permission.ACCESS_NETWORK_STATE }),
        @Permission(strings = { Manifest.permission.ACCESS_FINE_LOCATION })
    }
)
public class SSIDPlugin extends Plugin {

    @PluginMethod
    public void getCurrentSSID(PluginCall call) {
        if (!hasPermissions()) {
            requestAllPermissions(call, "SSID_PERMISSION");
            return;
        }

        try {
            String ssid = getConnectedSSID();
            JSObject ret = new JSObject();
            ret.put("ssid", ssid);
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("Failed to get SSID: " + e.getMessage());
        }
    }

    private boolean hasPermissions() {
        return hasPermission(Manifest.permission.ACCESS_WIFI_STATE) &&
               hasPermission(Manifest.permission.ACCESS_NETWORK_STATE) &&
               hasPermission(Manifest.permission.ACCESS_FINE_LOCATION);
    }

    private String getConnectedSSID() {
        ConnectivityManager connectivityManager = 
            (ConnectivityManager) getContext().getSystemService(Context.CONNECTIVITY_SERVICE);
        
        if (connectivityManager == null) {
            return null;
        }

        // Check if we're connected to WiFi
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Network network = connectivityManager.getActiveNetwork();
            if (network == null) return null;
            
            NetworkCapabilities capabilities = connectivityManager.getNetworkCapabilities(network);
            if (capabilities == null || !capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI)) {
                return null;
            }
        } else {
            NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
            if (networkInfo == null || networkInfo.getType() != ConnectivityManager.TYPE_WIFI) {
                return null;
            }
        }

        // Get SSID from WifiManager
        WifiManager wifiManager = (WifiManager) getContext().getSystemService(Context.WIFI_SERVICE);
        if (wifiManager == null) {
            return null;
        }

        WifiInfo wifiInfo = wifiManager.getConnectionInfo();
        if (wifiInfo == null) {
            return null;
        }

        String ssid = wifiInfo.getSSID();
        if (ssid == null || ssid.equals("<unknown ssid>")) {
            return null;
        }

        // Remove quotes if present
        if (ssid.startsWith("\"") && ssid.endsWith("\"")) {
            ssid = ssid.substring(1, ssid.length() - 1);
        }

        return ssid;
    }

    @Override
    protected void handleRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.handleRequestPermissionsResult(requestCode, permissions, grantResults);
        
        PluginCall savedCall = getSavedCall();
        if (savedCall == null) {
            return;
        }

        if (hasPermissions()) {
            getCurrentSSID(savedCall);
        } else {
            savedCall.reject("Permission denied");
        }
    }
}