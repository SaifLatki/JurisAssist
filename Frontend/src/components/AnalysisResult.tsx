import { useState } from "react";
import {
  FileText,
  AlertTriangle,
  Lightbulb,
  ClipboardCheck,
  FileCode,
  RotateCcw,
} from "lucide-react";
import { AnalysisResult } from "../types";

interface AnalysisResultsProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

type TabType = "summary" | "legal_points" | "risks" | "advice" | "template";

export default function AnalysisResults({
  result,
  onNewAnalysis,
}: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("summary");

  const tabs = [
    { id: "summary" as TabType, label: "Summary", icon: FileText },
    { id: "legal_points" as TabType, label: "Legal Points", icon: ClipboardCheck },
    { id: "risks" as TabType, label: "Risks", icon: AlertTriangle },
    { id: "advice" as TabType, label: "Advice", icon: Lightbulb },
    { id: "template" as TabType, label: "Template", icon: FileCode },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-[#00C2FF]/10 overflow-hidden">

        {/* Tabs */}
        <div className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-all whitespace-nowrap
                    ${
                      activeTab === tab.id
                        ? "text-white bg-gradient-to-r from-[#00C2FF]/20 to-[#00FF88]/20 border-b-2 border-[#00FF88]"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8 text-white">

          {activeTab === "summary" && (
            <div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Summary
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {result.summary}
              </p>
            </div>
          )}

          {activeTab === "legal_points" && (
            <div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Key Legal Points
              </h2>
              <ul className="space-y-4">
                {result.legal_points.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#00C2FF] to-[#00FF88] text-white rounded-full flex items-center justify-center font-bold shadow-md shadow-[#00C2FF]/30">
                      {index + 1}
                    </span>
                    <p className="text-gray-300 leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "risks" && (
            <div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Risk Alerts
              </h2>
              <div className="space-y-4">
                {result.risks.map((risk, index) => (
                  <div
                    key={index}
                    className="bg-red-500/10 border-l-4 border-red-400 p-5 rounded-xl text-gray-200"
                  >
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-6 w-6 text-red-400 mt-0.5" />
                      <p className="leading-relaxed">{risk}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "advice" && (
            <div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Recommended Steps
              </h2>
              <ol className="space-y-4">
                {result.advice.map((step, index) => (
                  <li
                    key={index}
                    className="bg-green-500/10 border-l-4 border-green-400 p-5 rounded-xl"
                  >
                    <div className="flex items-start space-x-4">
                      <span className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold shadow-md">
                        {index + 1}
                      </span>
                      <p className="text-gray-300 leading-relaxed">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {activeTab === "template" && (
            <div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Template / Sample Clause
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <pre className="text-gray-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {result.template}
                </pre>
              </div>

              <button
                onClick={() => navigator.clipboard.writeText(result.template)}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-[#00C2FF] to-[#00FF88] text-white rounded-xl font-semibold shadow-lg shadow-[#00C2FF]/30 hover:opacity-90 transition-all"
              >
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 bg-white/5 backdrop-blur-xl px-8 py-5 flex justify-end">
          <button
            onClick={onNewAnalysis}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#00C2FF] to-[#00FF88] text-white rounded-xl font-semibold shadow-lg shadow-[#00C2FF]/30 hover:opacity-90 transition-all"
          >
            <RotateCcw className="h-5 w-5" />
            <span>New Analysis</span>
          </button>
        </div>
      </div>
    </div>
  );
}
