'use client';

import { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Video,
    AlertCircle,
    Map as MapIcon,
    FileText,
    TrendingUp,
    ShieldAlert,
    TrendingDown,
    Activity
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [stats, setStats] = useState({
        totalViolations: 1284,
        totalFines: "64.2M",
        activeCams: 8422,
        unresolvedCases: 142
    });

    const mockFeeds = [
        { id: 'CAM-LHR-001', location: 'Mall Road', status: 'VIOLATION', severity: 'High', type: 'STRUCTURAL' },
        { id: 'CAM-LHR-042', location: 'Anarkali Bazaar', status: 'SCANNING', severity: 'None', type: 'IDLE' },
        { id: 'CAM-LHR-112', location: 'Liberty Market', status: 'VIOLATION', severity: 'Medium', type: 'SAFETY_GEAR' },
        { id: 'CAM-LHR-098', location: 'Gulberg Main', status: 'SCANNING', severity: 'None', type: 'IDLE' },
    ];

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-tech-cyan selection:text-black">
            {/* Sidebar Navigation */}
            <aside className="fixed left-0 top-0 h-full w-20 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col items-center py-8 gap-10 z-50">
                <Link href="/" className="w-12 h-12 rounded-xl bg-gradient-to-tr from-tech-cyan to-tech-purple flex items-center justify-center glow-cyan">
                    <ShieldAlert size={24} className="text-white" />
                </Link>

                <nav className="flex flex-col gap-6">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`p-3 rounded-xl border transition-all ${activeTab === 'dashboard' ? 'text-tech-cyan bg-tech-cyan/10 border-tech-cyan/20' : 'text-gray-500 border-transparent hover:text-white'}`}
                    >
                        <LayoutDashboard size={20} />
                    </button>
                    <button
                        onClick={() => setActiveTab('video')}
                        className={`p-3 rounded-xl border transition-all ${activeTab === 'video' ? 'text-tech-cyan bg-tech-cyan/10 border-tech-cyan/20' : 'text-gray-500 border-transparent hover:text-white'}`}
                    >
                        <Video size={20} />
                    </button>
                    <button
                        onClick={() => setActiveTab('map')}
                        className={`p-3 rounded-xl border transition-all ${activeTab === 'map' ? 'text-tech-cyan bg-tech-cyan/10 border-tech-cyan/20' : 'text-gray-500 border-transparent hover:text-white'}`}
                    >
                        <MapIcon size={20} />
                    </button>
                    <button
                        onClick={() => setActiveTab('tickets')}
                        className={`p-3 rounded-xl border transition-all ${activeTab === 'tickets' ? 'text-tech-cyan bg-tech-cyan/10 border-tech-cyan/20' : 'text-gray-500 border-transparent hover:text-white'}`}
                    >
                        <FileText size={20} />
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="ml-20 p-8">
                {/* Header */}
                <header className="flex justify-between items-end mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-tech-cyan mb-2">
                            <div className="w-2 h-2 rounded-full bg-tech-cyan animate-pulse"></div>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Punjab Safe City Command Center</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter">AI COMPLIANCE DASHBOARD</h1>
                    </div>

                    <div className="text-right">
                        <p className="text-2xl font-mono font-bold">{currentTime.toLocaleTimeString()}</p>
                        <p className="text-xs text-gray-500 font-mono">{currentTime.toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                </header>

                {/* KPI Grid */}
                <section className="grid grid-cols-4 gap-6 mb-10">
                    <KpiCard
                        title="Total Penalties"
                        value={`PKR ${stats.totalFines}`}
                        trend="+12% from prev. month"
                        icon={<TrendingUp className="text-green-400" size={16} />}
                    />
                    <KpiCard
                        title="Live Violations"
                        value={stats.totalViolations.toString()}
                        trend="Real-time detection active"
                        icon={<Activity className="text-tech-cyan" size={16} />}
                    />
                    <KpiCard
                        title="Connected Cameras"
                        value={stats.activeCams.toLocaleString()}
                        trend="PSCA Network Status: 98%"
                        icon={<Video className="text-purple-400" size={16} />}
                    />
                    <KpiCard
                        title="Audit Backlog"
                        value={stats.unresolvedCases.toString()}
                        trend="-4% efficiency gain"
                        icon={<TrendingDown className="text-tech-cyan" size={16} />}
                    />
                </section>

                <div className="grid grid-cols-3 gap-8">
                    {/* Live Feeds Grid */}
                    <div className="col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">CRITICAL SAFETY FEEDS</h2>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-[10px] font-bold border border-red-500/20">LIVE ALERTS</span>
                                <span className="px-3 py-1 bg-white/5 text-gray-400 rounded-full text-[10px] font-bold border border-white/10 underline">MULTI-VIEW</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {mockFeeds.map(feed => (
                                <div key={feed.id} className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group cursor-pointer hover:border-tech-cyan/50 transition-colors bg-gray-900">
                                    {/* Scan Line Animation */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tech-cyan to-transparent animate-scan-y z-10 opacity-50"></div>

                                    {/* Feed Content Placeholder */}
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544006659-f0b21884cb1d?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center grayscale contrast-125 opacity-40 group-hover:grayscale-0 transition-all duration-700"></div>

                                    {/* HUD Overlays */}
                                    <div className="absolute inset-0 p-4 flex flex-col justify-between z-20">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-[10px] font-mono text-cyan-400 opacity-70">{feed.id}</p>
                                                <p className="text-xs font-bold">{feed.location.toUpperCase()}</p>
                                            </div>
                                            <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${feed.status === 'VIOLATION' ? 'bg-red-600' : 'bg-green-600'
                                                }`}>
                                                {feed.status}
                                            </div>
                                        </div>

                                        {feed.status === 'VIOLATION' && (
                                            <div className="animate-in fade-in slide-in-from-bottom-2">
                                                <div className="bg-red-600/90 backdrop-blur-md p-2 rounded-lg border border-red-400/50">
                                                    <p className="text-[10px] font-black uppercase mb-1">Alert: {feed.type}</p>
                                                    <p className="text-[9px] text-red-100 opacity-80 leading-tight">Severity: {feed.severity} - Automatic Ticket Dispatched</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Corner Accents */}
                                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/20"></div>
                                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/20"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Log */}
                    <aside className="glass-premium rounded-3xl border border-white/5 p-6 h-[600px] flex flex-col">
                        <div className="flex items-center gap-2 mb-6">
                            <Activity size={18} className="text-tech-cyan" />
                            <h2 className="text-lg font-bold">REAL-TIME AUDIT LOG</h2>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar text-[11px] font-mono">
                            <LogEntry time="20:54:12" msg="Structural integrity check: Mall Rd Bridge - PASSED" type="SUCCESS" />
                            <LogEntry time="20:54:08" msg="VIOLATION DETECTED: Illegal Encroachment - GULBERG-V" type="DANGER" />
                            <LogEntry time="20:53:45" msg="Sovereign Engine: ApexGov Vision-v2 processing frame 84,221" type="INFO" />
                            <LogEntry time="20:49:12" msg="Automatic Citation #5422 generated for fire hazard" type="DANGER" />
                            <LogEntry time="20:45:00" msg="Cam-LHR-09 connected to Safe City Infrastructure" type="INFO" />
                            <LogEntry time="20:42:15" msg="Night-vision mode enabled for Sector 5" type="INFO" />
                            <LogEntry time="20:38:12" msg="SCAN COMPLETE: Liberty Market - No violations found" type="SUCCESS" />
                            {/* Keep adding mock entries if needed */}
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5">
                            <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-gray-400 rounded-xl text-xs font-bold border border-white/10 transition-all uppercase tracking-widest">
                                Export Full Audit Trail
                            </button>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

function KpiCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: any }) {
    return (
        <div className="glass-premium p-6 rounded-3xl border border-white/5 hover:border-tech-cyan/20 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{title}</p>
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-tech-cyan/10 group-hover:text-tech-cyan transition-all">
                    {icon}
                </div>
            </div>
            <p className="text-3xl font-black mb-1">{value}</p>
            <p className="text-[10px] text-gray-400 font-mono italic">{trend}</p>
        </div>
    );
}

function LogEntry({ time, msg, type }: { time: string, msg: string, type: 'SUCCESS' | 'DANGER' | 'INFO' }) {
    const colors = {
        SUCCESS: 'text-green-500',
        DANGER: 'text-red-500',
        INFO: 'text-tech-cyan opacity-60'
    };

    return (
        <div className="p-2 border-b border-white/5 hover:bg-white/5 transition-colors group">
            <span className="text-gray-600 mr-2">[{time}]</span>
            <span className={`${colors[type]} leading-relaxed`}>{msg}</span>
        </div>
    );
}
