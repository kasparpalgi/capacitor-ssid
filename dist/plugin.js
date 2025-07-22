var capacitorSsidPlugin = (function (exports, core, definitions_js) {
    'use strict';

    // src/index.ts
    const SSIDPlugin = core.registerPlugin("SSIDPlugin", {
        web: () => import('./web.js').then((m) => new m.SSIDPluginWeb()),
    });

    exports.SSIDPlugin = SSIDPlugin;
    Object.keys(definitions_js).forEach(function (k) {
        if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
            enumerable: true,
            get: function () { return definitions_js[k]; }
        });
    });

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports, definitions_js);
//# sourceMappingURL=plugin.js.map
