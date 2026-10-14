// AptiLearn - Enterprise Company Exam Specifications
// 10 Premier Recruitment Drives with verified patterns, sectional timings, and cutoffs

const COMPANY_TESTS = [
  {
    id: "tcs-nqt",
    name: "TCS NQT 2025-26",
    company: "Tata Consultancy Services",
    badge: "National Qualifier",
    color: "#2563eb",
    logoText: "TCS",
    difficulty: "Medium",
    durationMinutes: 15,
    totalQuestions: 10,
    negativeMarking: 0,
    cutoffPercent: 65,
    tagline: "Foundation Cognitive Section (Numerical, Reasoning & Verbal Ability)",
    syllabus: [
      "Numerical Ability (Work, Speed, Remainders)",
      "Reasoning Ability (Syllogisms, Direction Sense, Series)",
      "Verbal Ability (Error Spotting, Comprehension)"
    ],
    questionIds: [
      "quant-tw-1", "quant-tsd-1", "quant-pl-2", "quant-num-1", "quant-num-4",
      "logic-syl-1", "logic-dir-1", "logic-cd-2", "verb-sc-1", "di-bar-1"
    ]
  },
  {
    id: "infosys-sp",
    name: "Infosys Specialist & SE",
    company: "Infosys",
    badge: "High Hiring Volume",
    color: "#0284c7",
    logoText: "INFY",
    difficulty: "Medium-Hard",
    durationMinutes: 12,
    totalQuestions: 8,
    negativeMarking: 0.25,
    cutoffPercent: 70,
    tagline: "Mathematical Thinking & Critical Analytical Reasoning",
    syllabus: [
      "Mathematical Thinking & Cryptarithmetic",
      "Linear & Circular Seating Logic",
      "Verbal Syntax & Precision Vocabulary"
    ],
    questionIds: [
      "quant-tw-2", "quant-pl-1", "logic-syl-2", "logic-sa-2",
      "verb-sc-2", "di-pie-1", "quant-tsd-2", "logic-dir-1"
    ]
  },
  {
    id: "deloitte-nat",
    name: "Deloitte National Assessment",
    company: "Deloitte",
    badge: "Big 4 Consulting",
    color: "#16a34a",
    logoText: "DTT",
    difficulty: "Hard",
    durationMinutes: 15,
    totalQuestions: 8,
    negativeMarking: 0.25,
    cutoffPercent: 75,
    tagline: "Quantitative Analytics, Logical Deduction & Business English",
    syllabus: [
      "Efficiency Ratios & Dishonest Shopkeeper",
      "Coded Blood Relations & Deductions",
      "Idioms, Business Phrasing & Logic"
    ],
    questionIds: [
      "quant-tw-4", "quant-pl-4", "logic-syl-3", "logic-br-2",
      "verb-id-1", "quant-num-2", "di-tab-1", "verb-rc-1"
    ]
  },
  {
    id: "accenture-cog",
    name: "Accenture Cognitive Assessment",
    company: "Accenture",
    badge: "Speed Critical",
    color: "#7c3aed",
    logoText: "ACN",
    difficulty: "Medium",
    durationMinutes: 10,
    totalQuestions: 6,
    negativeMarking: 0,
    cutoffPercent: 65,
    tagline: "Critical Reasoning, Problem Solving & Abstract Logic",
    syllabus: [
      "Alligation, Averages & Speed Logic",
      "Circular Seating Formations",
      "Verbal Sentence Restructuring"
    ],
    questionIds: [
      "quant-tsd-2", "quant-num-2", "logic-sa-1",
      "verb-pj-1", "logic-cd-1", "quant-pl-2"
    ]
  },
  {
    id: "amazon-oa",
    name: "Amazon Online Assessment (OA)",
    company: "Amazon",
    badge: "Tier-1 Tech",
    color: "#ea580c",
    logoText: "AMZN",
    difficulty: "Hard",
    durationMinutes: 15,
    totalQuestions: 6,
    negativeMarking: 0,
    cutoffPercent: 80,
    tagline: "Advanced Quantitative Logic & Analytical Problem Solving",
    syllabus: [
      "Train Kinematics & Relative Velocities",
      "Permutations & Combinations Under Constraints",
      "Advanced Reading Comprehension"
    ],
    questionIds: [
      "quant-tsd-4", "quant-num-5", "verb-sc-3",
      "logic-sa-1", "di-tab-1", "quant-tw-2"
    ]
  },
  {
    id: "wipro-enth",
    name: "Wipro Elite NTH",
    company: "Wipro",
    badge: "AMCAT Partnered",
    color: "#059669",
    logoText: "WIT",
    difficulty: "Medium",
    durationMinutes: 10,
    totalQuestions: 6,
    negativeMarking: 0.25,
    cutoffPercent: 65,
    tagline: "AMCAT Cognitive Reasoning & Numerical Aptitude",
    syllabus: [
      "Boats, Streams & Streamflow Ratios",
      "Blood Relations & Kinship Networks",
      "Para Jumbles & Cohesive Writing"
    ],
    questionIds: [
      "quant-tsd-3", "logic-br-1", "verb-pj-1",
      "quant-num-3", "quant-tw-1", "logic-cd-2"
    ]
  },
  {
    id: "cognizant-genc",
    name: "Cognizant GenC / Elevate",
    company: "Cognizant",
    badge: "Elevate Track",
    color: "#d97706",
    logoText: "CTS",
    difficulty: "Medium",
    durationMinutes: 10,
    totalQuestions: 6,
    negativeMarking: 0,
    cutoffPercent: 65,
    tagline: "Numerical Reasoning & Comprehension Logic",
    syllabus: [
      "Men-Hour Equivalence & Work Schedules",
      "Analytical Coding-Decoding Patterns",
      "Metacognitive Reading Inferences"
    ],
    questionIds: [
      "quant-tw-3", "logic-cd-1", "verb-rc-1",
      "quant-pl-3", "di-pie-1", "quant-num-1"
    ]
  },
  {
    id: "capgemini-excel",
    name: "Capgemini Excellence Drive",
    company: "Capgemini",
    badge: "Campus Pooled",
    color: "#0891b2",
    logoText: "CAP",
    difficulty: "Medium",
    durationMinutes: 10,
    totalQuestions: 6,
    negativeMarking: 0,
    cutoffPercent: 60,
    tagline: "Pseudocode & Fundamental Quantitative Competency",
    syllabus: [
      "Inlet-Outlet Flow Dynamics",
      "Clock Angular Mathematics",
      "Compound Interest Differentials"
    ],
    questionIds: [
      "quant-tw-5", "logic-clock-1", "quant-pl-3",
      "di-pie-1", "verb-sc-1", "quant-tsd-1"
    ]
  },
  {
    id: "lti-mindtree",
    name: "LTI Mindtree Campus Drive",
    company: "LTI Mindtree",
    badge: "Integrated Aptitude",
    color: "#4f46e5",
    logoText: "LTIM",
    difficulty: "Medium",
    durationMinutes: 10,
    totalQuestions: 6,
    negativeMarking: 0.25,
    cutoffPercent: 65,
    tagline: "Quantitative Analytics & Logical Formations",
    syllabus: [
      "Relative Speed & Punctuality Dynamics",
      "Linear Seating Alignments",
      "Syllogistic Deductions"
    ],
    questionIds: [
      "quant-tsd-5", "logic-sa-2", "logic-syl-2",
      "quant-tw-1", "verb-sc-2", "di-bar-1"
    ]
  },
  {
    id: "ibm-cog",
    name: "IBM Cognitive Ability",
    company: "IBM",
    badge: "Global Assessment",
    color: "#1d4ed8",
    logoText: "IBM",
    difficulty: "Hard",
    durationMinutes: 12,
    totalQuestions: 6,
    negativeMarking: 0,
    cutoffPercent: 70,
    tagline: "Cognitive Problem Solving & Data Analytics",
    syllabus: [
      "Compound Interest Doubling Rates",
      "Multi-Sprint Defect Criticality Ratios",
      "Coded Blood Lineages"
    ],
    questionIds: [
      "quant-pl-5", "di-tab-1", "logic-br-2",
      "quant-num-1", "verb-rc-1", "logic-syl-3"
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { COMPANY_TESTS };
}
