"use client";

import { Tv, History, LayoutTemplate, Settings, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

interface SidebarProps {
    className?: string;
    onSettingsClick?: () => void;
}

export function Sidebar({ className, onSettingsClick }: SidebarProps) {
    const navItems = [
        { icon: PlusCircle, label: "New Test", active: true },
        { icon: History, label: "History", active: false },
        { icon: LayoutTemplate, label: "Templates", active: false },
        { icon: Settings, label: "Settings", active: false },
    ];

    return (
        <div className={cn("w-64 h-screen border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col p-4", className)}>
            {/* Branding */}
            <div className="flex items-center gap-2 mb-8 px-2">
                <div className="p-2 rounded-lg bg-primary/20">
                    <Tv className="w-5 h-5 text-primary" />
                </div>
                <span className="font-bold text-lg tracking-wide text-white">OTT TESTER</span>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => {
                            if (item.label === "Settings" && onSettingsClick) onSettingsClick();
                        }}
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                            item.active
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* Footer User Profile (Mock) */}
            <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-primary"></div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-white">QA Engineer</span>
                        <span className="text-[10px] text-gray-500">SonyLIV Team</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
