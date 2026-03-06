"use client";

import DemoShell from "./DemoShell";
import { getMockData } from "@/lib/mockAPI";

// 1. Define the specific shape of the data for this demo
interface TemplateData {
  status: string;
  result: string;
  timestamp: string;
}

// 2. Define the hardcoded mock payload
const TEMPLATE_MOCK_DATA: TemplateData = {
  status: "success",
  result: "This is a pre-written template result to simulate data processing.",
  timestamp: new Date().toISOString(),
};

export default function TemplateDemo() {
  // 3. Define the fetcher function triggering the mock API util
  const fetchDemoData = async () => {
    return getMockData<TemplateData>({
      id: "template-demo",
      shouldError: false, // Toggle to true to see the DemoShell error state
      delayMs: 1500,
      mockResponse: TEMPLATE_MOCK_DATA,
    });
  };

  // 4. Wrap your UI in the DemoShell, consuming the simulated data
  return (
    <DemoShell title="Template Project" fetchData={fetchDemoData}>
      {(data) => (
        <div className="mx-auto max-w-4xl p-8 pt-12">
          {/* Your project specific UI goes here */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <h2 className="text-xl font-semibold mb-4 text-foreground/90">Simulated Results</h2>
            {data && (
              <div className="space-y-4 font-mono text-sm opacity-80">
                <p><span className="text-accent">Status:</span> {data.status}</p>
                <p><span className="text-accent">Timestamp:</span> {new Date(data.timestamp).toLocaleString()}</p>
                <div className="mt-6 p-4 rounded-lg bg-black/20 border border-white/5">
                  <p className="text-muted-foreground">{data.result}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </DemoShell>
  );
}
