"use client";

import { useState } from "react";
import ResumeInput from "@/components/ResumeInput";
import { getJobMatches } from "@/lib/ai";
import { formatGeminiOutput } from "@/lib/format";
import { useHistory } from "@/lib/useHistory";
import { Clock, Search, Briefcase, Rocket, Palette, Code, Database, Layout, Zap, RefreshCw, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { history, saveSession, clearHistory } = useHistory();

  const handleSubmit = async (resume: string, category: string) => {
    setLoading(true);
    setMatches("");

    try {
      const result = await getJobMatches(resume, category);
      setMatches(result);
      saveSession({ resume, category, result });
      setOpenModal(true);
    } catch (err) {
      console.error("Failed to get matches:", err);
      setMatches("❌ Error generating matches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header with retro-modern vibe */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-3 flex items-center justify-center gap-3">
            JobLens
            <Rocket className="w-8 h-8 text-purple-500" />
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Paste your resume and let&rsquo;s find your <span className="text-purple-600">dream job</span>
          </p>
        </div>

        {/* Input area with retro-modern card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-200 to-purple-200 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          <div className="relative bg-white rounded-xl border-2 border-purple-100 p-6 mb-8 shadow-[0_4px_20px_rgba(192,132,252,0.2)] hover:shadow-[0_6px_24px_rgba(192,132,252,0.3)] transition-all">
            <ResumeInput onSubmit={handleSubmit} />
          </div>
        </div>

        {/* Loading state with cute animation */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-purple-100 shadow-sm">
            <div className="relative mb-5">
              <div className="w-14 h-14 border-4 border-pink-200 rounded-full animate-pulse"></div>
              <Zap className="w-8 h-8 text-pink-500 absolute top-3 left-3 animate-bounce" />
            </div>
            <p className="text-lg font-medium text-gray-700">Scanning your skills...</p>
            <p className="text-sm text-gray-500 mt-1">Our AI is working its magic</p>
          </div>
        )}

        {/* Results Modal - Center stage */}
        <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
          {matches && (
            <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
              <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border-2 border-pink-100 shadow-2xl animate-pop-in">
                <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-pink-500 p-4">
                  <div className="flex justify-between items-center">
                    <Dialog.Title className="text-xl font-bold text-white flex items-center gap-3">
                      <Briefcase className="w-5 h-5" />
                      Your Perfect Matches
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button className="p-1 rounded-full hover:bg-pink-600 transition-colors text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </Dialog.Close>
                  </div>
                </div>
                <div 
                  className="p-6 prose prose-pink max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: formatGeminiOutput(matches)
                      .replace(/🌟/g, '🌟 ')
                      .replace(/📌/g, '📌 ')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-purple-600">$1</strong>')
                  }}
                />
                <div className="sticky bottom-0 bg-gradient-to-t from-white to-white/80 p-4 border-t-2 border-pink-100">
                  <button 
                    onClick={() => setOpenModal(false)}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Search className="w-5 h-5" />
                    Let&rsquo;s explore more
                  </button>
                </div>
              </div>
            </Dialog.Content>
          )}
        </Dialog.Root>

        {/* History Section with "View All" interaction */}
        {history.length > 0 && (
          <div className="mt-14">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Clock className="w-6 h-6 text-purple-500" />
                Your Match History
              </h3>
              <button 
                onClick={clearHistory}
                className="text-sm font-medium text-pink-500 hover:text-pink-600 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Clear All
              </button>
            </div>
            
            <div className="grid gap-4">
              {history.slice(0, 3).map((item) => (
                <Dialog.Root key={item.id}>
                  <Dialog.Trigger asChild>
                    <div className="group relative cursor-pointer">
                      <div className="absolute -inset-1 bg-pink-100/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative bg-white rounded-xl border-2 border-purple-100 p-5 group-hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
                            {getCategoryIcon(item.category)} {item.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="prose-sm prose-pink max-w-none line-clamp-2">
                          {formatGeminiOutput(item.result)
                            .replace(/<[^>]*>?/gm, '')
                            .replace(/🌟/g, '🌟 ')
                            .replace(/📌/g, '📌 ')}
                        </div>
                        <button className="mt-3 text-sm text-purple-600 hover:text-purple-800 flex items-center gap-2 transition-colors">
                          <Search className="w-4 h-4" />
                          View full results
                        </button>
                      </div>
                    </div>
                  </Dialog.Trigger>
                  <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border-2 border-pink-100 shadow-2xl">
                      <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-pink-500 p-4">
                        <div className="flex justify-between items-center">
                          <Dialog.Title className="text-xl font-bold text-white flex items-center gap-3">
                            {getCategoryIcon(item.category, "w-5 h-5 text-white")}
                            {item.category} Match
                          </Dialog.Title>
                          <Dialog.Close asChild>
                            <button className="p-1 rounded-full hover:bg-pink-600 transition-colors text-white">
                              <X className="w-5 h-5" />
                            </button>
                          </Dialog.Close>
                        </div>
                        <div className="text-xs text-purple-100 mt-1">
                          {new Date(item.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div 
                        className="p-6 prose prose-pink max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: formatGeminiOutput(item.result)
                            .replace(/🌟/g, '🌟 ')
                            .replace(/📌/g, '📌 ')
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-purple-600">$1</strong>')
                        }}
                      />
                      <div className="sticky bottom-0 bg-gradient-to-t from-white to-white/80 p-4 border-t-2 border-pink-100">
                        <Dialog.Close asChild>
                          <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                            Close and go back
                          </button>
                        </Dialog.Close>
                      </div>
                    </div>
                  </Dialog.Content>
                </Dialog.Root>
              ))}
              
              {history.length > 3 && (
                <button className="w-full py-3 bg-white border-2 border-purple-200 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 mt-4">
                  View All {history.length} Matches
                </button>
              )}
            </div>
          </div>
        )}

        {/* Playful Footer */}
        <footer className="mt-16 pt-8 border-t-2 border-purple-100 text-center text-sm text-gray-500">
          <p>Made with 💖 for Gen Z job seekers</p>
          <p className="mt-1">© {new Date().getFullYear()} JobLens • All rights reserved</p>
        </footer>
      </div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes pop-in {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.2s ease-out forwards;
        }
      `}</style>
    </main>
  );
}

function getCategoryIcon(category: string, className = "w-3 h-3") {
  switch(category) {
    case 'frontend':
      return <Code className={`${className} mr-1`} />;
    case 'backend':
      return <Database className={`${className} mr-1`} />;
    case 'design':
      return <Palette className={`${className} mr-1`} />;
    case 'product':
      return <Layout className={`${className} mr-1`} />;
    default:
      return <Briefcase className={`${className} mr-1`} />;
  }
}