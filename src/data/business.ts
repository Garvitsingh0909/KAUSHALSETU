export interface CostItem {
  id: string;
  name: string;
  amount: number;
  category: 'fixed' | 'variable'; // fixed = monthly fixed, variable = per-customer or recurring monthly variable
  isPerUnit?: boolean; // if true, multiplied by customer count
}

export interface BusinessScenario {
  id: string;
  studentId?: string;
  opportunityId: string;
  opportunityTitle: string;
  skillName: string;
  scenarioName: string; // e.g. "Basic", "Growth", "Premium"
  problem: string;
  customerSegment: string;
  solution: string;
  valueCreated: {
    problemSolved: string;
    customerBenefit: string;
    willingnessToPay: string;
  };
  pricePerUnit: number;
  customerCount: number;
  fixedCosts: CostItem[];
  variableCosts: CostItem[];
  // Calculated fields:
  revenue: number;
  totalFixedCost: number;
  totalVariableCost: number;
  totalCost: number;
  surplus: number;
  breakEvenCustomers: number | null; // null if unit economics are negative (price <= variable cost per unit)
  timestamp: string;
  notes?: string;
}

export interface FinancialCalculationResult {
  revenue: number;
  totalFixedCost: number;
  totalVariableCost: number;
  totalCost: number;
  surplus: number;
  isProfitable: boolean;
  unitContributionMargin: number; // Price - Variable Cost per unit
  breakEvenCustomers: number | null; // ceil(Fixed Costs / Unit Contribution Margin)
  sustainabilityStatus: 'Sustainable & Viable' | 'Needs Improvement' | 'Currently Below Break-even' | 'Negative Unit Economics';
  sustainabilityBadge: 'emerald' | 'amber' | 'rose' | 'red';
  gOneInsight: string;
}

export function calculateFinancials(
  price: number,
  customers: number,
  fixedCosts: CostItem[],
  variableCosts: CostItem[]
): FinancialCalculationResult {
  // Safe validation
  const safePrice = Math.max(0, isNaN(price) ? 0 : price);
  const safeCustomers = Math.max(0, isNaN(customers) ? 0 : Math.round(customers));

  // Fixed costs are static per month
  const totalFixedCost = fixedCosts.reduce((acc, item) => acc + Math.max(0, item.amount || 0), 0);

  // Variable costs: check if items are per-customer or fixed monthly pool
  let perUnitVariable = 0;
  let flatVariable = 0;

  variableCosts.forEach(item => {
    const val = Math.max(0, item.amount || 0);
    if (item.isPerUnit !== false) {
      perUnitVariable += val;
    } else {
      flatVariable += val;
    }
  });

  const totalVariableCost = (perUnitVariable * safeCustomers) + flatVariable;
  const totalCost = totalFixedCost + totalVariableCost;
  const revenue = safePrice * safeCustomers;
  const surplus = revenue - totalCost;
  const isProfitable = surplus >= 0;

  const unitContributionMargin = safePrice - perUnitVariable;

  let breakEvenCustomers: number | null = null;
  if (unitContributionMargin > 0) {
    // Fixed Costs / (Price - Variable Cost per unit)
    // plus any flat variable pool treated as fixed
    const effectiveFixed = totalFixedCost + flatVariable;
    breakEvenCustomers = Math.ceil(effectiveFixed / unitContributionMargin);
  } else {
    // Cannot break even if variable cost per customer is equal or higher than price
    breakEvenCustomers = null;
  }

  // Sustainability status determination
  let sustainabilityStatus: FinancialCalculationResult['sustainabilityStatus'] = 'Needs Improvement';
  let sustainabilityBadge: FinancialCalculationResult['sustainabilityBadge'] = 'amber';

  if (unitContributionMargin <= 0 && safePrice > 0) {
    sustainabilityStatus = 'Negative Unit Economics';
    sustainabilityBadge = 'red';
  } else if (breakEvenCustomers !== null && safeCustomers >= breakEvenCustomers && surplus > 0) {
    sustainabilityStatus = 'Sustainable & Viable';
    sustainabilityBadge = 'emerald';
  } else if (breakEvenCustomers !== null && safeCustomers < breakEvenCustomers) {
    sustainabilityStatus = 'Currently Below Break-even';
    sustainabilityBadge = 'rose';
  } else {
    sustainabilityStatus = 'Needs Improvement';
    sustainabilityBadge = 'amber';
  }

  // G-ONE Educational Insight Generator
  let gOneInsight = '';
  if (safePrice === 0 || safeCustomers === 0) {
    gOneInsight = "Enter a positive price and expected customer count to see how revenue covers your baseline operating costs.";
  } else if (unitContributionMargin <= 0) {
    gOneInsight = `Your price of ₹${safePrice.toLocaleString()} is less than or equal to the direct cost per service (₹${perUnitVariable.toLocaleString()}). At this rate, each additional customer increases your deficit. Consider raising your price, offering bundled services, or negotiating lower material expenses.`;
  } else if (breakEvenCustomers !== null && safeCustomers < breakEvenCustomers) {
    const deficit = breakEvenCustomers - safeCustomers;
    gOneInsight = `Your current scenario does not break even because assumed monthly volume (${safeCustomers} customers) is ${deficit} customer${deficit === 1 ? '' : 's'} below your break-even threshold of ${breakEvenCustomers}. You can reach sustainability by acquiring ${deficit} more customer${deficit === 1 ? '' : 's'}, increasing price from ₹${safePrice.toLocaleString()}, or trimming fixed overheads of ₹${totalFixedCost.toLocaleString()}.`;
  } else if (breakEvenCustomers !== null && safeCustomers === breakEvenCustomers) {
    gOneInsight = `You are exactly at the break-even point (${breakEvenCustomers} customers). Revenue covers all overheads and variable delivery costs without a net surplus or deficit. Every customer acquired beyond this point generates ₹${unitContributionMargin.toLocaleString()} in net entrepreneurial surplus.`;
  } else {
    gOneInsight = `Your scenario is sustainable! At ${safeCustomers} customers and ₹${safePrice.toLocaleString()} per service, you cover your ₹${totalCost.toLocaleString()} total expenses and generate a projected surplus of ₹${surplus.toLocaleString()}. Fixed overheads of ₹${totalFixedCost.toLocaleString()} are amortized across customer volume.`;
  }

  return {
    revenue,
    totalFixedCost,
    totalVariableCost,
    totalCost,
    surplus,
    isProfitable,
    unitContributionMargin,
    breakEvenCustomers,
    sustainabilityStatus,
    sustainabilityBadge,
    gOneInsight,
  };
}

// Pre-packaged CBSE Exhibition Demo Model
export const CBSE_DEMO_SCENARIO: BusinessScenario = {
  id: 'cbse-demo-graphic-design',
  opportunityId: 'opp-graphic-designer',
  opportunityTitle: 'Small Business Branding & Social Graphics',
  skillName: 'Graphic Design',
  scenarioName: 'Graphic Design Starter Pack',
  problem: 'Local neighbourhood retail shops, cafes, and coaching institutes need professional flyers, logos, and social media banners to attract digital customers.',
  customerSegment: 'Local small retail stores, cafes, and neighborhood businesses',
  solution: 'Affordable monthly social graphics and promotional banner design starter pack.',
  valueCreated: {
    problemSolved: 'Replaces amateur, blurry posters with polished, eye-catching marketing collateral.',
    customerBenefit: 'Increases footfall and inquiries for the merchant while saving them 10+ hours of design struggle.',
    willingnessToPay: 'Merchants gain immediate commercial visibility without paying expensive agency retainers.'
  },
  pricePerUnit: 500,
  customerCount: 10,
  fixedCosts: [
    { id: 'fc-1', name: 'Canva Pro / Design Software Subscription', amount: 500, category: 'fixed' },
    { id: 'fc-2', name: 'High-speed Internet connection portion', amount: 800, category: 'fixed' },
    { id: 'fc-3', name: 'Digital Asset Templates & Fonts Fund', amount: 200, category: 'fixed' }
  ],
  variableCosts: [
    { id: 'vc-1', name: 'Client communication, mobile data & revisions', amount: 60, category: 'variable', isPerUnit: true },
    { id: 'vc-2', name: 'Sample color proof prints / mockup previews', amount: 40, category: 'variable', isPerUnit: true }
  ],
  revenue: 5000,
  totalFixedCost: 1500,
  totalVariableCost: 1000,
  totalCost: 2500,
  surplus: 2500,
  breakEvenCustomers: 4, // 1500 / (500 - 100) = 3.75 -> 4
  timestamp: new Date().toISOString(),
  notes: 'Preloaded demonstration model for CBSE Skill Expo judges.'
};

export const CBSE_PRESET_SCENARIOS: BusinessScenario[] = [
  CBSE_DEMO_SCENARIO,
  {
    id: 'cbse-preset-photography',
    opportunityId: 'product_photography_service',
    opportunityTitle: 'Product Photography & WhatsApp Catalog',
    skillName: 'Photography',
    scenarioName: 'Product Photography Session',
    problem: 'Handmade artisans and home bakers take dim, blurry phone pictures that lower conversion rates on WhatsApp and Instagram.',
    customerSegment: 'Home bakers, boutique jewelers & craft sellers',
    solution: 'Turnkey 5-item mobile product photoshoot with color calibration, clean white backdrop, and 2 ready-to-post story cards.',
    valueCreated: {
      problemSolved: 'Transforms dark, amateur shots into crisp, high-converting commercial product photos.',
      customerBenefit: 'Increases online orders by up to 35% with professional visual presentation.',
      willingnessToPay: 'Sellers willingly pay ₹800 vs ₹15,000+ commercial agency studio fees.'
    },
    pricePerUnit: 800,
    customerCount: 8,
    fixedCosts: [
      { id: 'pfc-1', name: 'White backdrop board & portable reflector kit amortized', amount: 300, category: 'fixed' },
      { id: 'pfc-2', name: 'Cloud storage subscription (Google One / Drive)', amount: 250, category: 'fixed' },
      { id: 'pfc-3', name: 'Mobile phone tripod & LED ring light battery fund', amount: 200, category: 'fixed' }
    ],
    variableCosts: [
      { id: 'pvc-1', name: 'Local metro/bus transit to client location', amount: 100, category: 'variable', isPerUnit: true },
      { id: 'pvc-2', name: 'Mobile data upload bandwidth & print index sheet', amount: 50, category: 'variable', isPerUnit: true }
    ],
    revenue: 6400,
    totalFixedCost: 750,
    totalVariableCost: 1200,
    totalCost: 1950,
    surplus: 4450,
    breakEvenCustomers: 2, // 750 / (800 - 150) = 1.15 -> 2
    timestamp: new Date().toISOString(),
    notes: 'High-margin visual service with minimal capital expenditure.'
  },
  {
    id: 'cbse-preset-coding',
    opportunityId: 'coding_and_design_experience_studio',
    opportunityTitle: 'Single-Page Business Showcase Website',
    skillName: 'Coding & Web Development',
    scenarioName: 'Responsive Business Website Package',
    problem: 'Local doctors, tutoring centers, and boutique stores have no web presence or rely on outdated, unverified Google Business pages.',
    customerSegment: 'Private clinics, coaching institutes, local service providers',
    solution: 'Fast, responsive 1-page mobile-friendly website with WhatsApp inquiry integration, Google Map embed, and contact form.',
    valueCreated: {
      problemSolved: 'Gives local businesses immediate credibility and automated customer inquiry capture.',
      customerBenefit: 'Attracts nearby search queries and enables 1-tap WhatsApp booking.',
      willingnessToPay: 'Affordable one-time build cost compared to IT firm quotes of ₹25,000+.'
    },
    pricePerUnit: 2500,
    customerCount: 4,
    fixedCosts: [
      { id: 'cfc-1', name: 'Domain reseller subscription / developer portal', amount: 600, category: 'fixed' },
      { id: 'cfc-2', name: 'High-speed broadband internet allocation', amount: 800, category: 'fixed' },
      { id: 'cfc-3', name: 'GitHub Pro / Hosting tooling buffer', amount: 300, category: 'fixed' }
    ],
    variableCosts: [
      { id: 'cvc-1', name: 'Domain name registration per client (.in / .com)', amount: 650, category: 'variable', isPerUnit: true },
      { id: 'cvc-2', name: 'Client scoping meeting travel & documentation', amount: 150, category: 'variable', isPerUnit: true }
    ],
    revenue: 10000,
    totalFixedCost: 1700,
    totalVariableCost: 3200,
    totalCost: 4900,
    surplus: 5100,
    breakEvenCustomers: 1, // 1700 / (2500 - 800) = 1
    timestamp: new Date().toISOString(),
    notes: 'Premium technical micro-service for senior secondary CS students.'
  },
  {
    id: 'cbse-preset-upcycling',
    opportunityId: 'upcycled_craft_accessories',
    opportunityTitle: 'Upcycled Denim & Fabric Tote Bags',
    skillName: 'Tailoring & Sewing',
    scenarioName: 'Eco Tote Bags & Pouches Batch',
    problem: 'Single-use plastic bags are polluting communities while discarded denim jeans and tailoring scrap fabrics fill landfills.',
    customerSegment: 'Eco-conscious students, school book fair shoppers, local organic grocery buyers',
    solution: 'Durable, stylish multi-pocket tote bags made from cleaned discarded denim jeans with reinforced handles.',
    valueCreated: {
      problemSolved: 'Replaces flimsy plastic bags with attractive zero-waste carry solutions.',
      customerBenefit: 'Machine washable, heavy-duty load capacity (up to 10kg), and unique handcrafted design.',
      willingnessToPay: 'Students and environmentally conscious consumers readily pay ₹250 for bespoke eco-bags.'
    },
    pricePerUnit: 250,
    customerCount: 25,
    fixedCosts: [
      { id: 'ufc-1', name: 'Sewing machine maintenance, oil & spare needle set', amount: 250, category: 'fixed' },
      { id: 'ufc-2', name: 'Fabric cutting shears sharpening & pattern stencil kit', amount: 150, category: 'fixed' },
      { id: 'ufc-3', name: 'School exhibition display table fee', amount: 200, category: 'fixed' }
    ],
    variableCosts: [
      { id: 'uvc-1', name: 'Scrap denim sanitization, thread & zipper trims', amount: 60, category: 'variable', isPerUnit: true },
      { id: 'uvc-2', name: 'Handcrafted kraft paper brand tag & jute string', amount: 15, category: 'variable', isPerUnit: true }
    ],
    revenue: 6250,
    totalFixedCost: 600,
    totalVariableCost: 1875,
    totalCost: 2475,
    surplus: 3775,
    breakEvenCustomers: 4, // 600 / (250 - 75) = 3.42 -> 4
    timestamp: new Date().toISOString(),
    notes: 'Sustainable vocational production model with high community engagement.'
  },
  {
    id: 'cbse-preset-farming',
    opportunityId: 'organic_balcony_farming',
    opportunityTitle: 'Organic Balcony Herb & Microgreen Planters',
    skillName: 'Organic Farming',
    scenarioName: 'Self-Watering Balcony Herb Kit',
    problem: 'Urban apartment dwellers want fresh, chemical-free culinary herbs (mint, basil, coriander) but lack ground soil or gardening knowledge.',
    customerSegment: 'Urban apartment families, home cooking enthusiasts, school science clubs',
    solution: 'Pre-seeded, nutrient-enriched coco-peat planter kit with companion care calendar and organic compost booster.',
    valueCreated: {
      problemSolved: 'Eliminates gardening failure with foolproof pre-mixed soil substrate and hardy seed varieties.',
      customerBenefit: 'Harvest fresh pesticide-free herbs right from kitchen window sills year-round.',
      willingnessToPay: 'Urban households gladly pay ₹650 for a complete, thriving ready-to-grow kit.'
    },
    pricePerUnit: 650,
    customerCount: 12,
    fixedCosts: [
      { id: 'ffc-1', name: 'Bulk coco-peat compressing tray & mixing shovel', amount: 350, category: 'fixed' },
      { id: 'ffc-2', name: 'Seed germination testing tray & spray nozzles', amount: 200, category: 'fixed' },
      { id: 'ffc-3', name: 'Community market stall setup banner', amount: 250, category: 'fixed' }
    ],
    variableCosts: [
      { id: 'fvc-1', name: 'Biodegradable fiber pot, organic seeds & neem cake fertilizer', amount: 180, category: 'variable', isPerUnit: true },
      { id: 'fvc-2', name: 'Printed botanical care guide & packaging carton', amount: 35, category: 'variable', isPerUnit: true }
    ],
    revenue: 7800,
    totalFixedCost: 800,
    totalVariableCost: 2580,
    totalCost: 3380,
    surplus: 4420,
    breakEvenCustomers: 2, // 800 / (650 - 215) = 1.83 -> 2
    timestamp: new Date().toISOString(),
    notes: 'Agro-vocational green venture aligned with National Education Policy sustainability goals.'
  },
  {
    id: 'cbse-preset-electronics',
    opportunityId: 'school_tech_maintenance',
    opportunityTitle: 'Community Electronics Diagnostic & Repair Hub',
    skillName: 'Electronics & Circuits',
    scenarioName: 'Appliance Diagnostic & Repair Service',
    problem: 'Households discard repairable table fans, mixers, emergency lights, and chargers due to exorbitant official service center diagnostic fees.',
    customerSegment: 'Neighborhood residential societies, teachers, campus hostel students',
    solution: 'Fixed-fee diagnostic and contact cleaning service with transparent component cost estimates and safety testing.',
    valueCreated: {
      problemSolved: 'Saves appliances from premature e-waste dumping by fixing simple switch/fuse/wire failures.',
      customerBenefit: 'Restores appliance functionality at 80% lower cost than buying new equipment.',
      willingnessToPay: 'Residents appreciate paying ₹350 for trusted, safe diagnosis with test certificate.'
    },
    pricePerUnit: 350,
    customerCount: 15,
    fixedCosts: [
      { id: 'efc-1', name: 'Digital multimeter calibration & safety ESD mat', amount: 300, category: 'fixed' },
      { id: 'efc-2', name: 'Soldering station tips, flux & desoldering pump', amount: 250, category: 'fixed' },
      { id: 'efc-3', name: 'Component storage organizer boxes', amount: 150, category: 'fixed' }
    ],
    variableCosts: [
      { id: 'evc-1', name: 'Heat shrink tubing, solder wire & cleaner spray per unit', amount: 40, category: 'variable', isPerUnit: true },
      { id: 'evc-2', name: 'Safety checklist receipt & tag print', amount: 10, category: 'variable', isPerUnit: true }
    ],
    revenue: 5250,
    totalFixedCost: 700,
    totalVariableCost: 750,
    totalCost: 1450,
    surplus: 3800,
    breakEvenCustomers: 3, // 700 / (350 - 50) = 2.33 -> 3
    timestamp: new Date().toISOString(),
    notes: 'Vocational practical maintenance model promoting circular economy.'
  }
];
