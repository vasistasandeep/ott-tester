"use client";

import { Tv, History, LayoutTemplate, Settings, PlusCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

interface SidebarProps {
    className?: string;
    onSettingsClick?: () => void;
    mobileOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ className, onSettingsClick, mobileOpen = false, onClose }: SidebarProps) {
    const navItems = [
        { icon: PlusCircle, label: "New Test", active: true },
        { icon: History, label: "History", active: false },
        { icon: LayoutTemplate, label: "Templates", active: false },
    ];

    // Mobile overlay logic
    const baseClasses = "flex flex-col p-4 border-r border-white/10 bg-black/40 backdrop-blur-xl h-screen transition-all duration-300 z-40";
    const desktopClasses = `hidden md:flex w-64 ${className || ""}`;
    const mobileClasses = `fixed inset-y-0 left-0 w-64 md:hidden transform ${mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`;

    return (
        <>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm animate-fade-in" onClick={onClose} />
            )}

            <div className={cn(baseClasses, mobileOpen ? mobileClasses : desktopClasses)}>
                {/* Mobile Close Button */}
                <div className="md:hidden flex justify-end mb-4">
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Branding (Hidden on mobile if desired, or keep) */}
                <div className="flex items-center gap-2 mb-8 px-2">
                    <div className="p-2 rounded-lg bg-primary/20">
                        <Tv className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-bold text-lg tracking-wide text-white">OTT TESTER</span>
                </div>

                {/* Navigation */}
                <nav className="space-y-4 flex-1">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => {
                                // Only handle generic clicks here if needed
                                if (onClose) onClose(); // Close drawer on selection
                            }}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                                item.active
                                    ? "bg-primary/20 text-white shadow-lg shadow-primary/10 border border-primary/20"
                                    : "text-gray-300 hover:text-white hover:bg-white/10"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Footer Actions */}
                <div className="space-y-4 mb-2">
                    {/* Settings Button - Distinct */}
                    <button
                        onClick={() => {
                            if (onSettingsClick) onSettingsClick();
                            if (onClose) onClose();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                    >
                        <Settings className="w-5 h-5" />
                        Settings
                    </button>

                    {/* User Profile */}
                    <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center text-white font-bold text-xs">
                                QA
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-white">QA Engineer</span>
                                <span className="text-xs text-gray-400">SonyLIV Team</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
