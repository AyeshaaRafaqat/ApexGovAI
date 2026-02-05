'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Loader2 } from 'lucide-react';

interface TicketGeneratorProps {
    reportData: {
        issues: {
            title: string;
            description: string;
            severity: string;
            regulationHint: string;
            fineAmount?: number;
        }[];
        confidenceScore: number;
        summaryUrdu: string;
    };
}

export function TicketGenerator({ reportData }: TicketGeneratorProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [genStatus, setGenStatus] = useState('');

    // Calculate total fine
    const totalFine = reportData.issues.reduce((sum, issue) => sum + (issue.fineAmount || 0), 0);

    const generatePDF = async () => {
        setIsGenerating(true);
        // Dynamic import to avoid SSR issues with html2pdf.js
        const html2pdf = (await import('html2pdf.js')).default;

        const element = document.getElementById('official-ticket');
        if (!element) return;
        const opt = {
            margin: 0,
            filename: `ApexGov-Violation-${Date.now()}.pdf`,
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
        };

        try {
            await html2pdf().set(opt).from(element).save();
        } catch (e) {
            console.error('PDF Generation failed', e);
            alert('Could not generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const ticketId = `TKT-${Math.floor(Math.random() * 1000000)}`;
    const dateStr = new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    return (
        <>
            <button
                onClick={generatePDF}
                disabled={isGenerating}
                className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg shadow-red-500/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isGenerating ? <Loader2 className="animate-spin" /> : <Download size={20} />}
                {isGenerating ? 'Printing Ticket...' : 'Download Official Ticket'}
            </button>

            {/* Hidden Ticket Template */}
            <div className="absolute top-[-10000px] left-[-10000px]">
                {/* FORCED COMPATIBILITY: Using explicit hex codes (style) to avoid Tailwind v4 'lab' color issues with html2canvas */}
                <div id="official-ticket" style={{ width: '210mm', minHeight: '297mm', backgroundColor: '#ffffff', color: '#000000', padding: '40px', fontFamily: 'Arial, sans-serif', position: 'relative' }}>

                    {/* Watermark */}
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.03, pointerEvents: 'none' }}>
                        <h1 style={{ fontSize: '150px', fontWeight: 900, transform: 'rotate(-45deg)' }}>PUNJAB GOV</h1>
                    </div>

                    {/* Header */}
                    <div style={{ borderBottom: '4px solid #000000', paddingBottom: '24px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ fontSize: '36px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.025em' }}>Violation Ticket</h1>
                            <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#4B5563', marginTop: '8px' }}>Punjab Building Safety & Regulation Authority</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <QRCodeSVG value={`https://rescue.gov.pk/ticket/${ticketId}`} size={100} />
                            <p style={{ fontSize: '12px', fontFamily: 'monospace', marginTop: '8px' }}>{ticketId}</p>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginBottom: '32px', fontSize: '14px' }}>
                        <div>
                            <p style={{ fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', fontSize: '12px' }}>Date of Inspection</p>
                            <p style={{ fontSize: '18px', fontWeight: 500 }}>{dateStr}</p>
                        </div>
                        <div>
                            <p style={{ fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', fontSize: '12px' }}>Inspector ID</p>
                            <p style={{ fontSize: '18px', fontWeight: 500 }}>AI-AGENT-007 (ApexGov)</p>
                        </div>
                        <div>
                            <p style={{ fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', fontSize: '12px' }}>Location</p>
                            <p style={{ fontSize: '18px', fontWeight: 500 }}>Lahore, Punjab (Geo-Tag Pending)</p>
                        </div>
                        <div>
                            <p style={{ fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', fontSize: '12px' }}>Total Penalty</p>
                            <p style={{ fontSize: '24px', fontWeight: 700, color: '#DC2626' }}>PKR {totalFine.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Use strict/danger zones */}
                    <div style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 700, backgroundColor: '#000000', color: '#ffffff', padding: '8px 16px', display: 'inline-block', marginBottom: '16px' }}>Detected Violations</h2>
                        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #D1D5DB' }}>
                                    <th style={{ padding: '8px 0', fontSize: '14px', textTransform: 'uppercase', fontWeight: 700, color: '#6B7280', width: '25%' }}>Severity</th>
                                    <th style={{ padding: '8px 0', fontSize: '14px', textTransform: 'uppercase', fontWeight: 700, color: '#6B7280' }}>Violation Details</th>
                                    <th style={{ padding: '8px 0', fontSize: '14px', textTransform: 'uppercase', fontWeight: 700, color: '#6B7280', textAlign: 'right' }}>Fine (PKR)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.issues.map((issue, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #eeeeee' }}>
                                        <td style={{ padding: '16px 0', verticalAlign: 'top' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '4px 12px',
                                                borderRadius: '9999px',
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                backgroundColor: issue.severity === 'High' ? '#fee2e2' : issue.severity === 'Medium' ? '#fef3c7' : '#dbeafe',
                                                color: issue.severity === 'High' ? '#991b1b' : issue.severity === 'Medium' ? '#92400e' : '#1e40af'
                                            }}>
                                                {issue.severity.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px 0' }}>
                                            <p style={{ fontWeight: 700, fontSize: '18px', marginBottom: '4px' }}>{issue.title}</p>
                                            <p style={{ color: '#4B5563', marginBottom: '8px' }}>{issue.description}</p>
                                            <p style={{ fontSize: '12px', fontFamily: 'monospace', color: '#6B7280' }}>Ref: {issue.regulationHint}</p>
                                        </td>
                                        <td style={{ padding: '16px 0', verticalAlign: 'top', textAlign: 'right', fontFamily: 'monospace', fontWeight: 700 }}>
                                            {issue.fineAmount ? issue.fineAmount.toLocaleString() : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Urdu Summary Section */}
                    <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', padding: '24px', borderRadius: '8px', marginBottom: '32px' }}>
                        <h3 style={{ textAlign: 'right', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>خلاصہ رپورٹ (Summary)</h3>
                        <p style={{ textAlign: 'right', fontSize: '20px', lineHeight: 1.6 }} dir="rtl">
                            {reportData.summaryUrdu}
                        </p>
                    </div>

                    {/* Footer - Call to Action */}
                    <div style={{ marginTop: 'auto', borderTop: '2px solid #D1D5DB', paddingTop: '24px', textAlign: 'center' }}>
                        <p style={{ fontWeight: 700, color: '#DC2626', fontSize: '18px', marginBottom: '8px' }}>NOTICE TO OWNER</p>
                        <p style={{ fontSize: '14px', color: '#6B7280', maxWidth: '448px', marginLeft: 'auto', marginRight: 'auto' }}>
                            This is an automatically generated safety assessment. Immediate action is required for "High" severity violations. Failure to comply may result in fines under the Punjab Safety Act 2016.
                        </p>
                        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Government_of_Punjab_Logo.svg/1200px-Government_of_Punjab_Logo.svg.png" alt="Gov Logo" style={{ height: '48px', opacity: 0.5, filter: 'grayscale(100%)' }} />
                            <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, color: '#D1D5DB' }}>Generated by ApexGov AI</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
