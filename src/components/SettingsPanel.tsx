"use client";

import { useState, useEffect } from "react";
import { X, Key, Check, AlertTriangle } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Card } from "./ui/Card";
import { cn } from "@/lib/utils";

interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
    const [key, setKey] = useState("");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("ott_tester_api_key");
        if (stored) setKey(stored);
    }, []);

    const handleSave = () => {
        if (key.trim()) {
            localStorage.setItem("ott_tester_api_key", key.trim());
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } else {
            localStorage.removeItem("ott_tester_api_key");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-slide-up">
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                        <Key className="w-4 h-4 text-accent" /> API Settings
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                        <p className="text-xs text-yellow-200/80">
                            This app uses <strong>Google Gemini Pro</strong>.
                            Your API Key is stored locally in your browser and used only for requests.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Gemini API Key</label>
                        <div className="flex gap-2">
                            <Input
                                type="password"
                                placeholder="sk-..."
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                className="bg-black/40"
                            />
                            <Button onClick={handleSave} className={cn("w-24", saved ? "bg-green-600 hover:bg-green-700" : "")}>
                                {saved ? <Check className="w-4 h-4" /> : "Save"}
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                            Don't have one? <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-primary hover:underline">Get it here</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
