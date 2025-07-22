// src/index.ts
import { registerPlugin } from "@capacitor/core";
import type { SSIDPluginPlugin } from "./definitions";

const SSIDPlugin = registerPlugin<SSIDPluginPlugin>("SSIDPlugin", {
  web: () => import("./web").then((m) => new m.SSIDPluginWeb()),
});

export * from "./definitions";
export { SSIDPlugin }   ;
