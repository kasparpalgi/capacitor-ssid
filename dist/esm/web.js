// src/web.ts
import { WebPlugin } from "@capacitor/core";
export class SSIDPluginWeb extends WebPlugin {
    async getCurrentSSID() {
        // Web browsers cannot access WiFi SSID for security reasons
        console.warn("SSID detection is not available in web browsers");
        return { ssid: null };
    }
}
