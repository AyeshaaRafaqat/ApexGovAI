'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { analyzeImageWithRAG } from '@/app/actions/analyze-rag';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

// NUCLEAR OPTION: Import with NO SSR to completely bypass hydration
const ImageUploader = dynamic(
  () => import('@/components/features/Camera/ImageUploader').then(mod => ({ default: mod.ImageUploader })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    )
  }
);

const ReportView = dynamic(
  () => import('@/components/features/Report/ReportView').then(mod => ({ default: mod.ReportView })),
  { ssr: false }
);

import { apexAudio } from '@/lib/audio';

export type ReportData = {
  issues: {
    title: string;
    description: string;
    severity: 'High' | 'Medium' | 'Low';
    regulationHint: string;
    fineAmount?: number;
  }[];
  confidenceScore: number;
  summaryUrdu: string;
  isAuthenticEvidence: boolean;
  authenticityReasoning?: string;
};

export default function Home() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageSelect = async (base64: string, location: any) => {
    setIsAnalyzing(true);

    try {
      const result = await analyzeImageWithRAG(base64);

      if (result.success && result.data) {
        setReport(result.data as ReportData);
        apexAudio?.playSuccess();
      } else {
        alert('Analysis failed. Please try again.');
        setReport(null);
      }
    } catch (e: any) {
      console.error(e);
      alert(`Analysis failed: ${e.message || JSON.stringify(e)}`);
      setReport(null);
    }

    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setReport(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white selection:bg-blue-500/30">

      {/* Gov Shortcut */}
      <Link
        href="/dashboard"
        className="fixed top-6 right-6 z-50 flex items-center gap-2 glass-premium px-4 py-2 rounded-full border border-white/10 hover:border-tech-cyan/50 hover:bg-tech-cyan/10 transition-all text-[10px] font-black tracking-widest uppercase group"
      >
        <LayoutDashboard size={14} className="group-hover:rotate-12 transition-transform" suppressHydrationWarning />
        Government Access
      </Link>

      {/* Title only visible on initial screen */}
      {!report && !isAnalyzing && (
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mb-2 tracking-tighter">
            ApexGov.AI
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xs mx-auto">
            Autonomous Building Safety Inspector & Compliance Agent
          </p>
        </div>
      )}

      <div className="w-full max-w-md">
        {!report ? (
          <ImageUploader
            onImageSelect={handleImageSelect}
            isAnalyzing={isAnalyzing}
          />
        ) : (
          <ReportView
            data={report}
            onReset={handleReset}
          />
        )}
      </div>
    </main>
  );
}
