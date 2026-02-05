'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

declare global {
    interface Window {
        cocoSsd: any;
        tf: any;
    }
}

export function RealtimeScanner({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement | null> }) {
    const [model, setModel] = useState<any>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let animationId: number;

        const detectFrame = async () => {
            if (!model || !videoRef.current || !canvasRef.current) return;

            const video = videoRef.current;
            if (video.readyState !== 4) {
                animationId = requestAnimationFrame(detectFrame);
                return;
            }

            // Detect objects
            const predictions = await model.detect(video);

            // Draw
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.canvas.width = video.videoWidth;
                ctx.canvas.height = video.videoHeight;

                // Draw "Scanning" Grid
                ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
                ctx.lineWidth = 1;
                // (Grid drawing logic could go here)

                predictions.forEach((prediction: any) => {
                    // Only show relevant objects for construction/safety
                    if (['person', 'car', 'truck', 'bus', 'traffic light'].includes(prediction.class)) {
                        const [x, y, width, height] = prediction.bbox;

                        // Terminator Style Box
                        ctx.strokeStyle = '#00D9FF'; // Tech Cyan
                        ctx.lineWidth = 2;
                        ctx.strokeRect(x, y, width, height);

                        // Label
                        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                        ctx.fillRect(x, y - 20, width, 20);

                        ctx.fillStyle = '#00D9FF';
                        ctx.font = 'bold 12px monospace';
                        ctx.fillText(`${prediction.class.toUpperCase()} ${(prediction.score * 100).toFixed(0)}%`, x + 5, y - 5);
                    }
                });
            }

            animationId = requestAnimationFrame(detectFrame);
        };

        if (isLoaded && model) {
            detectFrame();
        }

        return () => cancelAnimationFrame(animationId);
    }, [model, isLoaded, videoRef]);

    const loadModel = async () => {
        if (window.cocoSsd) {
            console.log("Loading COCO-SSD...");
            try {
                const loadedModel = await window.cocoSsd.load();
                setModel(loadedModel);
                setIsLoaded(true);
                console.log("COCO-SSD Loaded!");
            } catch (err) {
                console.error("Failed to load COCO-SSD", err);
            }
        }
    };

    return (
        <div className="absolute inset-0 pointer-events-none z-10">
            <Script
                src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"
                strategy="lazyOnload"
            />
            <Script
                src="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd"
                strategy="lazyOnload"
                onLoad={loadModel}
            />
            <canvas ref={canvasRef} className="w-full h-full object-cover" />

            {!isLoaded && (
                <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded text-xs text-cyan-500 animate-pulse border border-cyan-500/30">
                    INITIALIZING VISION ENGINE...
                </div>
            )}
            {isLoaded && (
                <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded text-xs text-green-500 border border-green-500/30">
                    ● AI VISION ACTIVE
                </div>
            )}
        </div>
    );
}
