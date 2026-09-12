import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BusinessScenario, CostItem, calculateFinancials, CBSE_DEMO_SCENARIO } from '../data/business';
import { Opportunity } from '../data/opportunities';

interface BusinessContextType {
  scenarios: BusinessScenario[];
  activeScenario: BusinessScenario | null;
  setActiveScenario: React.Dispatch<React.SetStateAction<BusinessScenario | null>>;
  saveScenario: (scenario: BusinessScenario) => void;
  deleteScenario: (id: string) => void;
  loadDemoScenario: () => BusinessScenario;
  createScenarioFromOpportunity: (opportunity: Opportunity | {
    id: string;
    title: string;
    requiredSkills?: string[];
    skillsNeeded?: string[];
    problems?: string[];
    targetUsers?: string[];
    solution?: string;
    problemSolution?: {
      problem: string;
      solution: string;
      targetUser: string;
    };
    description?: string;
  }) => BusinessScenario;
  comparisonScenarioIds: string[];
  setComparisonScenarioIds: React.Dispatch<React.SetStateAction<string[]>>;
  toggleComparisonScenario: (id: string) => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

const STORAGE_KEY = 'ks_business_scenarios';

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scenarios, setScenarios] = useState<BusinessScenario[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored business scenarios', e);
    }
    // Default with CBSE Demo scenario
    return [CBSE_DEMO_SCENARIO];
  });

  const [activeScenario, setActiveScenario] = useState<BusinessScenario | null>(() => {
    return scenarios[0] || CBSE_DEMO_SCENARIO;
  });

  const [comparisonScenarioIds, setComparisonScenarioIds] = useState<string[]>(() => {
    return scenarios.slice(0, 3).map(s => s.id);
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
    } catch (e) {
      console.error('Failed to persist scenarios to localStorage', e);
    }
  }, [scenarios]);

  const saveScenario = useCallback((updated: BusinessScenario) => {
    // Recalculate transparent figures before saving
    const math = calculateFinancials(
      updated.pricePerUnit,
      updated.customerCount,
      updated.fixedCosts,
      updated.variableCosts
    );

    const fullScenario: BusinessScenario = {
      ...updated,
      revenue: math.revenue,
      totalFixedCost: math.totalFixedCost,
      totalVariableCost: math.totalVariableCost,
      totalCost: math.totalCost,
      surplus: math.surplus,
      breakEvenCustomers: math.breakEvenCustomers,
      timestamp: new Date().toISOString(),
    };

    setScenarios(prev => {
      const idx = prev.findIndex(s => s.id === fullScenario.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = fullScenario;
        return copy;
      }
      return [fullScenario, ...prev];
    });

    setActiveScenario(fullScenario);
  }, []);

  const deleteScenario = useCallback((id: string) => {
    setScenarios(prev => {
      const remaining = prev.filter(s => s.id !== id);
      setActiveScenario(curr => {
        if (curr?.id === id) {
          return remaining[0] || null;
        }
        return curr;
      });
      return remaining;
    });
    setComparisonScenarioIds(prev => prev.filter(item => item !== id));
  }, []);

  const loadDemoScenario = useCallback((): BusinessScenario => {
    setScenarios(prev => {
      const existing = prev.find(s => s.id === CBSE_DEMO_SCENARIO.id);
      if (!existing) {
        return [CBSE_DEMO_SCENARIO, ...prev];
      }
      return prev;
    });
    setActiveScenario(CBSE_DEMO_SCENARIO);
    return CBSE_DEMO_SCENARIO;
  }, []);

  const createScenarioFromOpportunity = useCallback((opportunity: any): BusinessScenario => {
    const defaultFixed: CostItem[] = [
      { id: `fc-${Date.now()}-1`, name: 'Essential software tools & workspace setup', amount: 800, category: 'fixed' },
      { id: `fc-${Date.now()}-2`, name: 'Communications, internet & research overhead', amount: 700, category: 'fixed' },
    ];

    const defaultVariable: CostItem[] = [
      { id: `vc-${Date.now()}-1`, name: 'Per-order direct materials & coordination', amount: 80, category: 'variable', isPerUnit: true },
      { id: `vc-${Date.now()}-2`, name: 'Local transport & deliverable handover', amount: 50, category: 'variable', isPerUnit: true },
    ];

    const defaultPrice = 600;
    const defaultCustomers = 10;

    const math = calculateFinancials(defaultPrice, defaultCustomers, defaultFixed, defaultVariable);

    const problemText = opportunity.problemProfile?.overview || 
      (Array.isArray(opportunity.problems) ? opportunity.problems[0] : null) || 
      opportunity.problemSolution?.problem || 
      `Clients require high-quality ${opportunity.title?.toLowerCase() || 'service'} support.`;

    const customerText = opportunity.usersProfile?.primaryAudience || 
      (Array.isArray(opportunity.targetUsers) ? opportunity.targetUsers[0] : null) || 
      opportunity.problemSolution?.targetUser || 
      'Local businesses and institutions';

    const solutionText = opportunity.solutionProfile?.summary || 
      opportunity.solution || 
      opportunity.problemSolution?.solution || 
      opportunity.description || 
      `Structured, practical ${opportunity.title || 'service'} package.`;

    const skillText = opportunity.requiredSkills?.[0] || opportunity.skillsNeeded?.[0] || 'Technical Skill';

    const newScenario: BusinessScenario = {
      id: `scenario-${Date.now()}`,
      opportunityId: opportunity.id || `opp-${Date.now()}`,
      opportunityTitle: opportunity.title || 'Business Initiative',
      skillName: skillText,
      scenarioName: 'Initial Hypothesis',
      problem: problemText,
      customerSegment: customerText,
      solution: solutionText,
      valueCreated: {
        problemSolved: `Eliminates operational bottlenecks and improves presentation for ${(opportunity.title || 'service').toLowerCase()}.`,
        customerBenefit: 'Provides high-quality results affordably without expensive corporate agency overhead.',
        willingnessToPay: 'Client saves significant time and gains measurable commercial value.'
      },
      pricePerUnit: defaultPrice,
      customerCount: defaultCustomers,
      fixedCosts: defaultFixed,
      variableCosts: defaultVariable,
      revenue: math.revenue,
      totalFixedCost: math.totalFixedCost,
      totalVariableCost: math.totalVariableCost,
      totalCost: math.totalCost,
      surplus: math.surplus,
      breakEvenCustomers: math.breakEvenCustomers,
      timestamp: new Date().toISOString(),
      notes: 'Custom educational scenario generated from selected opportunity.'
    };

    saveScenario(newScenario);
    return newScenario;
  }, [saveScenario]);

  const toggleComparisonScenario = useCallback((id: string) => {
    setComparisonScenarioIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id]; // keep max 3
      }
      return [...prev, id];
    });
  }, []);

  return (
    <BusinessContext.Provider
      value={{
        scenarios,
        activeScenario,
        setActiveScenario,
        saveScenario,
        deleteScenario,
        loadDemoScenario,
        createScenarioFromOpportunity,
        comparisonScenarioIds,
        setComparisonScenarioIds,
        toggleComparisonScenario,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};

