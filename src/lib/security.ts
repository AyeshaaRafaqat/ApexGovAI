// Security & Privacy Utilities

/**
 * Rate Limiting (Client-side check + Server-side enforcement)
 */
export class RateLimiter {
    private key: string;
    private limit: number;
    private windowMs: number;

    constructor(key: string, limit: number = 3, windowMs: number = 24 * 60 * 60 * 1000) {
        this.key = key;
        this.limit = limit;
        this.windowMs = windowMs;
    }

    /**
     * Peek at current status WITHOUT consuming a token (for display only)
     */
    peek(): { remaining: number; resetAt: Date } {
        // SSR safety check
        if (typeof window === 'undefined') {
            return { remaining: this.limit, resetAt: new Date() };
        }

        const now = Date.now();
        const data = localStorage.getItem(this.key);

        if (!data) {
            return { remaining: this.limit, resetAt: new Date(now + this.windowMs) };
        }

        const parsed = JSON.parse(data);

        // Reset if window expired
        if (now > parsed.resetAt) {
            return { remaining: this.limit, resetAt: new Date(now + this.windowMs) };
        }

        return {
            remaining: Math.max(0, this.limit - parsed.count),
            resetAt: new Date(parsed.resetAt)
        };
    }

    /**
     * Check AND consume a token (call this only when actually uploading)
     */
    check(): { allowed: boolean; remaining: number; resetAt: Date } {
        // SSR safety check
        if (typeof window === 'undefined') {
            return { allowed: true, remaining: this.limit, resetAt: new Date() };
        }

        const now = Date.now();
        const data = localStorage.getItem(this.key);

        if (!data) {
            const newData = {
                count: 1,
                resetAt: now + this.windowMs
            };
            localStorage.setItem(this.key, JSON.stringify(newData));
            return { allowed: true, remaining: this.limit - 1, resetAt: new Date(newData.resetAt) };
        }

        const parsed = JSON.parse(data);

        // Reset if window expired
        if (now > parsed.resetAt) {
            const newData = {
                count: 1,
                resetAt: now + this.windowMs
            };
            localStorage.setItem(this.key, JSON.stringify(newData));
            return { allowed: true, remaining: this.limit - 1, resetAt: new Date(newData.resetAt) };
        }

        // Check limit
        if (parsed.count >= this.limit) {
            return {
                allowed: false,
                remaining: 0,
                resetAt: new Date(parsed.resetAt)
            };
        }

        // Increment
        parsed.count++;
        localStorage.setItem(this.key, JSON.stringify(parsed));
        return {
            allowed: true,
            remaining: this.limit - parsed.count,
            resetAt: new Date(parsed.resetAt)
        };
    }

    /**
     * Reset the rate limit (for testing)
     */
    reset(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.key);
        }
    }
}

/**
 * Sanitize file names to prevent path traversal attacks
 */
export function sanitizeFileName(fileName: string): string {
    return fileName
        .replace(/[^a-zA-Z0-9.-]/g, '_') // Remove special chars
        .replace(/\.{2,}/g, '.') // Remove multiple dots
        .substring(0, 100); // Limit length
}

/**
 * Strip EXIF metadata from images (privacy)
 */
export async function stripExifData(file: File): Promise<File> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Create canvas and redraw (removes EXIF)
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d')!;
                ctx.drawImage(img, 0, 0);

                canvas.toBlob((blob) => {
                    if (blob) {
                        const cleanedFile = new File([blob], file.name, { type: file.type });
                        resolve(cleanedFile);
                    } else {
                        resolve(file); // Fallback to original
                    }
                }, file.type);
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    });
}

/**
 * Detect potential prompt injection in image text (future: OCR check)
 */
export function detectSuspiciousPatterns(filename: string): boolean {
    const suspiciousPatterns = [
        'ignore',
        'previous instructions',
        'system prompt',
        'admin',
        'bypass',
        'override'
    ];

    const lowerName = filename.toLowerCase();
    return suspiciousPatterns.some(pattern => lowerName.includes(pattern));
}

/**
 * Generate secure random IDs for reports
 */
export function generateReportId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 9);
    return `RPT-${timestamp}-${randomPart}`.toUpperCase();
}

/**
 * Validate image file before upload
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        return { valid: false, error: 'Only JPEG, PNG, and WebP images are allowed' };
    }

    // Check file size (max 10MB for demo)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
        return { valid: false, error: 'Image must be less than 10MB' };
    }

    // Check filename
    if (detectSuspiciousPatterns(file.name)) {
        return { valid: false, error: 'Suspicious filename detected' };
    }

    return { valid: true };
}
