// src/web.ts
import { WebPlugin } from "@capacitor/core";
import type { SSIDPluginPlugin } from "./definitions";

export class SSIDPluginWeb extends WebPlugin implements SSIDPluginPlugin {
  async getCurrentSSID(): Promise<{ ssid: string | null }> {
    // Web browsers cannot access WiFi SSID for security reasons
    console.warn("SSID detection is not available in web browsers");
    return { ssid: null };
  }
}
