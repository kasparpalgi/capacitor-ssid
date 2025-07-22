import { WebPlugin } from "@capacitor/core";
import type { SSIDPluginPlugin } from "./definitions";
export declare class SSIDPluginWeb extends WebPlugin implements SSIDPluginPlugin {
    getCurrentSSID(): Promise<{
        ssid: string | null;
    }>;
}
