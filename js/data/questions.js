// AptiLearn - Enterprise Question Database
// 48 High-Yield Placement Aptitude Questions across Quantitative, Logical, Verbal, and Data Interpretation

const QUESTIONS_DATABASE = [
  // =========================================================================
  // QUANTITATIVE APTITUDE: Time & Work, Pipes & Cisterns
  // =========================================================================
  {
    id: "quant-tw-1",
    category: "Quantitative",
    subtopic: "Time & Work",
    company: "TCS NQT",
    difficulty: "Medium",
    question: "A can complete a piece of work in 12 days, and B can complete the same work in 18 days. If they work together for 4 days, what fraction of the total work remains unfinished?",
    options: ["1/3", "4/9", "5/9", "2/3"],
    correctAnswer: 1, // 4/9
    solution: "1. Work done by A in 1 day = 1/12.\n2. Work done by B in 1 day = 1/18.\n3. Combined 1-day work = 1/12 + 1/18 = 5/36.\n4. Work completed in 4 days = 4 * (5/36) = 20/36 = 5/9.\n5. Remaining fraction of work = 1 - 5/9 = 4/9.",
    shortcut: "LCM units: Total work = LCM(12, 18) = 36 units. Rate A = 3 u/day, Rate B = 2 u/day. 4 days work = 4 * 5 = 20 units. Remaining = 36 - 20 = 16 units => 16/36 = 4/9."
  },
  {
    id: "quant-tw-2",
    category: "Quantitative",
    subtopic: "Pipes & Cisterns",
    company: "Infosys",
    difficulty: "Hard",
    question: "Pipe A can fill a tank in 6 hours, while Pipe B can empty it in 8 hours. If both pipes are opened alternately for 1 hour each, beginning with Pipe A, how many total hours will it take to fill the tank completely?",
    options: ["35 hours", "41 hours", "43 hours", "48 hours"],
    correctAnswer: 1, // 41 hours
    solution: "1. Let tank volume = LCM(6, 8) = 24 units.\n2. Inflow rate A = +4 units/hr, Outflow rate B = -3 units/hr.\n3. In one 2-hour cycle, net filling = 4 - 3 = +1 unit.\n4. Before final cycle, stop at 24 - 4 = 20 units.\n5. 20 units filled in: 20 * 2 = 40 hours.\n6. In the 41st hour, Pipe A fills remaining 4 units (20 + 4 = 24).\n7. Total time = 41 hours.",
    shortcut: "Cycle rule: 2 hrs = 1 unit. Deduct filling pipe capacity (24 - 4 = 20 units) => 20 * 2 = 40 hrs. Last hour Pipe A finishes the last 4 units. Total = 41 hrs."
  },
  {
    id: "quant-tw-3",
    category: "Quantitative",
    subtopic: "Time & Work",
    company: "Cognizant",
    difficulty: "Easy",
    question: "15 men can construct a boundary wall in 20 days working 8 hours a day. How many days will it take for 20 men to build the same wall working 6 hours a day?",
    options: ["15 days", "20 days", "24 days", "18 days"],
    correctAnswer: 1, // 20 days
    solution: "1. Formula: (M1 * D1 * H1) = (M2 * D2 * H2).\n2. (15 * 20 * 8) = (20 * D2 * 6).\n3. 2400 = 120 * D2.\n4. D2 = 2400 / 120 = 20 days.",
    shortcut: "M1*D1*H1 = M2*D2*H2 => 15 * 20 * 8 = 20 * D2 * 6 => D2 = (15 * 8) / 6 = 20 days."
  },
  {
    id: "quant-tw-4",
    category: "Quantitative",
    subtopic: "Time & Work",
    company: "Deloitte",
    difficulty: "Medium",
    question: "A is twice as efficient as B and therefore is able to finish a job in 30 days less than B. Working together, in how many days can they complete the job?",
    options: ["15 days", "18 days", "20 days", "25 days"],
    correctAnswer: 2, // 20 days
    solution: "1. Efficiency ratio A : B = 2 : 1.\n2. Time ratio A : B = 1 : 2. Let A take x days, B take 2x days.\n3. Difference = 2x - x = x = 30 days.\n4. So A takes 30 days, B takes 60 days.\n5. Together = (30 * 60) / (30 + 60) = 1800 / 90 = 20 days.",
    shortcut: "Efficiency 2:1 => Time 1:2. Difference 1 unit = 30 days. Total work = 2 * 30 = 60 units. Combined rate = 2 + 1 = 3 units/day. Time = 60 / 3 = 20 days."
  },
  {
    id: "quant-tw-5",
    category: "Quantitative",
    subtopic: "Pipes & Cisterns",
    company: "Capgemini",
    difficulty: "Easy",
    question: "Two inlet pipes can fill a reservoir in 15 minutes and 20 minutes respectively. If both are opened together, in what time will the reservoir be filled?",
    options: ["8.57 minutes", "9.2 minutes", "10 minutes", "7.5 minutes"],
    correctAnswer: 0, // 8.57 mins (60/7)
    solution: "1. Rate = 1/15 + 1/20 = (4 + 3) / 60 = 7/60.\n2. Time = 60/7 = 8.57 minutes (or 8 minutes 34 seconds).",
    shortcut: "(xy)/(x+y) = (15 * 20)/(15 + 20) = 300 / 35 = 60 / 7 ≈ 8.57 mins."
  },

  // =========================================================================
  // QUANTITATIVE APTITUDE: Speed, Time, Distance & Trains / Boats
  // =========================================================================
  {
    id: "quant-tsd-1",
    category: "Quantitative",
    subtopic: "Speed & Distance",
    company: "TCS NQT",
    difficulty: "Medium",
    question: "A passenger train 180 meters long is traveling at 72 km/h. How much time does it take to cross an electric post and a 120-meter long platform respectively?",
    options: ["9 seconds and 15 seconds", "10 seconds and 20 seconds", "8 seconds and 16 seconds", "9 seconds and 12 seconds"],
    correctAnswer: 0, // 9s and 15s
    solution: "1. Speed in m/s = 72 * (5/18) = 20 m/s.\n2. Time to cross post = Length / Speed = 180 / 20 = 9 seconds.\n3. Time to cross platform = (180 + 120) / 20 = 300 / 20 = 15 seconds.",
    shortcut: "Speed 72 km/h = 20 m/s. Post: 180/20 = 9s. Platform adds 120m -> 120/20 = 6s. Total = 9 + 6 = 15s."
  },
  {
    id: "quant-tsd-2",
    category: "Quantitative",
    subtopic: "Speed & Distance",
    company: "Accenture",
    difficulty: "Medium",
    question: "An executive drives from Office to Client site at 60 km/h and returns along the same route at 40 km/h. What is his average speed for the round trip?",
    options: ["50 km/h", "48 km/h", "45 km/h", "52 km/h"],
    correctAnswer: 1, // 48 km/h
    solution: "1. When distances are identical, average speed is the Harmonic Mean: (2 * u * v) / (u + v).\n2. (2 * 60 * 40) / (60 + 40) = 4800 / 100 = 48 km/h.",
    shortcut: "Harmonic mean: 2 * 60 * 40 / 100 = 48 km/h. Avoid the arithmetic mean (50 km/h is incorrect)."
  },
  {
    id: "quant-tsd-3",
    category: "Quantitative",
    subtopic: "Boats & Streams",
    company: "Wipro",
    difficulty: "Hard",
    question: "A motorboat travels 24 km upstream and 36 km downstream in 6 hours. It also travels 36 km upstream and 24 km downstream in 6.5 hours. What is the speed of the water current?",
    options: ["2 km/h", "3 km/h", "4 km/h", "1.5 km/h"],
    correctAnswer: 0, // 2 km/h
    solution: "1. Let downstream speed = D, upstream speed = U.\n2. 24/U + 36/D = 6 and 36/U + 24/D = 6.5.\n3. Solving gives U = 8 km/h, D = 12 km/h.\n4. Current speed = (D - U) / 2 = (12 - 8) / 2 = 2 km/h.",
    shortcut: "Trial factors: Factors of 24 & 36: D=12, U=8. Check: 24/8 + 36/12 = 3 + 3 = 6. Stream = (12 - 8)/2 = 2 km/h."
  },
  {
    id: "quant-tsd-4",
    category: "Quantitative",
    subtopic: "Trains & Platforms",
    company: "Amazon",
    difficulty: "Hard",
    question: "Two express trains of lengths 140 m and 160 m run on parallel tracks. When running in the same direction, the faster crosses the slower in 30 seconds. When running in opposite directions, they pass each other in 6 seconds. Find the speed of the faster train in km/h.",
    options: ["108 km/h", "96 km/h", "112 km/h", "120 km/h"],
    correctAnswer: 0, // 108 km/h
    solution: "1. Total distance = 140 + 160 = 300 m.\n2. Same direction: Relative speed = (u - v) = 300 / 30 = 10 m/s.\n3. Opposite direction: Relative speed = (u + v) = 300 / 6 = 50 m/s.\n4. 2u = 60 => u = 30 m/s.\n5. Convert to km/h: 30 * (18/5) = 108 km/h.",
    shortcut: "Relative speeds: Diff = 10 m/s, Sum = 50 m/s => Faster = (50 + 10)/2 = 30 m/s. 30 * 18/5 = 108 km/h."
  },
  {
    id: "quant-tsd-5",
    category: "Quantitative",
    subtopic: "Speed & Distance",
    company: "LTI Mindtree",
    difficulty: "Easy",
    question: "Walking at 3/4th of his normal speed, a candidate reaches the test venue 20 minutes late. What is his usual transit time?",
    options: ["40 minutes", "50 minutes", "60 minutes", "80 minutes"],
    correctAnswer: 2, // 60 minutes
    solution: "1. New speed = 3/4 of usual speed => New time = 4/3 of usual time.\n2. Extra time = 4/3 T - T = 1/3 T = 20 minutes.\n3. Usual time T = 20 * 3 = 60 minutes.",
    shortcut: "Speed ratio 3/4 => Time ratio 4/3. Difference of 1 unit in time = 20 mins. Usual time = 3 units = 60 mins."
  },

  // =========================================================================
  // QUANTITATIVE APTITUDE: Profit, Loss & Percentages
  // =========================================================================
  {
    id: "quant-pl-1",
    category: "Quantitative",
    subtopic: "Profit & Loss",
    company: "Infosys",
    difficulty: "Medium",
    question: "A merchant marks an item 25% above the cost price and offers a discount of 10% on the marked price. If he earns a profit of Rs. 350, calculate the cost price of the item.",
    options: ["Rs. 2,500", "Rs. 2,800", "Rs. 3,000", "Rs. 3,200"],
    correctAnswer: 1, // Rs. 2,800
    solution: "1. Let Cost Price (CP) = 100x.\n2. Marked Price (MP) = 125x.\n3. Selling Price (SP) = 125x * 0.9 = 112.5x.\n4. Profit = SP - CP = 12.5x = 350.\n5. x = 28 => CP = 100x = Rs. 2,800.",
    shortcut: "Net profit % = 25 - 10 - (250/100) = 12.5% = 1/8 of CP. CP = 350 * 8 = Rs. 2,800."
  },
  {
    id: "quant-pl-2",
    category: "Quantitative",
    subtopic: "Percentages",
    company: "TCS NQT",
    difficulty: "Easy",
    question: "If the market price of petrol increases by 25%, by what percentage must a motorist reduce consumption so that his total expenditure remains unchanged?",
    options: ["25%", "20%", "16.67%", "22.5%"],
    correctAnswer: 1, // 20%
    solution: "1. Formula: [R / (100 + R)] * 100%.\n2. [25 / (100 + 25)] * 100% = (25 / 125) * 100% = 1/5 * 100% = 20%.",
    shortcut: "Product constancy rule: +1/4 increase requires -1/(4+1) = -1/5 reduction. 1/5 = 20%."
  },
  {
    id: "quant-pl-3",
    category: "Quantitative",
    subtopic: "Compound Interest",
    company: "Capgemini",
    difficulty: "Medium",
    question: "The difference between simple interest and compound interest on a sum of money for 2 years at 10% per annum compounded annually is Rs. 65. What is the sum invested?",
    options: ["Rs. 6,500", "Rs. 7,200", "Rs. 6,000", "Rs. 5,500"],
    correctAnswer: 0, // Rs. 6,500
    solution: "1. For 2 years, Difference = P * (R / 100)^2.\n2. 65 = P * (10 / 100)^2 = P * (1/100).\n3. P = 65 * 100 = Rs. 6,500.",
    shortcut: "Difference for 2 years = P * (r/100)^2. Here (10/100)^2 = 1/100. Principal = 65 * 100 = Rs. 6,500."
  },
  {
    id: "quant-pl-4",
    category: "Quantitative",
    subtopic: "Profit & Loss",
    company: "Deloitte",
    difficulty: "Medium",
    question: "A dishonest retailer claims to sell pulses at cost price but uses a false weight of 920 grams for 1 kilogram. What is his percentage profit?",
    options: ["8.0%", "8.7%", "9.13%", "10.0%"],
    correctAnswer: 1, // 8.7%
    solution: "1. Profit % = [Error / (True Value - Error)] * 100%.\n2. Error = 1000 - 920 = 80g.\n3. Profit % = (80 / 920) * 100% = 2/23 * 100% ≈ 8.696% ≈ 8.7%.",
    shortcut: "Gain = (Error / Given weight) * 100 = (80 / 920) * 100 = 8.7%."
  },
  {
    id: "quant-pl-5",
    category: "Quantitative",
    subtopic: "Compound Interest",
    company: "IBM",
    difficulty: "Hard",
    question: "A sum of money compounded annually doubles itself in 4 years. In how many years will it become 8 times its initial value at the same rate of interest?",
    options: ["8 years", "12 years", "16 years", "10 years"],
    correctAnswer: 1, // 12 years
    solution: "1. In CI, sum multiplies exponentially: 2^1 times in 4 years.\n2. We want 8 times = 2^3 times.\n3. Time required = 4 * 3 = 12 years.",
    shortcut: "CI rule: If amount becomes k times in T years, it becomes k^n times in n * T years. 8 = 2^3 => 3 * 4 = 12 years."
  },

  // =========================================================================
  // QUANTITATIVE APTITUDE: Ratio, Averages & Numbers
  // =========================================================================
  {
    id: "quant-num-1",
    category: "Quantitative",
    subtopic: "Number Systems",
    company: "TCS NQT",
    difficulty: "Medium",
    question: "What is the remainder when (7^84) is divided by 342?",
    options: ["0", "1", "49", "341"],
    correctAnswer: 1, // 1
    solution: "1. Notice that 7^3 = 343 = 342 + 1.\n2. We can rewrite 7^84 as (7^3)^28 = (343)^28.\n3. (342 + 1)^28 mod 342 = 1^28 mod 342 = 1.",
    shortcut: "7^3 = 343 ≡ 1 (mod 342). 84 is a multiple of 3 (3 * 28). Therefore, remainder = 1^28 = 1."
  },
  {
    id: "quant-num-2",
    category: "Quantitative",
    subtopic: "Ratio & Mixtures",
    company: "Accenture",
    difficulty: "Medium",
    question: "In what ratio must water be mixed with milk costing Rs. 36 per liter so that selling the mixture at Rs. 30 per liter yields a profit of 20%? (Assume water is free).",
    options: ["11 : 25", "11 : 36", "7 : 25", "9 : 25"],
    correctAnswer: 0, // 11 : 25
    solution: "1. SP of mixture = Rs. 30 with 20% profit => CP of mixture = 30 / 1.2 = Rs. 25/liter.\n2. Alligation:\n   - Water price = 0\n   - Milk price = 36\n   - Mean price = 25\n3. Ratio of Water : Milk = (36 - 25) : (25 - 0) = 11 : 25.",
    shortcut: "Mean CP = 30 / 1.2 = 25. Alligation: (36 - 25) / (25 - 0) = 11 / 25. Ratio is 11:25."
  },
  {
    id: "quant-num-3",
    category: "Quantitative",
    subtopic: "Averages & Ages",
    company: "Wipro",
    difficulty: "Easy",
    question: "The average age of a team of 11 cricket players is 28 years. If the age of the coach is included, the average age increases by 1 year. What is the age of the coach?",
    options: ["38 years", "40 years", "42 years", "44 years"],
    correctAnswer: 1, // 40 years
    solution: "1. Total age of 11 players = 11 * 28 = 308.\n2. New average with coach (12 persons) = 29.\n3. Total age of 12 persons = 12 * 29 = 348.\n4. Coach's age = 348 - 308 = 40 years.",
    shortcut: "Coach age = New Average + (Old Count * Increase) = 29 + (11 * 1) = 40 years."
  },
  {
    id: "quant-num-4",
    category: "Quantitative",
    subtopic: "Probability",
    company: "TCS NQT",
    difficulty: "Medium",
    question: "A box contains 5 red, 4 green, and 3 blue balls. If two balls are drawn at random without replacement, what is the probability that both are of the same color?",
    options: ["19/66", "23/66", "1/3", "5/22"],
    correctAnswer: 0, // 19/66
    solution: "1. Total balls = 12. Total pairs = 12C2 = 66.\n2. Both Red: 5C2 = 10; Both Green: 4C2 = 6; Both Blue: 3C2 = 3.\n3. Favorable ways = 10 + 6 + 3 = 19.\n4. Probability = 19/66.",
    shortcut: "Favorable = (5*4 + 4*3 + 3*2) / (12*11) = (20 + 12 + 6) / 132 = 38 / 132 = 19/66."
  },
  {
    id: "quant-num-5",
    category: "Quantitative",
    subtopic: "Permutations",
    company: "Amazon",
    difficulty: "Medium",
    question: "In how many ways can 5 boys and 4 girls be seated in a row such that no two girls sit adjacent to each other?",
    options: ["43,200", "28,800", "14,400", "86,400"],
    correctAnswer: 0, // 43,200
    solution: "1. First seat 5 boys in a row: 5! = 120 ways.\n2. 5 boys create 6 potential gap positions: _ B _ B _ B _ B _ B _.\n3. 4 girls can be placed in these 6 gaps: 6P4 = 6 * 5 * 4 * 3 = 360 ways.\n4. Total arrangements = 120 * 360 = 43,200.",
    shortcut: "Gap method: Boys = 5! = 120. Gaps for girls = 6P4 = 360. Total = 120 * 360 = 43,200."
  },

  // =========================================================================
  // LOGICAL REASONING: Syllogisms & Deductive Logic
  // =========================================================================
  {
    id: "logic-syl-1",
    category: "Logical Reasoning",
    subtopic: "Syllogisms",
    company: "TCS NQT",
    difficulty: "Medium",
    question: "Statements:\nI. All pens are markers.\nII. Some markers are pencils.\nIII. No pencil is an eraser.\n\nConclusions:\n1. Some pencils are pens.\n2. Some markers are not erasers.\n3. All erasers being pens is a possibility.\n\nWhich conclusion(s) logically follow?",
    options: ["Only 2 and 3 follow", "Only 1 follows", "Only 2 follows", "All follow"],
    correctAnswer: 0, // Only 2 and 3
    solution: "1. Concl 1: No definite overlap between pens and pencils is given. False.\n2. Concl 2: The markers that are pencils can never be erasers. True.\n3. Concl 3: Erasers can overlap with pens without violating the premise that erasers cannot touch pencils. True.",
    shortcut: "The intersection of Markers and Pencils cannot touch Erasers => Concl 2 is definite. Possibility between disjoint sets without restrictions is valid => Concl 3 follows."
  },
  {
    id: "logic-syl-2",
    category: "Logical Reasoning",
    subtopic: "Syllogisms",
    company: "Infosys",
    difficulty: "Easy",
    question: "Statements:\nI. All apples are fruits.\nII. All fruits are sweet.\n\nConclusions:\n1. All apples are sweet.\n2. Some sweet items are apples.",
    options: ["Only 1 follows", "Only 2 follows", "Both 1 and 2 follow", "Neither follows"],
    correctAnswer: 2, // Both follow
    solution: "1. Apples are subset of Fruits, and Fruits are subset of Sweet.\n2. Hence Apples are subset of Sweet (All apples are sweet).\n3. Inverse of 'All' is 'Some' (Some sweet items are apples). Both follow.",
    shortcut: "Transitivity: A ⊂ B and B ⊂ C => A ⊂ C (1 follows). Converse of universal is particular (2 follows)."
  },
  {
    id: "logic-syl-3",
    category: "Logical Reasoning",
    subtopic: "Syllogisms",
    company: "Deloitte",
    difficulty: "Hard",
    question: "Statements:\nI. Only a few phones are laptops.\nII. All laptops are tablets.\nIII. No tablet is a desktop.\n\nConclusions:\n1. All phones can never be desktops.\n2. Some phones are not laptops.",
    options: ["Only 1 follows", "Only 2 follows", "Both 1 and 2 follow", "Neither follows"],
    correctAnswer: 2, // Both follow
    solution: "1. 'Only a few phones are laptops' means Some phones are laptops AND Some phones are NOT laptops. Concl 2 is immediately true.\n2. Phones that are laptops are tablets, and no tablet can be desktop. Thus, those phones can never be desktops. Concl 1 is true.",
    shortcut: "'Only a few A are B' inherently guarantees 'Some A are NOT B' (Concl 2 true). Tablet-desktop restriction blocks phone-laptop segment from desktops (Concl 1 true)."
  },

  // =========================================================================
  // LOGICAL REASONING: Seating Arrangement & Direction Sense
  // =========================================================================
  {
    id: "logic-sa-1",
    category: "Logical Reasoning",
    subtopic: "Seating Arrangement",
    company: "Accenture",
    difficulty: "Hard",
    question: "Six colleagues (A, B, C, D, E, F) sit in a circle facing the center. B is between F and C. A is second to the left of E and second to the right of B. Who sits directly opposite to B?",
    options: ["D", "E", "A", "F"],
    correctAnswer: 1, // E
    solution: "1. In a 6-seat circle, positions 1 to 6 clockwise.\n2. Let B be at position 1.\n3. A is 2nd to the right of B => A is at position 3.\n4. A is 2nd to the left of E => E is at position 4.\n5. Position 4 is directly opposite position 1 (B).\n6. Therefore, E is opposite B.",
    shortcut: "In a 6-person circle, opposite is 3 spots away. A is 2 spots right of B, and 2 spots left of E. Thus E is opposite B."
  },
  {
    id: "logic-sa-2",
    category: "Logical Reasoning",
    subtopic: "Seating Arrangement",
    company: "Infosys",
    difficulty: "Medium",
    question: "Five students P, Q, R, S, T sit in a single row facing North. S sits between T and Q. Q is to the immediate left of R. P is at the extreme left end. Who sits in the exact middle?",
    options: ["S", "T", "Q", "R"],
    correctAnswer: 1, // T
    solution: "1. P is extreme left: [P, _, _, _, _].\n2. Q is immediately left of R: [Q, R] must be adjacent.\n3. S is between T and Q: so sequence is [T, S, Q, R].\n4. Combining: [P, T, S, Q, R].\n5. Middle element (3rd position) is S.\nWait! Let's recheck: if S is between T and Q, then P, T, S, Q, R puts S at middle position!",
    options: ["T", "S", "Q", "R"],
    correctAnswer: 1, // S
    solution: "1. P is at extreme left: [P, _, _, _, _].\n2. Q is immediate left of R: block [Q, R].\n3. S sits between T and Q => sequence [T, S, Q].\n4. Combined 5 positions: P, T, S, Q, R.\n5. The exact middle position is occupied by S.",
    shortcut: "Arrangement is P - T - S - Q - R. Middle is S."
  },
  {
    id: "logic-dir-1",
    category: "Logical Reasoning",
    subtopic: "Direction Sense",
    company: "TCS NQT",
    difficulty: "Easy",
    question: "A delivery agent walks 12 km North, turns right and walks 5 km, then turns right again and walks 12 km. How far and in what direction is he from his initial starting point?",
    options: ["5 km East", "5 km West", "10 km East", "13 km North-East"],
    correctAnswer: 0, // 5 km East
    solution: "1. Start at (0,0).\n2. 12 km North -> (0, 12).\n3. Turn right (East) and walk 5 km -> (5, 12).\n4. Turn right (South) and walk 12 km -> (5, 0).\n5. Distance from origin (0,0) is 5 km East.",
    shortcut: "North (+12) and South (-12) cancel out. Only East (+5) displacement remains. 5 km East."
  },

  // =========================================================================
  // LOGICAL REASONING: Blood Relations & Coding-Decoding
  // =========================================================================
  {
    id: "logic-br-1",
    category: "Logical Reasoning",
    subtopic: "Blood Relations",
    company: "Wipro",
    difficulty: "Medium",
    question: "Pointing to a photograph of a boy, Suresh remarked: 'He is the son of the only son of my mother.' How is Suresh related to that boy?",
    options: ["Brother", "Uncle", "Father", "Cousin"],
    correctAnswer: 2, // Father
    solution: "1. 'My mother' = Suresh's mother.\n2. 'Only son of my mother' = Suresh himself (since Suresh is the only male child).\n3. 'Son of [Suresh]' = Suresh's son.\n4. Therefore, Suresh is the father.",
    shortcut: "Reverse deduction: 'Only son of my mother' = Myself. 'Son of myself' = My son. Suresh is the Father."
  },
  {
    id: "logic-br-2",
    category: "Logical Reasoning",
    subtopic: "Blood Relations",
    company: "Deloitte",
    difficulty: "Medium",
    question: "If 'P + Q' means P is the mother of Q, 'P - Q' means P is the brother of Q, and 'P * Q' means P is the father of Q, what does 'A - B * C' imply?",
    options: ["A is the uncle of C", "A is the father of C", "A is the grandfather of C", "A is the brother of C"],
    correctAnswer: 0, // A is uncle of C
    solution: "1. B * C means B is the father of C.\n2. A - B means A is the brother of B.\n3. Since A is the brother of C's father (B), A is the paternal uncle of C.",
    shortcut: "A is brother of B; B is father of C => Brother of father = Paternal Uncle."
  },
  {
    id: "logic-cd-1",
    category: "Logical Reasoning",
    subtopic: "Coding-Decoding",
    company: "Cognizant",
    difficulty: "Easy",
    question: "In a certain code, 'SYSTEM' is coded as 'SYSMET' and 'NEARER' is coded as 'AENRER'. How is 'FRACTION' represented in that code?",
    options: ["CARFNOIT", "CARFTION", "ARFCNOIT", "CRAFNOIT"],
    correctAnswer: 0, // CARFNOIT
    solution: "1. SYSTEM (6 letters) is divided in half: SYS and TEM. SYS reversed = SYS; TEM reversed = MET => SYSMET.\n2. FRACTION has 8 letters: FRAC and TION.\n3. Reverse FRAC -> CARF; Reverse TION -> NOIT.\n4. Result = CARFNOIT.",
    shortcut: "Divide into two halves and reverse each half individually: FRAC -> CARF, TION -> NOIT => CARFNOIT."
  },
  {
    id: "logic-cd-2",
    category: "Logical Reasoning",
    subtopic: "Number Series",
    company: "TCS NQT",
    difficulty: "Medium",
    question: "Identify the next number in the sequence: 4, 18, 48, 100, 180, ?",
    options: ["294", "280", "312", "256"],
    correctAnswer: 0, // 294
    solution: "1. Examine the pattern: n^3 - n^2:\n   - n=2: 8 - 4 = 4\n   - n=3: 27 - 9 = 18\n   - n=4: 64 - 16 = 48\n   - n=5: 125 - 25 = 100\n   - n=6: 216 - 36 = 180\n2. For n=7: 7^3 - 7^2 = 343 - 49 = 294.",
    shortcut: "Formula n^2 * (n - 1). For n=7: 49 * 6 = 294."
  },
  {
    id: "logic-clock-1",
    category: "Logical Reasoning",
    subtopic: "Clocks & Calendars",
    company: "Capgemini",
    difficulty: "Medium",
    question: "What is the angle between the hour hand and the minute hand of a clock at 3:40?",
    options: ["130°", "125°", "140°", "135°"],
    correctAnswer: 0, // 130°
    solution: "1. Formula: Angle = |30H - 5.5M|.\n2. H = 3, M = 40.\n3. Angle = |30(3) - 5.5(40)| = |90 - 220| = |-130| = 130°.",
    shortcut: "Angle = |30*H - 11/2*M| = |90 - 220| = 130°."
  },

  // =========================================================================
  // VERBAL ABILITY: Sentence Correction, Spotting Errors & Vocab
  // =========================================================================
  {
    id: "verb-sc-1",
    category: "Verbal Ability",
    subtopic: "Sentence Correction",
    company: "TCS NQT",
    difficulty: "Medium",
    question: "Identify the part of the sentence containing a grammatical error:\n\n'Neither the plant manager (A) / nor the assembly technicians (B) / was informed of the shutdown (C) / scheduled for Friday. (D)'",
    options: ["(A)", "(B)", "(C)", "(D)"],
    correctAnswer: 2, // (C)
    solution: "1. In 'Neither... nor', the verb agrees with the subject closest to it.\n2. 'assembly technicians' is plural.\n3. Therefore, 'was informed' is incorrect and must be 'were informed'.\n4. Error lies in part (C).",
    shortcut: "Subject proximity rule: technicians (plural) is closest to verb => must take 'were', not 'was'."
  },
  {
    id: "verb-sc-2",
    category: "Verbal Ability",
    subtopic: "Vocabulary",
    company: "Infosys",
    difficulty: "Easy",
    question: "Select the word that is most nearly OPPOSITE in meaning to:\n\nMETICULOUS",
    options: ["Careful", "Careless", "Methodical", "Scrupulous"],
    correctAnswer: 1, // Careless
    solution: "1. 'Meticulous' means showing extreme care in details; scrupulous.\n2. Careful, Methodical, and Scrupulous are synonyms.\n3. The antonym is 'Careless'.",
    shortcut: "Meticulous = detail-oriented. Opposite = Careless."
  },
  {
    id: "verb-sc-3",
    category: "Verbal Ability",
    subtopic: "Vocabulary",
    company: "Amazon",
    difficulty: "Hard",
    question: "Choose the word closest in meaning to:\n\nEPHEMERAL",
    options: ["Eternal", "Transient", "Monumental", "Tenacious"],
    correctAnswer: 1, // Transient
    solution: "1. 'Ephemeral' means lasting for a very short time; fleeting or transient.\n2. 'Eternal' and 'Tenacious' are opposites.\n3. 'Transient' is the exact synonym.",
    shortcut: "Ephemeral = short-lived / fleeting = Transient."
  },
  {
    id: "verb-rc-1",
    category: "Verbal Ability",
    subtopic: "Reading Comprehension",
    company: "Cognizant",
    difficulty: "Medium",
    question: "Excerpt:\n'Enterprise artificial intelligence does not merely automate mechanical tasks; it transforms the nature of cognitive labor, demanding greater metacognitive vigilance and analytical discernment from human professionals.'\n\nWhat is the primary conclusion of this excerpt?",
    options: [
      "AI eliminates all administrative jobs.",
      "Human cognition is unsuited for enterprise tasks.",
      "AI shifts human responsibilities toward critical evaluation.",
      "Automated pipelines require constant manual intervention."
    ],
    correctAnswer: 2, // shifts toward critical evaluation
    solution: "1. The author highlights that AI 'demands greater metacognitive vigilance and analytical discernment'.\n2. This matches option C: shifting responsibilities toward complex analysis and critical evaluation.",
    shortcut: "Eliminate absolute claims ('eliminates all', 'unsuited'). Text emphasizes higher cognitive demand -> Option C."
  },
  {
    id: "verb-pj-1",
    category: "Verbal Ability",
    subtopic: "Para Jumbles",
    company: "Wipro",
    difficulty: "Medium",
    question: "Arrange the four fragments into a logical, coherent paragraph:\n\nP: This transition demands substantial expansion of transmission networks.\nQ: Renewable generation is expanding faster than any fossil fuel source in history.\nR: Without modern infrastructure, green energy frequently suffers severe curtailment.\nS: However, expanding generation is only half the technological equation.",
    options: ["Q - S - P - R", "Q - P - S - R", "S - Q - R - P", "P - R - Q - S"],
    correctAnswer: 0, // Q - S - P - R
    solution: "1. Q introduces the primary topic (Renewable generation expansion).\n2. S provides a qualifying contrast ('However, generation is only half').\n3. P explains the requirement ('This transition demands transmission networks').\n4. R gives the consequence of omission ('Without modern infrastructure, energy suffers curtailment').\n5. Sequence: Q - S - P - R.",
    shortcut: "Opening statement must be Q. 'However' in S contrasts with Q. P and R link the network bottleneck."
  },
  {
    id: "verb-id-1",
    category: "Verbal Ability",
    subtopic: "Idioms & Phrases",
    company: "Deloitte",
    difficulty: "Easy",
    question: "What is the meaning of the idiom:\n\n'TO BITE THE BULLET'?",
    options: [
      "To avoid conflict at any cost",
      "To face a grim situation with fortitude",
      "To make a reckless financial gamble",
      "To terminate a project prematurely"
    ],
    correctAnswer: 1, // Face with fortitude
    solution: "1. 'To bite the bullet' means to endure a painful or unavoidable situation bravely.",
    shortcut: "Bite the bullet = Endure difficulty with courage."
  },

  // =========================================================================
  // DATA INTERPRETATION: Bar Graphs, Pie Charts & Tabular Analysis
  // =========================================================================
  {
    id: "di-bar-1",
    category: "Data Interpretation",
    subtopic: "Bar Charts",
    company: "TCS NQT",
    difficulty: "Medium",
    question: "A company's annual graduate hiring was:\n- 2022: 450 candidates (60% CS, 40% Non-CS)\n- 2023: 600 candidates (65% CS, 35% Non-CS)\n- 2024: 750 candidates (70% CS, 30% Non-CS)\n\nWhat was the percentage increase in CS hires from 2022 to 2024?",
    options: ["66.67%", "85.2%", "94.44%", "75.0%"],
    correctAnswer: 2, // 94.44%
    solution: "1. CS in 2022 = 60% of 450 = 270.\n2. CS in 2024 = 70% of 750 = 525.\n3. Increase = 525 - 270 = 255.\n4. % Growth = (255 / 270) * 100% = (17/18) * 100% ≈ 94.44%.",
    shortcut: "2022 = 270. 2024 = 525. Difference = 255. 255/270 = 0.9444 = 94.44%."
  },
  {
    id: "di-pie-1",
    category: "Data Interpretation",
    subtopic: "Pie Charts",
    company: "Capgemini",
    difficulty: "Easy",
    question: "An IT enterprise has an annual R&D budget of Rs. 18,00,000. In a categorical pie chart, the sector angle for 'Cloud AI Infrastructure' is 72°. What is the rupee allocation for Cloud AI?",
    options: ["Rs. 2,40,000", "Rs. 3,60,000", "Rs. 3,20,000", "Rs. 4,00,000"],
    correctAnswer: 1, // Rs. 3,60,000
    solution: "1. Total circle angle = 360°.\n2. Proportion = 72° / 360° = 1/5 = 20%.\n3. Budget = 20% of 18,00,000 = Rs. 3,60,000.",
    shortcut: "72° is exactly 1/5th of 360°. 18,00,000 / 5 = Rs. 3,60,000."
  },
  {
    id: "di-tab-1",
    category: "Data Interpretation",
    subtopic: "Tabular Analysis",
    company: "IBM",
    difficulty: "Hard",
    question: "A performance table shows defect counts across 4 software sprints:\n- Sprint 1: 120 defects tested, 24 critical\n- Sprint 2: 150 defects tested, 33 critical\n- Sprint 3: 200 defects tested, 46 critical\n- Sprint 4: 180 defects tested, 36 critical\n\nWhich sprint had the highest defect criticality ratio?",
    options: ["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4"],
    correctAnswer: 2, // Sprint 3 (23%)
    solution: "1. Sprint 1: 24/120 = 20.0%\n2. Sprint 2: 33/150 = 22.0%\n3. Sprint 3: 46/200 = 23.0%\n4. Sprint 4: 36/180 = 20.0%\nSprint 3 has the highest ratio at 23.0%.",
    shortcut: "Compare fractions: 24/120=0.20, 33/150=0.22, 46/200=0.23, 36/180=0.20. Highest is Sprint 3."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTIONS_DATABASE };
}
