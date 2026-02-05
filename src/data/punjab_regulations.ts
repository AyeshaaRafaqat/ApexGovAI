export interface Regulation {
    id: string;
    text: string;
    code_ref: string;
    fine_amount: number;
    severity: 'High' | 'Medium' | 'Low';
    keywords: string[];
}

export const PUNJAB_REGULATIONS: Regulation[] = [
    {
        id: "FIRE-EXT-001",
        text: "Every commercial building above 38ft height must have a dedicated external steel fire escape staircase.",
        code_ref: "LDA Building Regulations 2019, Section 5.3.1",
        fine_amount: 500000,
        severity: "High",
        keywords: ["fire escape", "external stair", "emergency exit", "steel stair"]
    },
    {
        id: "FIRE-HYD-002",
        text: "Functional fire hydrants and hose reels must be installed on every floor near the staircase.",
        code_ref: "Building Code of Pakistan (Fire Safety) 2016, Clause 4.2",
        fine_amount: 200000,
        severity: "High",
        keywords: ["fire hydrant", "hose reel", "fire extinguisher", "missing hydrant"]
    },
    {
        id: "ELEC-WIR-003",
        text: "All electrical wiring must be concealed in PVC or steel conduits. Loose/exposed wiring is strictly prohibited.",
        code_ref: "WAPDA/NEPRA Safety Standards & LDA Reg 6.1",
        fine_amount: 50000,
        severity: "High",
        keywords: ["exposed wire", "loose wiring", "open cable", "short circuit risk"]
    },
    {
        id: "STRUCT-CRK-004",
        text: "Structural members (beams/columns) showing visible cracks or reinforcement exposure must be immediately reinforced.",
        code_ref: "Punjab Dangerous Buildings Act, Section 3",
        fine_amount: 1000000,
        severity: "High",
        keywords: ["crack", "structural damage", "exposed steel", "beam failure"]
    },
    {
        id: "CONST-PPE-005",
        text: "Construction workers must wear safety helmets and reflective vests at all times on site.",
        code_ref: "Labor & Human Resource Dept Punjab, Safety Policy 2022",
        fine_amount: 25000,
        severity: "Medium",
        keywords: ["no helmet", "worker safety", "ppe", "construction worker"]
    },
    {
        id: "SETBACK-006",
        text: "Mandatory open space (setback) in front of commercial buildings must be kept clear of encroachments or construction material.",
        code_ref: "LDA Land Use Rules 2020, Chapter 4",
        fine_amount: 100000,
        severity: "Medium",
        keywords: ["encroachment", "blocked path", "construction material on road", "setback violation"]
    },
    {
        id: "SIGN-BOARD-007",
        text: "Advertising signs must not obstruct ventilation or emergency exits.",
        code_ref: "PHA Outdoor Advertising Bylaws 2018",
        fine_amount: 15000,
        severity: "Low",
        keywords: ["signboard", "blocked window", "large billboard"]
    }
];
