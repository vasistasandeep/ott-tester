
export interface TestCase {
    id: string;
    title: string;
    platform: string;
    preconditions: string;
    steps: string[];
    expectedResult: string;
    type: "Functional" | "Negative" | "Edge" | "Performance" | "Security" | "UX";
    auto: boolean;
    priority: "P0" | "P1" | "P2";
}

export interface TestScenario {
    id: string;
    title: string;
    description: string;
    userJourney: string[];
}

export interface TestPlan {
    strategy: string;
    scope: string;
    tools: string[];
}

export interface GenerationResult {
    testCases: TestCase[];
    scenarios: TestScenario[];
    plan: TestPlan;
}

export async function generateTestCases(input: string): Promise<GenerationResult> {

    // 1. Check for API Key (Client-side retrieval)
    const apiKey = typeof window !== "undefined" ? localStorage.getItem("ott_tester_api_key") : null;

    if (apiKey) {
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: input, apiKey }),
            });

            if (!response.ok) throw new Error("AI Generation Failed");

            const data = await response.json();
            return data as GenerationResult;

        } catch (error) {
            console.error("Falling back to mock engine due to error:", error);
            // Fallthrough to mock logic below
        }
    }

    // 2. Mock Logic (Fallback)
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulating AI processing
    const keyword = input.toLowerCase();

    // Base Data
    let testCases: TestCase[] = [];
    let scenarios: TestScenario[] = [];
    let plan: TestPlan = {
        strategy: "Standard Agile Testing",
        scope: "Functional & UI coverage",
        tools: ["Selenium", "Appium"]
    };

    if (keyword.includes("live") || keyword.includes("sport") || keyword.includes("cricket")) {
        testCases = [
            {
                id: "FE-LIVE-001",
                title: "Live Playback Start & Latency",
                platform: "All (Web, Mob, TV)",
                preconditions: "User logged in, Event active",
                steps: ["Navigate to Sports", "Click Watch Live", "Measure TTFF"],
                expectedResult: "Player loads < 2s. LIVE badge visible. Scrubber at live edge.",
                type: "Functional",
                auto: true,
                priority: "P0",
            },
            {
                id: "BE-LIVE-002",
                title: "Concurrency Enforcement",
                platform: "Backend",
                preconditions: "Max sessions active",
                steps: ["Start Stream A", "Start Stream B", "Start Stream C"],
                expectedResult: "Stream C blocked (403).",
                type: "Security",
                auto: true,
                priority: "P0",
            }
        ];
        scenarios = [
            {
                id: "SCN-LIVE-01",
                title: "User Watches Live Match on Train (Unstable N/W)",
                description: "Verify ABR behavior and recovery during connectivity drops.",
                userJourney: ["User opens match on 4G", "Train enters tunnel (No Net)", "Network restores (Edge)", "Network restores (4G)"]
            }
        ];
        plan = {
            strategy: "Latency-focused performance testing with chaos engineering.",
            scope: "Player Core, Ad Insertion, DRM, Analytics",
            tools: ["Charles Proxy", "Network Throttler", "Appium"]
        };
    } else if (keyword.includes("login") || keyword.includes("auth")) {
        testCases = [
            {
                id: "FE-AUTH-001",
                title: "Valid Login Flow",
                platform: "All",
                preconditions: "Valid credentials",
                steps: ["Enter email/pass", "Click Login"],
                expectedResult: "Redirect to Home, Token stored.",
                type: "Functional",
                auto: true,
                priority: "P0",
            }
        ];
    } else {
        // Generic Fallback
        testCases = [
            {
                id: "GEN-001",
                title: "App Launch Cold Start",
                platform: "All",
                preconditions: "-",
                steps: ["Kill App", "Launch"],
                expectedResult: "Home screen interactive < 3s",
                type: "Performance",
                auto: true,
                priority: "P1",
            }
        ];
        scenarios = [
            {
                id: "SCN-GEN-01",
                title: "First Time User Onboarding",
                description: "Ensure smooth sign-up and personalization flow.",
                userJourney: ["Install App", "Open", "Select Languages", "Create Account"]
            }
        ];
    }

    return { testCases, scenarios, plan };
}
