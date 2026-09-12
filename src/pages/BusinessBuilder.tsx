import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calculator, 
  HelpCircle, 
  Save, 
  RefreshCw, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  FileText, 
  Sparkles, 
  Share2, 
  Layers,
  ArrowUpRight,
  Target
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { useProfile } from '../context/ProfileContext';
import { OPPORTUNITIES } from '../data/opportunities';
import { CostItem, calculateFinancials, BusinessScenario, CBSE_DEMO_SCENARIO } from '../data/business';

export const BusinessBuilder: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { 
    scenarios, 
    activeScenario, 
    setActiveScenario, 
    saveScenario, 
    loadDemoScenario, 
    createScenarioFromOpportunity,
    comparisonScenarioIds,
    toggleComparisonScenario
  } = useBusiness();
  const { allSkills, customOpportunities } = useProfile();

  const availableOpportunities = useMemo(() => {
    return [...OPPORTUNITIES, ...(customOpportunities || [])];
  }, [customOpportunities]);

  const exportCardRef = useRef<HTMLDivElement>(null);

  // Selected Tab in the builder
  const [activeTab, setActiveTab] = useState<'model' | 'simulator' | 'comparison' | 'summary'>('model');

  // Working state for active scenario editing
  const [opportunityId, setOpportunityId] = useState<string>('');
  const [scenarioName, setScenarioName] = useState('Basic Scenario');
  const [skillName, setSkillName] = useState('Skill');
  const [problem, setProblem] = useState('');
  const [customerSegment, setCustomerSegment] = useState('');
  const [solution, setSolution] = useState('');
  const [valueCreated, setValueCreated] = useState({
    problemSolved: '',
    customerBenefit: '',
    willingnessToPay: '',
  });

  const [pricePerUnit, setPricePerUnit] = useState<number>(500);
  const [customerCount, setCustomerCount] = useState<number>(10);
  const [fixedCosts, setFixedCosts] = useState<CostItem[]>([]);
  const [variableCosts, setVariableCosts] = useState<CostItem[]>([]);

  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [showLiteracyModal, setShowLiteracyModal] = useState<string | null>(null);

  // Initialize from search param or active scenario
  useEffect(() => {
    const oppIdParam = searchParams.get('opportunityId');
    if (oppIdParam) {
      const opp = availableOpportunities.find(o => o.id === oppIdParam);
      if (opp) {
        const created = createScenarioFromOpportunity(opp);
        loadScenarioIntoState(created);
        return;
      }
    }

    if (activeScenario) {
      loadScenarioIntoState(activeScenario);
    } else {
      const demo = loadDemoScenario();
      loadScenarioIntoState(demo);
    }
  }, [searchParams, availableOpportunities]);

  const loadScenarioIntoState = (sc: BusinessScenario) => {
    setOpportunityId(sc.opportunityId);
    setScenarioName(sc.scenarioName || 'Scenario');
    setSkillName(sc.skillName || 'Graphic Design');
    setProblem(sc.problem || '');
    setCustomerSegment(sc.customerSegment || '');
    setSolution(sc.solution || '');
    setValueCreated({
      problemSolved: sc.valueCreated?.problemSolved || '',
      customerBenefit: sc.valueCreated?.customerBenefit || '',
      willingnessToPay: sc.valueCreated?.willingnessToPay || '',
    });
    setPricePerUnit(sc.pricePerUnit || 500);
    setCustomerCount(sc.customerCount || 10);
    setFixedCosts(sc.fixedCosts || []);
    setVariableCosts(sc.variableCosts || []);
  };

  // Real-time financial calculations
  const financials = useMemo(() => {
    return calculateFinancials(pricePerUnit, customerCount, fixedCosts, variableCosts);
  }, [pricePerUnit, customerCount, fixedCosts, variableCosts]);

  // Handle saving current scenario
  const handleSaveCurrentScenario = () => {
    const idToSave = activeScenario?.id || `sc-${Date.now()}`;
    const opp = availableOpportunities.find(o => o.id === opportunityId);

    const updated: BusinessScenario = {
      id: idToSave,
      opportunityId: opportunityId || 'custom-opp',
      opportunityTitle: opp ? opp.title : (activeScenario?.opportunityTitle || 'Skill-Based Initiative'),
      skillName: skillName,
      scenarioName: scenarioName,
      problem: problem,
      customerSegment: customerSegment,
      solution: solution,
      valueCreated: valueCreated,
      pricePerUnit: pricePerUnit,
      customerCount: customerCount,
      fixedCosts: fixedCosts,
      variableCosts: variableCosts,
      revenue: financials.revenue,
      totalFixedCost: financials.totalFixedCost,
      totalVariableCost: financials.totalVariableCost,
      totalCost: financials.totalCost,
      surplus: financials.surplus,
      breakEvenCustomers: financials.breakEvenCustomers,
      timestamp: new Date().toISOString(),
    };

    saveScenario(updated);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  // Add cost item helpers
  const handleAddFixedCost = () => {
    const newItem: CostItem = {
      id: `fc-${Date.now()}`,
      name: 'New fixed expense (e.g. workspace, license)',
      amount: 300,
      category: 'fixed'
    };
    setFixedCosts([...fixedCosts, newItem]);
  };

  const handleAddVariableCost = () => {
    const newItem: CostItem = {
      id: `vc-${Date.now()}`,
      name: 'New delivery expense per customer (e.g. transport, materials)',
      amount: 50,
      category: 'variable',
      isPerUnit: true
    };
    setVariableCosts([...variableCosts, newItem]);
  };

  const handleUpdateCost = (list: CostItem[], setList: React.Dispatch<React.SetStateAction<CostItem[]>>, id: string, field: 'name' | 'amount', val: any) => {
    setList(list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [field]: field === 'amount' ? Math.max(0, parseFloat(val) || 0) : val
        };
      }
      return item;
    }));
  };

  const handleDeleteCost = (list: CostItem[], setList: React.Dispatch<React.SetStateAction<CostItem[]>>, id: string) => {
    setList(list.filter(item => item.id !== id));
  };

  // Quick preset prices
  const PRESET_PRICES = [300, 500, 700, 1000];
  const PRESET_CUSTOMERS = [5, 10, 20, 30];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Banner & Progress Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-600/10 via-blue-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Phase 3: Entrepreneurship & Financial Simulator
              </span>
              <span className="text-xs text-slate-400">CBSE Skill Expo 2026</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="cbse-demo-loader-btn"
                onClick={() => {
                  const demo = loadDemoScenario();
                  loadScenarioIntoState(demo);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-semibold transition-colors flex items-center gap-2"
                title="Loads standard Graphic Design Service model for judges"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Load CBSE Demo Mode
              </button>

              <button
                id="save-scenario-btn"
                onClick={handleSaveCurrentScenario}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-lg shadow-emerald-900/30 flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5" />
                {saveSuccessMsg ? 'Scenario Saved!' : 'Save Model'}
              </button>
            </div>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-2">
            Build My Business Model
          </h1>
          <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
            Translate your skill-based opportunity from Phase 2 into a concrete, sustainable economic activity. 
            Experiment with pricing, customer volumes, and real cost structures to discover your break-even point.
          </p>

          {/* Connected Continuum Path */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Integrated Kaushal Setu Continuum
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 overflow-x-auto pb-2 scrollbar-none">
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-blue-400 font-medium whitespace-nowrap">1. My Skills</span>
              <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-indigo-400 font-medium whitespace-nowrap">2. Opportunity</span>
              <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-amber-400 font-medium whitespace-nowrap">3. Problem & Customer</span>
              <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-purple-400 font-medium whitespace-nowrap">4. Solution</span>
              <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 whitespace-nowrap">
                5. Financial Model & Break-Even
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Module Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        <button
          id="tab-business-model"
          onClick={() => setActiveTab('model')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'model'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          1. Business Model Builder
        </button>

        <button
          id="tab-financial-simulator"
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'simulator'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Calculator className="w-4 h-4" />
          2. Financial Simulator & What-If
        </button>

        <button
          id="tab-comparison-matrix"
          onClick={() => setActiveTab('comparison')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'comparison'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          3. Scenario Comparison ({scenarios.length})
        </button>

        <button
          id="tab-summary-card"
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'summary'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/40'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          4. Exportable Model Summary
        </button>
      </div>

      {/* TAB 1: BUSINESS MODEL BUILDER */}
      {activeTab === 'model' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Step 0: Opportunity Context */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Opportunity Foundation</span>
                <button
                  onClick={() => navigate('/opportunities')}
                  className="text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1"
                >
                  Browse other opportunities <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Selected Opportunity</label>
                  <select
                    id="select-opportunity-dropdown"
                    value={opportunityId}
                    onChange={(e) => {
                      const selected = availableOpportunities.find(o => o.id === e.target.value);
                      if (selected) {
                        setOpportunityId(selected.id);
                        const skillFound = (allSkills || []).find(s => s && selected.requiredSkills?.includes(s.id));
                        setSkillName(skillFound?.name || selected.requiredSkills?.[0] || 'Technical Skill');
                        setProblem(selected.problemProfile?.overview || selected.problems?.[0] || `Demand exists for ${selected.title}.`);
                        setCustomerSegment(selected.usersProfile?.primaryAudience || selected.targetUsers?.[0] || 'Small businesses and organizations');
                        setSolution(selected.solutionProfile?.summary || selected.solution);
                      }
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    {availableOpportunities.map(opp => (
                      <option key={opp.id} value={opp.id}>
                        {opp.title} ({opp.requiredSkills?.slice(0, 2).join(', ')})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Scenario Label</label>
                  <input
                    id="input-scenario-name"
                    type="text"
                    value={scenarioName}
                    onChange={(e) => setScenarioName(e.target.value)}
                    placeholder="e.g. Basic, Growth, or Premium"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 01: Problem */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex items-center justify-center border border-blue-500/40">
                  01
                </span>
                <h2 className="text-base font-bold text-white">THE PROBLEM</h2>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                What friction, struggle, or unfulfilled need does the customer face in their daily routine or work?
              </p>
              <textarea
                id="input-problem-textarea"
                rows={3}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Describe the specific real-world problem..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Step 02: Customer */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center border border-indigo-500/40">
                  02
                </span>
                <h2 className="text-base font-bold text-white">THE CUSTOMER SEGMENT</h2>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Who experiences this problem most acutely and has both the authority and incentive to pay?
              </p>
              <input
                id="input-customer-segment"
                type="text"
                value={customerSegment}
                onChange={(e) => setCustomerSegment(e.target.value)}
                placeholder="e.g. Local bakeries, independent tutors, residential housing societies"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 mb-3"
              />
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-slate-500 font-medium">Quick suggestions:</span>
                {['Local neighborhood shops', 'Tutors & small academies', 'Restaurants & cafes', 'Residential societies', 'Handicraft artisans'].map((seg, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCustomerSegment(seg)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                  >
                    + {seg}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 03: Solution */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center border border-amber-500/40">
                  03
                </span>
                <h2 className="text-base font-bold text-white">THE SOLUTION</h2>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                What concrete service or deliverable will you provide using your acquired skill set?
              </p>
              <textarea
                id="input-solution-textarea"
                rows={3}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="Describe your service package or tangible deliverable..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Step 04: What Value Do You Create? */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center border border-emerald-500/40">
                  04
                </span>
                <h2 className="text-base font-bold text-white">WHAT VALUE DO YOU CREATE?</h2>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Economic viability requires creating distinct, measurable value that makes paying you worthwhile for the client.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    1. What specifically improves for the customer?
                  </label>
                  <input
                    type="text"
                    value={valueCreated.customerBenefit}
                    onChange={(e) => setValueCreated({ ...valueCreated, customerBenefit: e.target.value })}
                    placeholder="e.g. Saves them 8 hours weekly and boosts walk-in customer inquiries by 25%"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    2. Why would the customer pay for this rather than doing it themselves?
                  </label>
                  <input
                    type="text"
                    value={valueCreated.willingnessToPay}
                    onChange={(e) => setValueCreated({ ...valueCreated, willingnessToPay: e.target.value })}
                    placeholder="e.g. They lack specialized technical skills and commercial software subscriptions"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Advance to simulator action */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  handleSaveCurrentScenario();
                  setActiveTab('simulator');
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-sm shadow-xl flex items-center gap-2"
              >
                Continue to Pricing & Financial Simulator
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Sidebar: Live Preview Snapshot */}
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  Model Snapshot
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  financials.sustainabilityBadge === 'emerald' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  financials.sustainabilityBadge === 'rose' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                  'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {financials.sustainabilityStatus}
                </span>
              </div>

              <div className="space-y-3 text-xs mb-6">
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Hypothetical Price</span>
                  <span className="font-bold text-white">₹{pricePerUnit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Customer Volume</span>
                  <span className="font-bold text-white">{customerCount} / month</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Projected Revenue</span>
                  <span className="font-bold text-emerald-400">₹{financials.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Total Costs</span>
                  <span className="font-bold text-slate-300">₹{financials.totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Surplus / (Deficit)</span>
                  <span className={`font-bold ${financials.surplus >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {financials.surplus >= 0 ? `+₹${financials.surplus.toLocaleString()}` : `-₹${Math.abs(financials.surplus).toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">Break-Even Needed</span>
                  <span className="font-bold text-blue-400">
                    {financials.breakEvenCustomers !== null ? `${financials.breakEvenCustomers} customers` : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-blue-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  G-ONE Financial Teacher
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {financials.gOneInsight}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FINANCIAL SIMULATOR & WHAT-IF LAB */}
      {activeTab === 'simulator' && (
        <div className="space-y-8">
          {/* Main 3 High-Impact Cards: Revenue, Cost, Surplus */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* REVENUE CALCULATOR */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  Revenue Calculator
                </span>
                <button
                  onClick={() => setShowLiteracyModal('revenue')}
                  className="text-slate-400 hover:text-white"
                  title="What is Revenue?"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-400 mb-1">Formula: Price × Customers</div>
              <div className="text-xs text-slate-300 font-mono mb-4">
                ₹{pricePerUnit.toLocaleString()} × {customerCount} customers
              </div>

              <div className="text-3xl lg:text-4xl font-extrabold text-emerald-400 tracking-tight mb-2">
                ₹{financials.revenue.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Illustrative monthly scenario</div>
            </div>

            {/* COST CALCULATOR */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" />
                  Total Operating Costs
                </span>
                <button
                  onClick={() => setShowLiteracyModal('cost')}
                  className="text-slate-400 hover:text-white"
                  title="What are Fixed & Variable Costs?"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-400 mb-1">Formula: Fixed Costs + Variable Costs</div>
              <div className="text-xs text-slate-300 font-mono mb-4">
                ₹{financials.totalFixedCost.toLocaleString()} + ₹{financials.totalVariableCost.toLocaleString()}
              </div>

              <div className="text-3xl lg:text-4xl font-extrabold text-amber-400 tracking-tight mb-2">
                ₹{financials.totalCost.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Monthly operational baseline</div>
            </div>

            {/* SURPLUS / DEFICIT */}
            <div className={`bg-slate-900 border rounded-3xl p-6 relative overflow-hidden shadow-xl ${
              financials.surplus >= 0 ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-rose-500/40 bg-rose-950/10'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  financials.surplus >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  {financials.surplus >= 0 ? 'Monthly Surplus' : 'Monthly Deficit'}
                </span>
                <button
                  onClick={() => setShowLiteracyModal('surplus')}
                  className="text-slate-400 hover:text-white"
                  title="What is Surplus / Profit?"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-400 mb-1">Formula: Revenue − Total Costs</div>
              <div className="text-xs text-slate-300 font-mono mb-4">
                ₹{financials.revenue.toLocaleString()} − ₹{financials.totalCost.toLocaleString()}
              </div>

              <div className={`text-3xl lg:text-4xl font-extrabold tracking-tight mb-2 ${
                financials.surplus >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {financials.surplus >= 0 ? `+₹${financials.surplus.toLocaleString()}` : `-₹${Math.abs(financials.surplus).toLocaleString()}`}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {financials.surplus >= 0 ? 'Available for savings, reinvestment or student earnings' : 'Loss requiring cost adjustment or more customers'}
              </div>
            </div>
          </div>

          {/* Interactive Variable Tuning: Sliders & Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* PRICING SIMULATOR */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    Set Your Selling Price
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    How much will you charge per customer or completed service?
                  </p>
                </div>
                <span className="text-xl font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                  ₹{pricePerUnit.toLocaleString()}
                </span>
              </div>

              {/* Preset buttons */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Test Common Hypothetical Tiers:</label>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_PRICES.map(p => (
                    <button
                      key={p}
                      id={`preset-price-${p}`}
                      type="button"
                      onClick={() => setPricePerUnit(p)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        pricePerUnit === p 
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-900/40' 
                          : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      ₹{p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider */}
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>₹100 (Budget)</span>
                  <span>Slider Adjustment</span>
                  <span>₹3,000 (Premium)</span>
                </div>
                <input
                  id="slider-price-per-unit"
                  type="range"
                  min={100}
                  max={3000}
                  step={50}
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(parseInt(e.target.value) || 0)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs text-slate-400 leading-relaxed">
                💡 <strong className="text-slate-300">Unit Contribution:</strong> Each service sold contributes{' '}
                <span className="text-emerald-400 font-bold">
                  ₹{Math.max(0, financials.unitContributionMargin).toLocaleString()}
                </span>{' '}
                towards paying off your fixed monthly overheads.
              </div>
            </div>

            {/* CUSTOMER SIMULATOR */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    How Many Customers?
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Estimated volume of customers or orders serviced in a month
                  </p>
                </div>
                <span className="text-xl font-mono font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-xl border border-blue-500/20">
                  {customerCount} / mo
                </span>
              </div>

              {/* Preset buttons */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Test Realistic Volume Scenarios:</label>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_CUSTOMERS.map(c => (
                    <button
                      key={c}
                      id={`preset-customers-${c}`}
                      type="button"
                      onClick={() => setCustomerCount(c)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        customerCount === c 
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/40' 
                          : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {c} Customers
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider */}
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>1 Customer</span>
                  <span>Monthly Target</span>
                  <span>50 Customers</span>
                </div>
                <input
                  id="slider-customer-count"
                  type="range"
                  min={1}
                  max={50}
                  step={1}
                  value={customerCount}
                  onChange={(e) => setCustomerCount(parseInt(e.target.value) || 1)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs text-slate-400 leading-relaxed">
                📊 <strong className="text-slate-300">Customer Capacity:</strong> At {customerCount} customers/month, 
                you service approximately{' '}
                <span className="text-blue-300 font-bold">
                  {Math.max(1, Math.round(customerCount / 4))} order(s) per week
                </span>.
              </div>
            </div>
          </div>

          {/* VISUAL BREAK-EVEN POINT ANALYSIS */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    Key Concept
                  </span>
                  <h3 className="text-lg font-bold text-white">THE BREAK-EVEN POINT</h3>
                  <button onClick={() => setShowLiteracyModal('breakeven')} className="text-slate-400 hover:text-white">
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-400 max-w-2xl">
                  Break-even is the milestone where your total sales revenue exactly matches your total operational expenses. 
                  Below this, you run at a deficit; above this, you generate surplus.
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400">Required Customers to Break Even</div>
                <div className="text-3xl font-extrabold text-blue-400 font-mono">
                  {financials.breakEvenCustomers !== null ? `${financials.breakEvenCustomers}` : 'N/A'}
                  <span className="text-xs font-normal text-slate-400 ml-1">customers</span>
                </div>
              </div>
            </div>

            {/* Visual Step-by-Step Customer Progress Track */}
            {financials.breakEvenCustomers !== null ? (
              <div className="space-y-4">
                <div className="text-xs font-semibold text-slate-400">
                  Visual Customer Roadmap (Break-even threshold at {financials.breakEvenCustomers} customers):
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
                  {Array.from({ length: Math.max(12, financials.breakEvenCustomers + 4) }, (_, i) => i + 1).slice(0, 12).map((num) => {
                    const isBreakEven = num === financials.breakEvenCustomers;
                    const isBelow = num < financials.breakEvenCustomers;
                    const isCurrent = num === customerCount;
                    const isReached = num <= customerCount;

                    return (
                      <div
                        key={num}
                        className={`p-3 rounded-xl border text-center transition-all relative ${
                          isCurrent
                            ? 'ring-2 ring-blue-400 bg-slate-800'
                            : 'bg-slate-800/40'
                        } ${
                          isBreakEven
                            ? 'border-amber-500/80 bg-amber-500/10'
                            : isBelow
                            ? 'border-rose-900/40 text-rose-300'
                            : 'border-emerald-900/40 text-emerald-300'
                        }`}
                      >
                        {isCurrent && (
                          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-blue-500 text-white text-[9px] font-bold">
                            Current
                          </div>
                        )}
                        <div className="text-xs font-bold mb-1">{num}</div>
                        <div className="text-[10px] leading-tight">
                          {isBreakEven ? (
                            <span className="font-bold text-amber-400">BREAK-EVEN</span>
                          ) : isBelow ? (
                            <span className="text-slate-500">Deficit</span>
                          ) : (
                            <span className="text-emerald-400">Surplus</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 text-xs text-slate-400 border-t border-slate-800">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Below Break-Even (Loss)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Break-Even Target ({financials.breakEvenCustomers})
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Above Break-Even (Surplus)
                    </span>
                  </div>

                  <div className="text-slate-300">
                    Status:{' '}
                    <strong className={financials.surplus >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {customerCount >= financials.breakEvenCustomers 
                        ? `${customerCount - financials.breakEvenCustomers} customers above break-even` 
                        : `${financials.breakEvenCustomers - customerCount} customers needed to cover costs`}
                    </strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50 text-rose-300 text-xs">
                ⚠️ Current price does not cover unit variable costs. You cannot break even until price exceeds variable costs per customer.
              </div>
            )}
          </div>

          {/* COST BUILDER: FIXED & VARIABLE COSTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fixed Costs */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Fixed Costs (Overhead)</h3>
                  <p className="text-xs text-slate-400">Monthly costs that stay relatively steady regardless of customers.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddFixedCost}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 border border-slate-700"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Fixed
                </button>
              </div>

              <div className="space-y-2.5">
                {fixedCosts.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleUpdateCost(fixedCosts, setFixedCosts, item.id, 'name', e.target.value)}
                      className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                    />
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                      <span>₹</span>
                      <input
                        type="number"
                        min={0}
                        value={item.amount}
                        onChange={(e) => handleUpdateCost(fixedCosts, setFixedCosts, item.id, 'amount', e.target.value)}
                        className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-right text-white focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => handleDeleteCost(fixedCosts, setFixedCosts, item.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between text-xs font-bold text-slate-300 border-t border-slate-800">
                <span>Total Monthly Fixed Overheads:</span>
                <span className="text-amber-400 font-mono">₹{financials.totalFixedCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Variable Costs */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Variable Costs (Per Customer)</h3>
                  <p className="text-xs text-slate-400">Costs that increase proportionally with each order serviced.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddVariableCost}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 border border-slate-700"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Variable
                </button>
              </div>

              <div className="space-y-2.5">
                {variableCosts.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleUpdateCost(variableCosts, setVariableCosts, item.id, 'name', e.target.value)}
                      className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                    />
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                      <span>₹</span>
                      <input
                        type="number"
                        min={0}
                        value={item.amount}
                        onChange={(e) => handleUpdateCost(variableCosts, setVariableCosts, item.id, 'amount', e.target.value)}
                        className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-right text-white focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500">/cust</span>
                    </div>
                    <button
                      onClick={() => handleDeleteCost(variableCosts, setVariableCosts, item.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between text-xs font-bold text-slate-300 border-t border-slate-800">
                <span>Total Variable Costs ({customerCount} customers):</span>
                <span className="text-amber-400 font-mono">₹{financials.totalVariableCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* WHAT-IF INSTANT TEST COMPARATOR */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-blue-800/40 rounded-3xl p-6 lg:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-base font-bold text-white">WHAT-IF EXPERIMENT LAB</h3>
                <p className="text-xs text-slate-400">See how changing key assumptions alters viability in real-time.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Scenario Quick Shift 1 */}
              <button
                type="button"
                onClick={() => {
                  setPricePerUnit(700);
                  setCustomerCount(15);
                }}
                className="p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-left transition-all"
              >
                <div className="text-xs font-bold text-blue-400 uppercase mb-1">Growth Scenario</div>
                <div className="text-xs text-white font-semibold mb-2">₹700 Price × 15 Customers</div>
                <p className="text-[11px] text-slate-400">Tests higher perceived value with slight scale expansion.</p>
              </button>

              {/* Scenario Quick Shift 2 */}
              <button
                type="button"
                onClick={() => {
                  setPricePerUnit(400);
                  setCustomerCount(25);
                }}
                className="p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-left transition-all"
              >
                <div className="text-xs font-bold text-emerald-400 uppercase mb-1">Volume / Penetration</div>
                <div className="text-xs text-white font-semibold mb-2">₹400 Price × 25 Customers</div>
                <p className="text-[11px] text-slate-400">Tests accessible entry pricing compensated by higher customer volume.</p>
              </button>

              {/* Scenario Quick Shift 3 */}
              <button
                type="button"
                onClick={() => {
                  setPricePerUnit(1000);
                  setCustomerCount(6);
                }}
                className="p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-left transition-all"
              >
                <div className="text-xs font-bold text-purple-400 uppercase mb-1">Premium Bespoke</div>
                <div className="text-xs text-white font-semibold mb-2">₹1,000 Price × 6 Customers</div>
                <p className="text-[11px] text-slate-400">Tests high-touch service requiring fewer total clients to sustain.</p>
              </button>
            </div>

            {/* G-ONE Dynamic Guidance */}
            <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/50 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-blue-300" />
              </div>
              <div className="space-y-1 text-xs">
                <div className="font-bold text-blue-300 uppercase tracking-wider text-[10px]">
                  G-ONE Explanatory Analysis
                </div>
                <p className="text-slate-200 leading-relaxed">
                  {financials.gOneInsight}
                </p>
                <div className="text-[10px] text-slate-400 pt-1">
                  Notice how break-even is sensitive to both fixed overheads and unit contribution margin. Reducing software costs by ₹300 lowers the customers needed to break even immediately.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SCENARIO COMPARISON */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Compare Entrepreneurial Scenarios</h2>
              <p className="text-xs text-slate-400">
                Compare up to 3 different assumption models side-by-side to understand trade-offs in risk, margin, and break-even feasibility.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  // Duplicate active scenario as a new variation
                  const copy: BusinessScenario = {
                    ...activeScenario!,
                    id: `scenario-${Date.now()}`,
                    scenarioName: `${scenarioName} (Variation)`,
                    pricePerUnit: pricePerUnit + 200,
                  };
                  saveScenario(copy);
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg"
              >
                <Plus className="w-3.5 h-3.5" />
                Create New Scenario Variation
              </button>
            </div>
          </div>

          {/* Scenario Selection Checkboxes */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-slate-400 font-semibold self-center">Saved Scenarios:</span>
            {scenarios.map(sc => {
              const isSelected = comparisonScenarioIds.includes(sc.id);
              return (
                <button
                  key={sc.id}
                  onClick={() => toggleComparisonScenario(sc.id)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                    isSelected 
                      ? 'bg-purple-600/20 text-purple-300 border-purple-500/40 shadow-sm'
                      : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '}
                  {sc.scenarioName} ({sc.opportunityTitle.slice(0, 18)}...)
                </button>
              );
            })}
          </div>

          {/* Comparison Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-800/40">
                    <th className="p-4 text-slate-400 font-semibold uppercase tracking-wider w-48">Metric / Dimension</th>
                    {scenarios
                      .filter(s => comparisonScenarioIds.includes(s.id))
                      .slice(0, 3)
                      .map(sc => (
                        <th key={sc.id} className="p-4 text-white font-bold text-sm min-w-[200px]">
                          <div className="flex items-center justify-between">
                            <span>{sc.scenarioName}</span>
                            <button
                              onClick={() => loadScenarioIntoState(sc)}
                              className="text-[10px] text-blue-400 hover:underline font-normal"
                            >
                              Edit in Lab
                            </button>
                          </div>
                          <div className="text-[10px] text-slate-400 font-normal mt-0.5">{sc.opportunityTitle}</div>
                        </th>
                      ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-4 font-semibold text-slate-400">Hypothetical Price</td>
                    {scenarios.filter(s => comparisonScenarioIds.includes(s.id)).slice(0, 3).map(sc => (
                      <td key={sc.id} className="p-4 font-mono font-bold text-white">
                        ₹{sc.pricePerUnit.toLocaleString()}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-semibold text-slate-400">Assumed Monthly Customers</td>
                    {scenarios.filter(s => comparisonScenarioIds.includes(s.id)).slice(0, 3).map(sc => (
                      <td key={sc.id} className="p-4 font-mono font-bold text-white">
                        {sc.customerCount} customers
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-semibold text-slate-400">Projected Revenue</td>
                    {scenarios.filter(s => comparisonScenarioIds.includes(s.id)).slice(0, 3).map(sc => (
                      <td key={sc.id} className="p-4 font-mono font-bold text-emerald-400">
                        ₹{sc.revenue.toLocaleString()}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-semibold text-slate-400">Fixed Operating Overheads</td>
                    {scenarios.filter(s => comparisonScenarioIds.includes(s.id)).slice(0, 3).map(sc => (
                      <td key={sc.id} className="p-4 font-mono text-slate-300">
                        ₹{sc.totalFixedCost.toLocaleString()}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-semibold text-slate-400">Variable Delivery Costs</td>
                    {scenarios.filter(s => comparisonScenarioIds.includes(s.id)).slice(0, 3).map(sc => (
                      <td key={sc.id} className="p-4 font-mono text-slate-300">
                        ₹{sc.totalVariableCost.toLocaleString()}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-semibold text-slate-400">Total Operating Costs</td>
                    {scenarios.filter(s => comparisonScenarioIds.includes(s.id)).slice(0, 3).map(sc => (
                      <td key={sc.id} className="p-4 font-mono font-bold text-amber-400">
                        ₹{sc.totalCost.toLocaleString()}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-semibold text-slate-400">Monthly Surplus / (Deficit)</td>
                    {scenarios.filter(s => comparisonScenarioIds.includes(s.id)).slice(0, 3).map(sc => (
                      <td key={sc.id} className="p-4 font-mono font-extrabold text-sm">
                        <span className={sc.surplus >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                          {sc.surplus >= 0 ? `+₹${sc.surplus.toLocaleString()}` : `-₹${Math.abs(sc.surplus).toLocaleString()}`}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-semibold text-slate-400">Break-Even Volume</td>
                    {scenarios.filter(s => comparisonScenarioIds.includes(s.id)).slice(0, 3).map(sc => (
                      <td key={sc.id} className="p-4 font-mono font-bold text-blue-400">
                        {sc.breakEvenCustomers !== null ? `${sc.breakEvenCustomers} customers` : 'N/A'}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-semibold text-slate-400">Sustainability Evaluation</td>
                    {scenarios.filter(s => comparisonScenarioIds.includes(s.id)).slice(0, 3).map(sc => {
                      const isViable = sc.surplus >= 0 && sc.breakEvenCustomers !== null && sc.customerCount >= sc.breakEvenCustomers;
                      return (
                        <td key={sc.id} className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isViable 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}>
                            {isViable ? 'More Sustainable' : 'Below Break-Even'}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EXPORTABLE MODEL SUMMARY CARD */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">My Business Model Summary Card</h2>
              <p className="text-xs text-slate-400">
                Official CBSE Skill Expo exportable summary for portfolios, teacher evaluations, and project exhibitions.
              </p>
            </div>

            <button
              onClick={() => {
                window.print();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              Print / Save as PDF
            </button>
          </div>

          <div
            ref={exportCardRef}
            id="exportable-business-model-card"
            className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Watermark notice */}
            <div className="absolute top-4 right-6 text-[10px] font-bold text-slate-500 uppercase tracking-wider border border-slate-800 px-3 py-1 rounded-lg">
              Illustrative educational scenario — not a guaranteed income prediction
            </div>

            {/* Header */}
            <div className="border-b border-slate-800 pb-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  KS
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  KAUSHAL SETU • ENTREPRENEURSHIP & FINANCIAL LAB
                </span>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                {scenarioName} — {opportunityId ? (OPPORTUNITIES.find(o => o.id === opportunityId)?.title || activeScenario?.opportunityTitle) : 'Skill Initiative'}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Root Skill: <strong className="text-slate-200">{skillName}</strong> • Generated on {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>

            {/* Core Strategy Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
                <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">Target Problem</div>
                <p className="text-xs text-slate-200 leading-relaxed">{problem || 'Target real-world friction identified.'}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">Customer Group</div>
                <p className="text-xs text-slate-200 leading-relaxed">{customerSegment || 'Defined local business audience.'}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">Proposed Solution</div>
                <p className="text-xs text-slate-200 leading-relaxed">{solution || 'Affordable, skill-backed deliverable.'}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
                <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">Value Created</div>
                <p className="text-xs text-slate-200 leading-relaxed">{valueCreated.customerBenefit || 'Direct customer time/cost savings.'}</p>
              </div>
            </div>

            {/* Financial Model Summary Table */}
            <div className="bg-slate-950/60 rounded-2xl border border-slate-800 p-6 mb-8">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-400" />
                Transparent Monthly Financial Breakdown
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Service Price</div>
                  <div className="text-xl font-bold font-mono text-white mt-1">₹{pricePerUnit.toLocaleString()}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Monthly Customers</div>
                  <div className="text-xl font-bold font-mono text-white mt-1">{customerCount}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Projected Revenue</div>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-1">₹{financials.revenue.toLocaleString()}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Costs</div>
                  <div className="text-xl font-bold font-mono text-amber-400 mt-1">₹{financials.totalCost.toLocaleString()}</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-xs text-slate-400">Net Monthly Financial Outcome:</div>
                  <div className={`text-xl font-extrabold font-mono ${financials.surplus >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {financials.surplus >= 0 ? `+₹${financials.surplus.toLocaleString()} (Surplus)` : `-₹${Math.abs(financials.surplus).toLocaleString()} (Deficit)`}
                  </div>
                </div>

                <div className="text-xs text-slate-300">
                  Break-Even Milestone:{' '}
                  <strong className="text-blue-400 font-mono">
                    {financials.breakEvenCustomers !== null ? `${financials.breakEvenCustomers} customers` : 'N/A'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Pedagogical Takeaway */}
            <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-900/40 text-xs text-slate-300 flex items-start gap-3">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-white font-semibold">Educational Reflection:</strong>{' '}
                {financials.gOneInsight}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Financial Literacy Educational Modal / Tooltip Helper */}
      {showLiteracyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                Financial Literacy Concept
              </h3>
              <button
                onClick={() => setShowLiteracyModal(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            {showLiteracyModal === 'revenue' && (
              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <strong className="text-white text-sm block">What is Revenue?</strong>
                <p>
                  Revenue is the total amount of money brought in from selling your products or services over a period of time, 
                  <strong> before</strong> subtracting any operating expenses or costs.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-800 font-mono text-emerald-400">
                  Revenue = Unit Price × Number of Customers
                </div>
              </div>
            )}

            {showLiteracyModal === 'cost' && (
              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <strong className="text-white text-sm block">Fixed vs. Variable Costs</strong>
                <p>
                  <strong>Fixed Costs:</strong> Expenses you must pay regardless of how many clients you get (e.g. software subscriptions, equipment, basic internet).
                </p>
                <p>
                  <strong>Variable Costs:</strong> Expenses that rise whenever you take on another customer (e.g. materials, packaging, local transit).
                </p>
                <div className="p-2.5 rounded-lg bg-slate-800 font-mono text-amber-400">
                  Total Cost = Fixed Overhead + (Per-Customer Cost × Volume)
                </div>
              </div>
            )}

            {showLiteracyModal === 'surplus' && (
              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <strong className="text-white text-sm block">What is Surplus / Profit?</strong>
                <p>
                  Surplus is what remains from your revenue once all direct costs and fixed overheads have been paid. 
                  In entrepreneurship, surplus can be saved, reinvested in better equipment, or taken as income.
                </p>
                <p className="text-rose-400">
                  If total costs exceed revenue, the result is a <strong>deficit</strong> (loss).
                </p>
              </div>
            )}

            {showLiteracyModal === 'breakeven' && (
              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <strong className="text-white text-sm block">What is Break-Even?</strong>
                <p>
                  The break-even point tells you the exact number of customers you need to acquire so that your revenue covers 100% of your expenses with ₹0 loss.
                </p>
                <p>
                  Any client you serve beyond the break-even point generates positive surplus for your enterprise.
                </p>
              </div>
            )}

            <button
              onClick={() => setShowLiteracyModal(null)}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
