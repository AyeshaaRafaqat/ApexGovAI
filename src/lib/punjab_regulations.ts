export const PUNJAB_BUILDING_REGULATIONS = [
    {
        id: 'fire-2.1',
        category: 'Fire Safety',
        text: 'All buildings over 3 stories must have a dedicated emergency fire exit separate from the main staircase.',
        reference: 'Punjab Fire Safety Ordinance 2016, Section 2.1'
    },
    {
        id: 'fire-4.3',
        category: 'Fire Safety',
        text: 'Industrial and commercial buildings must have functional fire extinguishers visible within every 500 sq ft.',
        reference: 'Punjab Fire Safety Ordinance 2016, Section 4.3'
    },
    {
        id: 'struct-12.1',
        category: 'Structural',
        text: 'Load-bearing walls must show no visible cracks wider than 3mm. Exposed reinforcement bars are strictly prohibited.',
        reference: 'Lahore Development Authority Building Regs 2019, Ch 12'
    },
    {
        id: 'elec-5.5',
        category: 'Electrical',
        text: 'Main distribution panels must be covered and grounded. Loose hanging wires (spider webs) are a Type A violation.',
        reference: 'Punjab Electrical Safety Code, Rule 5.5'
    },
    {
        id: 'access-1.2',
        category: 'Accessibility',
        text: 'Public entryways must be kept clear of obstruction (debris, parked motorcycles) to allow emergency access.',
        reference: 'Punjab Community Safety Act 2021, Sec 1.2'
    },
    {
        id: 'const-9.1',
        category: 'Construction Safety',
        text: 'Construction sites adjacent to public roads must have safety netting and warning tape.',
        reference: 'LDA Safety Guidelines 2020, Rule 9.1'
    }
];

export function getRelevantRegulations(detectedIssues: string[]): string {
    // Simple retrieval: In a real app, this would be vector search.
    // For the demo, we dump the whole context (it's small) or filter by keywords if we want to pretend to be smart.
    // Let's just return the formatted string of ALL key regulations to ensure the LLM definitely knows them.
    return PUNJAB_BUILDING_REGULATIONS.map(r =>
        `- [${r.category}] "${r.text}" (Ref: ${r.reference})`
    ).join('\n');
}
