'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

// src/index.ts
const SSIDPlugin = core.registerPlugin("SSIDPlugin", {
    web: () => Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('./web.js')); }).then((m) => new m.SSIDPluginWeb()),
});

exports.SSIDPlugin = SSIDPlugin;
//# sourceMappingURL=plugin.cjs.js.map
