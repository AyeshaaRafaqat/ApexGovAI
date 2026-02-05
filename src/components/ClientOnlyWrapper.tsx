/**
 * NUCLEAR OPTION: Force client-side only rendering
 * This bypasses ALL SSR hydration issues
 */

'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { ReportData } from '@/app/page';

// Import components with NO SSR
const ImageUploader = dynamic(
    () => import('@/components/features/Camera/ImageUploader').then(mod => ({ default: mod.ImageUploader })),
    { ssr: false }
);

const ReportView = dynamic(
    () => import('@/components/features/Report/ReportView').then(mod => ({ default: mod.ReportView })),
    { ssr: false }
);

export default function ClientOnlyUploader() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-white">Loading scanner...</p>
        </div>
    );
}
