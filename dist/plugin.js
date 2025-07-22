var capacitorSsidPlugin = (function (exports, core) {
    'use strict';

    // src/index.ts
    const SSIDPlugin = core.registerPlugin("SSIDPlugin", {
        web: () => import('./web.js').then((m) => new m.SSIDPluginWeb()),
    });

    exports.SSIDPlugin = SSIDPlugin;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
