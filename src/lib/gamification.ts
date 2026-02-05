// Gamification & Rewards System

export interface UserStats {
    reportsSubmitted: number;
    reportsApproved: number;
    points: number;
    level: number;
    badges: Badge[];
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    earnedAt?: Date;
}

export const BADGES: Badge[] = [
    {
        id: 'first_report',
        name: 'Safety Scout',
        description: 'Submitted your first violation report',
        icon: '🔍'
    },
    {
        id: 'verified_reporter',
        name: 'Trusted Reporter',
        description: '10 approved reports - Your reports go straight to inspectors',
        icon: '✅'
    },
    {
        id: 'neighborhood_guardian',
        name: 'Neighborhood Guardian',
        description: 'Reported 25 violations in your area',
        icon: '🏘️'
    },
    {
        id: 'fire_safety_expert',
        name: 'Fire Safety Expert',
        description: 'Identified 10 fire hazards',
        icon: '🔥'
    },
    {
        id: 'structural_specialist',
        name: 'Structural Specialist',
        description: 'Identified 10 structural issues',
        icon: '🏗️'
    },
    {
        id: 'lahore_hero',
        name: 'Lahore Hero',
        description: '100 approved reports - You\'ve made Lahore safer!',
        icon: '🦸'
    }
];

export const REWARD_TIERS = [
    { reports: 10, reward: 'Verified Reporter Badge + Priority Review', points: 100 },
    { reports: 25, reward: 'Rs. 500 Mobile Credit', points: 300 },
    { reports: 50, reward: 'Safety Equipment Kit (Fire Extinguisher)', points: 600 },
    { reports: 100, reward: 'Certificate of Recognition from LDA', points: 1200 },
];

export function calculateLevel(points: number): number {
    if (points < 100) return 1;
    if (points < 300) return 2;
    if (points < 600) return 3;
    if (points < 1200) return 4;
    return 5;
}

export function getNextReward(reportsApproved: number): typeof REWARD_TIERS[0] | null {
    return REWARD_TIERS.find(tier => tier.reports > reportsApproved) || null;
}

export function checkNewBadges(oldStats: UserStats, newStats: UserStats): Badge[] {
    const newBadges: Badge[] = [];

    // First report
    if (oldStats.reportsSubmitted === 0 && newStats.reportsSubmitted >= 1) {
        newBadges.push(BADGES[0]);
    }

    // Verified reporter
    if (oldStats.reportsApproved < 10 && newStats.reportsApproved >= 10) {
        newBadges.push(BADGES[1]);
    }

    // Neighborhood guardian
    if (oldStats.reportsApproved < 25 && newStats.reportsApproved >= 25) {
        newBadges.push(BADGES[2]);
    }

    // Lahore hero
    if (oldStats.reportsApproved < 100 && newStats.reportsApproved >= 100) {
        newBadges.push(BADGES[5]);
    }

    return newBadges;
}
