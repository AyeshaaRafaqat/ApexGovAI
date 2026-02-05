// Environment-based rate limiting configuration

/**
 * BYPASS OPTION: Change DEV_MODE to true for unlimited uploads
 */
const DEV_MODE = true; // Set to false for production

export const RATE_LIMIT_CONFIG = {
    // If dev mode, use huge limit; if production, use 3
    limit: DEV_MODE ? 999 : 3,
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    key: 'upload_limit'
};

/**
 * Quick bypass helpers
 */
export function resetRateLimit() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('upload_limit');
        console.log('✅ Rate limit reset!');
    }
}

export function getRemainingUploads(): number {
    if (typeof window === 'undefined') return RATE_LIMIT_CONFIG.limit;

    const data = localStorage.getItem('upload_limit');
    if (!data) return RATE_LIMIT_CONFIG.limit;

    const parsed = JSON.parse(data);
    return Math.max(0, RATE_LIMIT_CONFIG.limit - parsed.count);
}

// Export to window for console access
if (typeof window !== 'undefined') {
    (window as any).resetUploads = resetRateLimit;
    (window as any).checkUploads = getRemainingUploads;
}

console.log('💡 Debug commands available:');
console.log('  - resetUploads()  → Reset rate limit');
console.log('  - checkUploads()  → Check remaining uploads');
