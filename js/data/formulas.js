// AptiLearn - Formula Sheets & Speed Hacks Database

const FORMULAS_DATA = [
  {
    category: "Quantitative",
    title: "Time & Work Master Shortcuts",
    icon: "⏱️",
    items: [
      {
        name: "LCM Method for Work",
        formula: "Total Work = LCM(days of A, days of B, ...)\nEfficiency = Work / Time\nCombined Time = Total Work / Sum(Efficiencies)",
        tip: "Avoid 1/A + 1/B fractions. If A takes 10 days and B takes 15 days, assume Total Work = 30 units. A does 3 u/day, B does 2 u/day. Together = 30 / 5 = 6 days."
      },
      {
        name: "Men-Day-Hours Equivalence",
        formula: "(M1 × D1 × H1 × E1) / W1 = (M2 × D2 × H2 × E2) / W2",
        tip: "Work always goes to the denominator! If men or days change, set this product ratio directly."
      },
      {
        name: "Alternate Days Tank Filling",
        formula: "Cycle Time = 2 hours\nNet filling per cycle = Pipe A rate - Pipe B rate",
        tip: "Always subtract the filling pipe's single-hour capacity from the total capacity before calculating completed 2-hour cycles to prevent overshoot."
      }
    ]
  },
  {
    category: "Quantitative",
    title: "Speed, Time & Distance Shortcuts",
    icon: "🚀",
    items: [
      {
        name: "Unit Conversion Hack",
        formula: "km/h to m/s: Multiply by 5/18\nm/s to km/h: Multiply by 18/5",
        tip: "Memory trick: Going from big unit (km/h) to small unit (m/s) -> multiply by small number on top (5/18)."
      },
      {
        name: "Average Speed (Equal Distances)",
        formula: "Avg Speed = (2 × u × v) / (u + v)",
        tip: "DO NOT calculate (u + v)/2! Harmonic mean must be used whenever the distance traveled at both speeds is equal."
      },
      {
        name: "Relative Speed (Trains / Chasing)",
        formula: "Same direction: S_rel = |u - v|\nOpposite direction: S_rel = u + v\nTime to cross = (L1 + L2) / S_rel",
        tip: "When crossing a pole or person, length L2 = 0. When crossing a platform or tunnel, add platform length to train length."
      },
      {
        name: "Boats & Streams",
        formula: "Downstream speed (D) = B + S\nUpstream speed (U) = B - S\nBoat in still water (B) = (D + U) / 2\nStream speed (S) = (D - U) / 2",
        tip: "Always remember D > B > U. The difference D - U equals twice the speed of the stream."
      }
    ]
  },
  {
    category: "Quantitative",
    title: "Percentages & Fast Fractions",
    icon: "📊",
    items: [
      {
        name: "Essential Fraction-to-Percent Mapping",
        formula: "1/2 = 50% | 1/3 = 33.33% | 1/4 = 25% | 1/5 = 20%\n1/6 = 16.67% | 1/7 = 14.28% | 1/8 = 12.5%\n1/9 = 11.11% | 1/11 = 9.09% | 1/12 = 8.33%",
        tip: "Memorize 1/7 (14.28%) and 1/8 (12.5%). They appear in almost every TCS and Infosys percentage problem."
      },
      {
        name: "Expenditure Constant Rule (Product Constancy)",
        formula: "If Price increases by (a/b), Consumption must decrease by a/(a+b)\nto keep expenditure constant.",
        tip: "If price increases by 20% (+1/5), consumption decreases by 1/(1+5) = 1/6 = 16.67%."
      },
      {
        name: "Successive Percentage Change",
        formula: "Net % change = x + y + (x × y) / 100",
        tip: "Use negative signs for discounts or reductions. Two successive discounts of 20% and 10% = -20 - 10 + (200/100) = -28%."
      }
    ]
  },
  {
    category: "Quantitative",
    title: "Compound Interest & Profit Hacks",
    icon: "💰",
    items: [
      {
        name: "2-Year Difference (CI - SI)",
        formula: "Difference (2 yrs) = P × (R / 100)²",
        tip: "Directly gives principal: P = Difference / (R/100)²."
      },
      {
        name: "3-Year Difference (CI - SI)",
        formula: "Difference (3 yrs) = P × (R / 100)² × [(300 + R) / 100]",
        tip: "High yield formula for Wipro and Accenture aptitude sections."
      },
      {
        name: "Dishonest Shopkeeper / False Weight",
        formula: "Gain % = [Error / (True Value - Error)] × 100%",
        tip: "If a merchant uses 900g instead of 1kg: Error = 100g, Gain = 100 / (1000 - 100) * 100 = 100/900 = 11.11%."
      }
    ]
  },
  {
    category: "Logical Reasoning",
    title: "Syllogisms & Logic Rules",
    icon: "🧠",
    items: [
      {
        name: "Golden Venn Rules",
        formula: "1. All A are B: A is inside B\n2. Some A are B: A and B overlap\n3. No A is B: A and B are disjoint circles\n4. Only a few A are B: Some A are B AND Some A are NOT B",
        tip: "In 'Possibility' conclusions, if you can draw even one valid Venn diagram without violating given statements, the conclusion follows!"
      },
      {
        name: "Opposite Letter Codes in Coding-Decoding",
        formula: "Sum of position of opposite letters = 27\nA(1) ↔ Z(26) | B(2) ↔ Y(25) | C(3) ↔ X(24)\nRemember mnemonic: AZ, BY, CX, DW, EV, FU, GT, HS, IR, JQ, KP, LO, MN",
        tip: "To find reverse letter of Xth letter: Subtract X from 27."
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FORMULAS_DATA };
}
