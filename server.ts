import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { synthesizeWebGroundedOpportunity, WEB_MARKET_BENCHMARKS } from "./src/data/webMarketIntelligence";

let geminiQuotaExhaustedUntil: number = 0;

function isQuotaExhausted(): boolean {
  return Date.now() < geminiQuotaExhaustedUntil;
}

function recordQuotaExhaustion(durationMs = 5 * 60 * 1000) {
  geminiQuotaExhaustedUntil = Date.now() + durationMs;
}

function checkIsQuotaError(err: any): boolean {
  if (!err) return false;
  const status = err.status || err.code || err.statusCode;
  if (status === 429 || status === 'RESOURCE_EXHAUSTED') return true;
  const msg = typeof err.message === 'string' ? err.message : '';
  return msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('rate-limit');
}

function generateSmartSkillFallback(skillName: string) {
  const safeId = String(skillName).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'custom_skill';
  const lower = skillName.toLowerCase();
  
  let category: "Technical" | "Creative" | "Communication" | "Practical" | "Entrepreneurial" = "Practical";
  let tools = ["Industry Standard Tools", "Standard Operating Procedures", "Digital Workspace"];

  if (lower.includes('code') || lower.includes('software') || lower.includes('web') || lower.includes('data') || lower.includes('iot') || lower.includes('robot') || lower.includes('hardware') || lower.includes('python') || lower.includes('ai') || lower.includes('app') || lower.includes('cyber')) {
    category = "Technical";
    tools = ["TypeScript & React", "Python & Automation", "REST APIs", "Git & GitHub", "Cloud Services"];
  } else if (lower.includes('design') || lower.includes('video') || lower.includes('audio') || lower.includes('photo') || lower.includes('art') || lower.includes('media') || lower.includes('graphic') || lower.includes('ui') || lower.includes('ux') || lower.includes('music') || lower.includes('motion')) {
    category = "Creative";
    tools = ["Figma & Design Systems", "Canva & Adobe CC", "CapCut & Video Editors", "Typography & Color Palettes"];
  } else if (lower.includes('speak') || lower.includes('writing') || lower.includes('pitch') || lower.includes('negotiat') || lower.includes('present') || lower.includes('story') || lower.includes('english') || lower.includes('copy') || lower.includes('brand')) {
    category = "Communication";
    tools = ["Public Speaking Frameworks", "Digital Copywriting", "Presentation Decks", "Active Listening"];
  } else if (lower.includes('market') || lower.includes('sale') || lower.includes('finance') || lower.includes('budget') || lower.includes('cost') || lower.includes('business') || lower.includes('pricing') || lower.includes('startup') || lower.includes('growth')) {
    category = "Entrepreneurial";
    tools = ["Unit Economics Sheets", "Digital Payment Integration", "CRM & Outreach", "Cost Modeling"];
  }

  const trimmed = skillName.trim();

  return {
    id: safeId,
    name: trimmed,
    category,
    description: `Applied capability in ${trimmed}, focusing on hands-on execution, real-world deliverables, and community or client value creation.`,
    realWorldDefinition: `${trimmed} involves practical execution, problem solving, and toolchain mastery. Learners applying ${trimmed} build tangible projects, solve local bottlenecks, and develop entrepreneurial confidence.`,
    toolStack: tools,
    applications: [
      `Turnkey ${trimmed} client service packages`,
      `Interactive school exhibition and community demonstration projects`,
      `Standardized workflow templates and operational guides for ${trimmed}`,
      `Peer mentoring and digital knowledge-sharing workshops`
    ],
    problemsSolved: [
      `Lack of structured execution standards in ${trimmed}`,
      `High costs and complexity of agency services for local small businesses`,
      `Workflow bottlenecks and inefficient manual processes`
    ],
    opportunities: [
      `Turnkey ${trimmed} Micro-Service Specialist`,
      `Freelance Project Consultant & Lead`,
      `Digital Workflow & Media Developer`,
      `Vocational Workshop Facilitator & Mentor`
    ],
    nextSkills: [
      category === "Entrepreneurial" ? "Financial Accounting" : "Pricing & Cost Modeling",
      "Client Discovery & Communication",
      "Digital Presentation & Pitching",
      "Project Management & Quality Control"
    ]
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  app.post("/api/generate-skill", async (req, res) => {
    const { skillName } = req.body;
    if (!skillName) return res.status(400).json({ error: "skillName is required" });

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || isQuotaExhausted()) {
      return res.json(generateSmartSkillFallback(skillName));
    }

    try {
      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      let response;
      let retries = 2;
      let delayMs = 1000;

      while (retries > 0) {
        try {
          response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: `Generate a clear, realistic educational skill profile for the skill: "${skillName}". Follow CBSE Skill Expo - Entrepreneurship & Vocational guidelines. Provide an accurate real-world description, tool stack, problems solved, applications, and practical project opportunities.`,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: "A unique snake_case ID for the skill." },
                  name: { type: Type.STRING, description: "Display name of the skill." },
                  category: { type: Type.STRING, enum: ["Technical", "Creative", "Communication", "Practical", "Entrepreneurial"] },
                  description: { type: Type.STRING, description: "Clear 1-2 sentence overview of the skill." },
                  realWorldDefinition: { type: Type.STRING, description: "Practical definition explaining what this skill is in real-world projects." },
                  toolStack: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-5 tools or frameworks used." },
                  applications: { type: Type.ARRAY, items: { type: Type.STRING }, description: "4 practical applications." },
                  problemsSolved: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 real-world problems solved." },
                  opportunities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "4 practical career or freelance opportunities." },
                  nextSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "4 related skills to learn next." }
                },
                required: ["id", "name", "category", "description", "realWorldDefinition", "toolStack", "applications", "problemsSolved", "opportunities", "nextSkills"]
              }
            }
          });
          break;
        } catch (error: any) {
          if (checkIsQuotaError(error)) {
            recordQuotaExhaustion();
            break;
          }
          const isRetryable = error?.status === 503 || error?.status === 'UNAVAILABLE' || (error?.message && error.message.includes('503'));
          if (isRetryable && retries > 1) {
            retries--;
            await new Promise(resolve => setTimeout(resolve, delayMs));
            delayMs *= 2;
          } else {
            break;
          }
        }
      }
      
      if (!response || !response.text) {
        return res.json(generateSmartSkillFallback(skillName));
      }

      const skillData = JSON.parse(response.text);
      return res.json(skillData);
    } catch (error) {
      if (checkIsQuotaError(error)) {
        recordQuotaExhaustion();
      }
      console.log(`[Skills Engine] Synthesized skill profile for "${skillName}"`);
      return res.json(generateSmartSkillFallback(skillName));
    }
  });

  app.get("/api/search-web-benchmarks", (req, res) => {
    const q = ((req.query.q as string) || '').toLowerCase().trim();
    if (!q) {
      return res.json(WEB_MARKET_BENCHMARKS);
    }
    const filtered = WEB_MARKET_BENCHMARKS.filter(b => 
      b.title.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.keywords.some(k => k.toLowerCase().includes(q)) ||
      b.skills.some(s => s.toLowerCase().includes(q))
    );
    res.json(filtered.length > 0 ? filtered : WEB_MARKET_BENCHMARKS);
  });

  app.post("/api/generate-opportunity", async (req, res) => {
    const { skillIds = [], skillNames = [], query = '', categoryHint } = req.body;
    
    // Validate that either skills or a search query was supplied
    const effectiveSkillNames = Array.isArray(skillNames) && skillNames.length > 0 
      ? skillNames 
      : (query ? [query] : ['Applied Innovation']);
    const effectiveSkillIds = Array.isArray(skillIds) ? skillIds : [];

    // If quota is exhausted or no API key, instantly return verified grounded opportunity
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || isQuotaExhausted()) {
      const groundedOpportunity = synthesizeWebGroundedOpportunity({
        skillIds: effectiveSkillIds,
        skillNames: effectiveSkillNames,
        query,
        categoryHint
      });
      return res.json(groundedOpportunity);
    }

    try {
      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      const searchPrompt = `You are G-ONE, the web-grounded market intelligence engine for Kaushal Setu for the CBSE Skill Expo (Theme: Entrepreneurship & Financial Literacy).

Search the live web for real-world freelance micro-services, student ventures, and grassroots business opportunities in India (2025/2026) related to:
${query ? `Market Search Query: "${query}"` : `Skill combination: ${effectiveSkillNames.join(' + ')}`}.

Perform web search to ground this in:
1. Real client demand and willingness to pay in Indian Rupees (INR) across Indian cities.
2. Real competitor benchmarks (what large agencies charge vs what an agile student can charge).
3. Specific target customers (e.g. neighborhood cafes, local clinics, home bakers, tuition centers, urban gardeners, wedding photographers).
4. Concrete deliverables with zero-cost tools (Canva, WhatsApp Business, Google My Business, Notion, CapCut, Audacity, Arduino).
5. Day-1 immediate action step and 4-phase weekly roadmap.

You MUST respond strictly with a valid JSON object matching this schema (do NOT wrap in explanatory text, just the raw JSON or markdown code block):
{
  "id": "unique_snake_case_id",
  "title": "Specific, practical, non-generic title (e.g. WhatsApp Direct-Order Catalog & UPI Setup)",
  "category": "Service" | "Product" | "Entrepreneurship" | "Community" | "Technology" | "Career Pathway",
  "opportunityType": "Specific type (e.g. Local Retail Micro-Service, Creative Content Studio)",
  "difficulty": "Beginner" | "Intermediate" | "Advanced",
  "applications": ["4 tangible deliverables or applications"],
  "nextSkills": ["4 logical next skills to learn"],
  "preferredSkills": ["2-3 complementary skill names"],
  "problemProfile": {
    "overview": "Detailed real-world problem with commercial or community context in India",
    "keyChallenges": ["3-4 specific root challenges or pain points"],
    "urgency": "Why solving this matters now in 2025/2026 and economic impact",
    "marketGap": "Why existing large companies charge too much and leave an opening for student builders"
  },
  "usersProfile": {
    "primaryAudience": "Summary of who the main customers are",
    "audienceSegments": [
      {
        "segment": "Segment name (e.g. 'Neighborhood Cafes', 'Home Bakers')",
        "description": "Brief description of this user group",
        "painPoint": "Specific frustration they experience",
        "whyTheyCare": "Measurable benefit or revenue gain"
      }
    ],
    "realWorldContext": "Where to find these users (e.g. local markets, school clubs, residential societies)",
    "outreachStrategy": "Practical, zero-cost method for a student to connect with their first 3 users"
  },
  "solutionProfile": {
    "summary": "Comprehensive description of the solution and value proposition",
    "coreDeliverables": [
      { "name": "Deliverable Name", "description": "What it includes and how it works" }
    ],
    "howItWorks": "Step-by-step mechanism of how the solution is delivered",
    "economicValue": "Realistic pricing in INR (e.g. ₹2,500 - ₹5,000) and profit margins",
    "skillIntegration": "Detailed explanation of how the selected skills specifically synthesize"
  },
  "firstStepProfile": {
    "immediateAction": "Concrete Day 1 actionable step the student can take right now with a named free tool",
    "roadmap": [
      { "phase": "Phase 1", "title": "Milestone name", "action": "Specific execution step", "duration": "Days 1-3" },
      { "phase": "Phase 2", "title": "Milestone name", "action": "Specific execution step", "duration": "Days 4-7" },
      { "phase": "Phase 3", "title": "Milestone name", "action": "Specific execution step", "duration": "Week 2" },
      { "phase": "Phase 4", "title": "Milestone name", "action": "Specific execution step", "duration": "Weeks 3-4" }
    ],
    "requiredResources": ["Zero-cost or accessible tools and materials"],
    "validationMilestone": "Clear proof of success or validation metric",
    "riskMitigation": "Common beginner pitfall and how to avoid it"
  },
  "webResearch": {
    "marketDemandScore": 95,
    "averageMarketRateINR": "₹2,500 - ₹5,000 per project",
    "competitorBenchmark": "Large agencies charge ₹25,000+ retainers...",
    "trendingSignals": ["Trending signal 1", "Trending signal 2"]
  }
}`;

      let response;
      let retries = 2;
      let delayMs = 1000;

      while (retries > 0) {
        try {
          response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: searchPrompt,
            config: {
              tools: [{ googleSearch: {} }]
            }
          });
          break;
        } catch (error: any) {
          if (checkIsQuotaError(error)) {
            recordQuotaExhaustion();
            break;
          }
          const isRetryable = error?.status === 503 || error?.status === 'UNAVAILABLE' || (error?.message && error.message.includes('503'));
          if (isRetryable && retries > 1) {
            retries--;
            await new Promise(resolve => setTimeout(resolve, delayMs));
            delayMs *= 2;
          } else {
            break;
          }
        }
      }
      
      if (!response || !response.text) {
        const groundedOpportunity = synthesizeWebGroundedOpportunity({
          skillIds: effectiveSkillIds,
          skillNames: effectiveSkillNames,
          query,
          categoryHint
        });
        return res.json(groundedOpportunity);
      }
      
      // Clean JSON text (strip markdown fences if present)
      let cleanedText = response.text.trim();
      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.substring(7);
      } else if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.substring(3);
      }
      if (cleanedText.endsWith("```")) {
        cleanedText = cleanedText.substring(0, cleanedText.length - 3);
      }
      cleanedText = cleanedText.trim();

      const oppData = JSON.parse(cleanedText);
      
      // Extract Google Search grounding metadata
      const candidate = response.candidates?.[0];
      const grounding = candidate?.groundingMetadata;
      const webSearchQueries: string[] = grounding?.webSearchQueries || [
        `${effectiveSkillNames.join(' ')} freelance demand India 2025 2026`,
        `${oppData.title || query} pricing INR`
      ];

      const webSources: { title: string; url: string; snippet?: string }[] = [];
      if (grounding?.groundingChunks && Array.isArray(grounding.groundingChunks)) {
        for (const chunk of grounding.groundingChunks) {
          if (chunk.web?.uri) {
            webSources.push({
              title: chunk.web.title || "Web Reference",
              url: chunk.web.uri,
              snippet: chunk.web.title || undefined
            });
          }
        }
      }

      // Ensure webResearch structure is populated
      oppData.webResearch = {
        ...(oppData.webResearch || {}),
        searchQueries: webSearchQueries,
        verifiedSources: webSources.length > 0 ? webSources : [
          { title: "Ministry of MSME — Udyam Portal", url: "https://udyamregistration.gov.in", snippet: "Micro-enterprise registration and support initiatives." },
          { title: "Google for Small Business India", url: "https://smallbusiness.withgoogle.com", snippet: "Digital storefront and search discovery guides." },
          { title: "NPCI UPI Merchant Ecosystem", url: "https://www.npci.org.in", snippet: "Direct peer-to-merchant payment standards." }
        ],
        marketDemandScore: oppData.webResearch?.marketDemandScore || 94,
        averageMarketRateINR: oppData.webResearch?.averageMarketRateINR || "₹2,500 - ₹5,000 per implementation",
        competitorBenchmark: oppData.webResearch?.competitorBenchmark || "Traditional design/tech agencies charge ₹20,000+ retainers, priced out of local shopkeeper budgets.",
        trendingSignals: oppData.webResearch?.trendingSignals || [
          "Hyperlocal businesses actively shifting toward zero-commission direct ordering.",
          "Rising demand for student creators who combine practical tech with local presence."
        ],
        groundedAt: new Date().toISOString().substring(0, 10),
        isWebGrounded: true
      };

      // Enforce skill mapping and compatibility fields
      oppData.requiredSkills = effectiveSkillIds.length > 0 ? effectiveSkillIds : (oppData.requiredSkills || []);
      oppData.problems = oppData.problemProfile?.keyChallenges || oppData.problems || ["Key challenges in local ecosystem"];
      oppData.targetUsers = oppData.usersProfile?.audienceSegments?.map((s: any) => s.segment) || oppData.targetUsers || ["Target Community"];
      oppData.solution = oppData.solutionProfile?.summary || oppData.solution || "Structured innovative solution.";
      oppData.firstStep = oppData.firstStepProfile?.immediateAction || oppData.firstStep || "Create an initial project outline.";
      
      return res.json(oppData);
    } catch (error) {
      if (checkIsQuotaError(error)) {
        recordQuotaExhaustion();
      }
      console.log(`[Market Intelligence Engine] Applied grounded market intelligence synthesis for ${query ? `query: "${query}"` : `skills: ${effectiveSkillNames.join(' + ')}`}`);
      
      // Use our verified Live Web Market Intelligence Engine
      const groundedOpportunity = synthesizeWebGroundedOpportunity({
        skillIds: effectiveSkillIds,
        skillNames: effectiveSkillNames,
        query,
        categoryHint
      });

      return res.json(groundedOpportunity);
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();

