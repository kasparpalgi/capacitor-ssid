// src/index.ts
import { registerPlugin } from "@capacitor/core";
const SSIDPlugin = registerPlugin("SSIDPlugin", {
    web: () => import("./web").then((m) => new m.SSIDPluginWeb()),
});
export { SSIDPlugin };
