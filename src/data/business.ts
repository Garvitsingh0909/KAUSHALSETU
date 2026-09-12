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
  scenarioName: 'CBSE Expo Demo Model',
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
    { id: 'vc-1', name: 'Client communication, mobile data & revision revisions', amount: 60, category: 'variable', isPerUnit: true },
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
