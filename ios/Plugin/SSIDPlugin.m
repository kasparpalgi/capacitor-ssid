// ios/Plugin/SSIDPlugin.m
#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(SSIDPlugin, "SSIDPlugin",
           CAP_PLUGIN_METHOD(getCurrentSSID, CAPPluginReturnPromise);
)