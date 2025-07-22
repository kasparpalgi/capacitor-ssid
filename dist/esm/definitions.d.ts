export interface SSIDPluginPlugin {
    getCurrentSSID(): Promise<{
        ssid: string | null;
    }>;
}
