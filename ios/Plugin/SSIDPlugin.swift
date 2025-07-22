
// ios/Plugin/SSIDPlugin.swift
import Foundation
import Capacitor
import NetworkExtension
import SystemConfiguration.CaptiveNetwork

@objc(SSIDPlugin)
public class SSIDPlugin: CAPPlugin {
    
    @objc func getCurrentSSID(_ call: CAPPluginCall) {
        DispatchQueue.global(qos: .userInitiated).async { [weak self] in
            guard let self = self else { return }
            
            let ssid = self.getConnectedSSID()
            
            DispatchQueue.main.async {
                call.resolve(["ssid": ssid as Any])
            }
        }
    }
    
    private func getConnectedSSID() -> String? {
        // iOS 14+ method using NEHotspotNetwork
        if #available(iOS 14.0, *) {
            return getSSIDiOS14()
        } else {
            // iOS 13 and below - deprecated but still works
            return getSSIDLegacy()
        }
    }
    
    @available(iOS 14.0, *)
    private func getSSIDiOS14() -> String? {
        // Note: This requires the app to have proper entitlements
        // and may require user to grant location permissions
        guard let interfaces = CNCopySupportedInterfaces() as? [String] else {
            return nil
        }
        
        for interface in interfaces {
            if let info = CNCopyCurrentNetworkInfo(interface as CFString) as? [String: Any],
               let ssid = info[kCNNetworkInfoKeySSID as String] as? String {
                return ssid
            }
        }
        
        return nil
    }
    
    private func getSSIDLegacy() -> String? {
        guard let interfaces = CNCopySupportedInterfaces() as? [String] else {
            return nil
        }
        
        for interface in interfaces {
            if let info = CNCopyCurrentNetworkInfo(interface as CFString) as? [String: Any],
               let ssid = info[kCNNetworkInfoKeySSID as String] as? String {
                return ssid
            }
        }
        
        return nil
    }
}   