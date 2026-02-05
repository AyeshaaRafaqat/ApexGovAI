// Location & Geo Services

export interface LocationData {
    latitude: number;
    longitude: number;
    accuracy: number;
    fuzzyLatitude: number; // Rounded for privacy
    fuzzyLongitude: number;
    address?: string;
    city?: string;
    timestamp: number;
}

/**
 * Get user's current location with privacy-preserving fuzzing
 */
export async function getCurrentLocation(): Promise<LocationData | null> {
    // SSR safety check
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
        console.warn('Geolocation not available');
        return null;
    }

    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude, accuracy } = position.coords;

                // Privacy: Round to ~100m precision (2 decimal places)
                const fuzzyLatitude = Math.round(latitude * 100) / 100;
                const fuzzyLongitude = Math.round(longitude * 100) / 100;

                resolve({
                    latitude,
                    longitude,
                    accuracy,
                    fuzzyLatitude,
                    fuzzyLongitude,
                    timestamp: Date.now()
                });
            },
            (error) => {
                console.error('Location error:', error);
                resolve(null);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
}

/**
 * Reverse geocode coordinates to address (optional for display)
 */
export async function getAddressFromCoords(
    lat: number,
    lng: number
): Promise<string> {
    try {
        // Using OpenStreetMap Nominatim (free, no API key needed)
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await response.json();

        return data.display_name || 'Location unavailable';
    } catch (error) {
        console.error('Geocoding failed:', error);
        return 'Location unavailable';
    }
}

/**
 * Check if location is within Lahore bounds (for demo)
 */
export function isInLahore(lat: number, lng: number): boolean {
    // Rough bounding box for Lahore
    const LAHORE_BOUNDS = {
        north: 31.7,
        south: 31.35,
        east: 74.5,
        west: 74.15
    };

    return (
        lat >= LAHORE_BOUNDS.south &&
        lat <= LAHORE_BOUNDS.north &&
        lng >= LAHORE_BOUNDS.west &&
        lng <= LAHORE_BOUNDS.east
    );
}

/**
 * Format location for display (privacy-safe)
 */
export function formatLocation(location: LocationData): string {
    if (location.address) {
        return location.address;
    }
    return `${location.fuzzyLatitude.toFixed(2)}, ${location.fuzzyLongitude.toFixed(2)}`;
}
