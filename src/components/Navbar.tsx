"use client";

import { Menu, Settings, Tv } from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

interface NavbarProps {
    onMenuClick: () => void;
    onSettingsClick: () => void;
    hasApiKey: boolean;
}

export function Navbar({ onMenuClick, onSettingsClick, hasApiKey }: NavbarProps) {
    return (
        <div className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between px-4 sticky top-0 z-50">
            {/* Left: Menu & Brand */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden text-gray-400 hover:text-white"
                    onClick={onMenuClick}
                >
                    <Menu className="w-6 h-6" />
                </Button>

                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/20">
                        <Tv className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-bold text-lg tracking-wide text-white hidden sm:block">OTT TESTER</span>
                </div>
            </div>

            {/* Right: Status & Actions */}
            <div className="flex items-center gap-4">
                {/* Status Badge */}
                <div className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5",
                    hasApiKey ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                )}>
                    <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", hasApiKey ? "bg-green-500" : "bg-yellow-500")} />
                    {hasApiKey ? "AI Connected" : "Mock Mode"}
                </div>

                {/* Settings Shortcut */}
                <Button variant="ghost" size="sm" onClick={onSettingsClick} className="text-gray-400 hover:text-white">
                    <Settings className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}
