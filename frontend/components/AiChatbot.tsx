"use client";

import { useState } from "react";
import { useAskAIMutation } from "@/services/api";
import { Sparkles } from "lucide-react";

export default function AIChatBox() {
  const [question, setQuestion] = useState("");
  const [askAI, { data, isLoading }] = useAskAIMutation();

  const handleAsk = async () => {
    if (!question.trim()) return;
    await askAI({ question });
  };

  return (
    <div className="bg-white p-6 rounded-sm shadow-md border border-gray-200 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold flex items-center gap-2 text-indigo-700">
        <Sparkles className="w-5 h-5" />
        Ask AI a Question
      </h2>

      <textarea
        className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        rows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
      />

      <button
        onClick={handleAsk}
        disabled={isLoading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md text-sm transition"
      >
        {isLoading ? "Thinking..." : "Ask"}
      </button>

      {data?.answer && (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-sm text-gray-800">
          <strong className="text-indigo-600">AI:</strong> {data.answer}
        </div>
      )}
    </div>
  );
}
