"use client";

import { cn } from "@/lib/utils";
import { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { generateTestCases, GenerationResult } from "@/lib/engine";
import { ResultsTable } from "@/components/ResultsTable";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { UploadZone } from "@/components/UploadZone";
import { SettingsPanel } from "@/components/SettingsPanel";
import { exportToCSV } from "@/lib/export";
import { Sparkles, Layers, FileText, Map, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { toast } from "sonner";

type Tab = "cases" | "scenarios" | "plan";

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GenerationResult | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("cases");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  // Check for API Key on mount and when settings close
  useEffect(() => {
    setHasApiKey(!!localStorage.getItem("ott_tester_api_key"));
  }, [isSettingsOpen]);

  const handleGenerate = async () => {
    if (!query && !uploadedFile) {
      toast.error("Please describe a feature or upload a file.");
      return;
    }

    setLoading(true);
    setResults(null);

    // Optimistic UI for AI mode
    const toastId = hasApiKey ? toast.loading("AI is thinking...") : toast.loading("Generating mock data...");

    try {
      const data = await generateTestCases(query);
      setResults(data);
      toast.success("Coverage generated successfully!", { id: toastId });
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Generation Failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleGenerate();
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex overflow-hidden">
      {/* Settings Modal */}
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Sidebar (Responsive) */}
      <Sidebar
        className="flex-shrink-0"
        onSettingsClick={() => setIsSettingsOpen(true)}
        mobileOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Navbar (New) */}
        <Navbar
          onMenuClick={() => setIsSidebarOpen(true)}
          onSettingsClick={() => setIsSettingsOpen(true)}
          hasApiKey={hasApiKey}
        />

        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-50" />

        {/* Main Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* Header Title Only */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-white">New Verification Task</h1>
              <p className="text-muted-foreground text-sm">Describe your feature or upload a PRD to generate coverage.</p>
            </div>

            {/* Input Section (Grid) */}
            <div className="grid md:grid-cols-12 gap-6 items-start">
              {/* Left: Inputs */}
              <div className="md:col-span-4 space-y-6">
                <Card className="p-1">
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 ml-1">Feature Description</label>
                      <div className="relative">
                        <Input
                          className="bg-black/40 border-white/10 h-12"
                          placeholder="e.g. 'Live Sports Ad Insertion'"
                          value={query}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 ml-1">Upload Docs (Optional)</label>
                      <UploadZone onFileSelect={setUploadedFile} />
                    </div>

                    <Button
                      className="w-full h-12 text-base shadow-lg shadow-primary/20"
                      onClick={handleGenerate}
                      loading={loading}
                    >
                      {loading ? "Analyzing..." : <><Sparkles className="w-4 h-4 mr-2" /> Generate Coverage</>}
                    </Button>
                  </CardContent>
                </Card>

                {/* Tips */}
                {!results && (
                  <div className="p-4 rounded-lg border border-dashed border-white/10 bg-white/5 text-sm text-gray-400">
                    <p className="font-semibold text-gray-300 mb-2">Try asking for:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>"SSAI Ad Tracking"</li>
                      <li>"Offline Download Flow"</li>
                      <li>"Login Throttling Security"</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Right: Results Dashboard */}
              <div className="md:col-span-8 min-h-[500px]">
                {results ? (
                  <div className="space-y-6 animate-fade-in">

                    {/* Tabs */}
                    <div className="flex items-center gap-2 border-b border-white/10 pb-1">
                      {[
                        { id: "cases", label: "Test Cases", icon: Layers, count: results.testCases.length },
                        { id: "scenarios", label: "User Scenarios", icon: Map, count: results.scenarios.length },
                        { id: "plan", label: "Test Plan", icon: FileText, count: 1 },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as Tab)}
                          className={cn(
                            "px-4 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2 transition-all relative top-[1px]",
                            activeTab === tab.id
                              ? "text-white border-b-2 border-primary bg-white/5"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          )}
                        >
                          <tab.icon className="w-4 h-4" />
                          {tab.label}
                          <span className="ml-1 text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{tab.count}</span>
                        </button>
                      ))}
                      <div className="flex-1" />
                    </div>

                    {/* Mock Data Warning */}
                    {!hasApiKey && results && (
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-center gap-3 text-sm text-yellow-500 mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span>
                          <strong>Using Static Mock Data.</strong> To generate real test cases for "<em>{query}</em>", please <button onClick={() => setIsSettingsOpen(true)} className="underline hover:text-yellow-400">connect your API Key</button>.
                        </span>
                      </div>
                    )}

                    {/* Tab Content */}
                    <div className="min-h-[400px]">
                      {activeTab === "cases" && (
                        <div className="space-y-4">
                          <ResultsTable data={results.testCases} />

                          {/* Export Button (After Cases) */}
                          <div className="flex justify-end pt-4 border-t border-white/10">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => exportToCSV(results.testCases)}
                              className="gap-2"
                            >
                              <Download className="w-4 h-4" /> Download CSV
                            </Button>
                          </div>
                        </div>
                      )}

                      {activeTab === "scenarios" && (
                        <div className="space-y-4 animate-slide-up">
                          {results.scenarios.map((scn) => (
                            <Card key={scn.id} className="border border-white/10 bg-black/20">
                              <CardContent className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">{scn.id}</span>
                                    <h3 className="text-lg font-semibold text-white mt-2">{scn.title}</h3>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-400 mb-4">{scn.description}</p>
                                <div className="space-y-2">
                                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">User Journey</p>
                                  <div className="flex flex-col gap-2">
                                    {scn.userJourney.map((step, i) => (
                                      <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                        <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs text-gray-500 shrink-0">{i + 1}</span>
                                        {step}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      {activeTab === "plan" && (
                        <Card className="border border-white/10 bg-black/20 animate-slide-up">
                          <CardContent className="p-6 space-y-6">
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-2">Testing Strategy</h3>
                              <p className="text-sm text-gray-400 leading-relaxed">{results.plan.strategy}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-sm font-medium text-white mb-2">Scope</h4>
                                <p className="text-sm text-gray-400">{results.plan.scope}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-white mb-2">Recommended Tools</h4>
                                <div className="flex flex-wrap gap-2">
                                  {results.plan.tools.map(tool => (
                                    <span key={tool} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                  </div>
                ) : (
                  /* Empty State placeholder for Right side */
                  <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-xl bg-white/[0.02] p-8 text-center">
                    <Layers className="w-16 h-16 text-white/5 mb-4" />
                    <h3 className="text-lg font-medium text-white/20">Coverage Results will appear here</h3>
                    <p className="text-sm text-white/10 mt-2">Generate a test plan to see details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
