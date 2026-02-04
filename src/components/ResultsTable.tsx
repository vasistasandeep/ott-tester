"use client";

import { TestCase } from "@/lib/engine";
import { Card, CardContent } from "@/components/ui/Card";
import { CheckCircle2, ShieldAlert, MonitorPlay, Zap, Bug, Globe } from "lucide-react";

interface ResultsTableProps {
    data: TestCase[];
}

export function ResultsTable({ data }: ResultsTableProps) {
    if (!data || data.length === 0) return null;

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "Functional": return <CheckCircle2 className="text-green-400 w-4 h-4" />;
            case "Security": return <ShieldAlert className="text-red-400 w-4 h-4" />;
            case "Performance": return <Zap className="text-yellow-400 w-4 h-4" />;
            case "Edge": return <Bug className="text-orange-400 w-4 h-4" />;
            case "UX": return <MonitorPlay className="text-blue-400 w-4 h-4" />;
            default: return <Globe className="text-gray-400 w-4 h-4" />;
        }
    };

    return (
        <div className="grid gap-4 animate-slide-up">
            {data.map((tc, idx) => (
                <Card key={tc.id} className="border-l-4 border-l-primary/50 overflow-hidden hover:bg-white/5 transition-colors">
                    <CardContent className="p-4 grid md:grid-cols-12 gap-4 items-center">

                        {/* ID & Priority */}
                        <div className="md:col-span-2 flex flex-col">
                            <span className="text-xs text-muted-foreground font-mono">{tc.id}</span>
                            <span className={`text-xs font-bold w-fit px-2 py-0.5 rounded ${tc.priority === "P0" ? "bg-red-500/20 text-red-500" :
                                    tc.priority === "P1" ? "bg-yellow-500/20 text-yellow-500" : "bg-blue-500/20 text-blue-500"
                                }`}>
                                {tc.priority}
                            </span>
                        </div>

                        {/* Title & Platform */}
                        <div className="md:col-span-4">
                            <h4 className="font-semibold text-white flex items-center gap-2">
                                {getTypeIcon(tc.type)}
                                {tc.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                Platform: <span className="text-foreground">{tc.platform}</span>
                            </p>
                        </div>

                        {/* Steps & Expected */}
                        <div className="md:col-span-5 text-sm text-gray-300">
                            <p className="line-clamp-2"><span className="text-muted-foreground">Expect:</span> {tc.expectedResult}</p>
                            <p className="text-xs text-muted-foreground mt-1 truncate">
                                Step 1: {tc.steps[0]}...
                            </p>
                        </div>

                        {/* Automation */}
                        <div className="md:col-span-1 flex justify-end">
                            <div className={`p-2 rounded-full ${tc.auto ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"}`} title={tc.auto ? "Automated" : "Manual"}>
                                {tc.auto ? <Zap className="w-4 h-4" /> : <div className="text-[10px] font-bold">MAN</div>}
                            </div>
                        </div>

                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
