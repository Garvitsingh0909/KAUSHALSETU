import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  app.post("/api/generate-skill", async (req, res) => {
    try {
      const { skillName } = req.body;
      if (!skillName) return res.status(400).json({ error: "skillName is required" });

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
      }

      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      let response;
      let retries = 3;
      let delayMs = 1000;

      while (retries > 0) {
        try {
          response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: `Generate a structured educational skill profile for the skill: "${skillName}". Follow CBSE Skill Expo - Entrepreneurship & Financial Literacy guidelines.`,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: "A unique snake_case ID for the skill, strictly derived from the skill name." },
                  name: { type: Type.STRING, description: "The properly formatted display name of the skill." },
                  category: { type: Type.STRING, enum: ["Technical", "Creative", "Communication", "Practical", "Entrepreneurial"] },
                  description: { type: Type.STRING, description: "A brief 1-2 sentence description of the skill." },
                  applications: { type: Type.ARRAY, items: { type: Type.STRING }, description: "4 real-world applications of this skill." },
                  problemsSolved: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 real-world problems this skill helps solve." },
                  opportunities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "4 career or real-world opportunities." },
                  nextSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "4 related skills to learn next." }
                },
                required: ["id", "name", "category", "description", "applications", "problemsSolved", "opportunities", "nextSkills"]
              }
            }
          });
          break;
        } catch (error: any) {
          const isRetryable = error?.status === 503 || error?.status === 429 || error?.status === 'UNAVAILABLE' || (error?.message && (error.message.includes('503') || error.message.includes('demand')));
          if (isRetryable && retries > 1) {
            retries--;
            console.log(`Gemini API busy (${error?.status || 'retryable'}). Retrying in ${delayMs}ms...`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            delayMs *= 2;
          } else {
            throw error;
          }
        }
      }
      
      if (!response || !response.text) throw new Error("No response from Gemini");
      const skillData = JSON.parse(response.text);
      res.json(skillData);
    } catch (error) {
      console.error("Skill generation error:", error);
      // Fallback synthesis if API is unavailable
      const safeId = String(req.body.skillName).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
      const fallbackSkill = {
        id: safeId || 'custom_skill',
        name: req.body.skillName,
        category: "Practical",
        description: `Practical application of ${req.body.skillName} in community, academic, and entrepreneurial projects.`,
        applications: [`Projects using ${req.body.skillName}`, `Team collaboration`, `Skill-sharing`, `Independent micro-projects`],
        problemsSolved: [`Lack of specialized execution in ${req.body.skillName}`, `Inefficient workflow`, `Communication gaps`],
        opportunities: [`Specialist in ${req.body.skillName}`, `Project Consultant`, `Freelance Practitioner`, `Workshop Lead`],
        nextSkills: ["Project Management", "Communication", "Financial Literacy", "Problem Solving"]
      };
      res.json(fallbackSkill);
    }
  });

  app.post("/api/generate-opportunity", async (req, res) => {
    const { skillIds, skillNames } = req.body;
    if (!skillNames || !Array.isArray(skillNames) || skillNames.length === 0) {
      return res.status(400).json({ error: "skillNames array is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    try {
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured on the server.");
      }

      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      let response;
      let retries = 3;
      let delayMs = 1000;

      const systemPrompt = `You are G-ONE, the intelligence behind Kaushal Setu for the CBSE Skill Expo (Theme: Entrepreneurship & Financial Literacy).
The student has combined these exact skills: ${skillNames.join(' + ')}.

Generate a comprehensive, full-page opportunity profile that interlocks these specific skills into a viable, real-world project, freelance service, micro-enterprise, or community solution.
Ensure:
1. 'The Problem' explains the root cause, key challenges, urgency, and market gap.
2. 'Potential Users' identifies specific user segments with real-world pain points and outreach strategy.
3. 'Possible Solution' details how the skills synthesize, core deliverables, economic value, and business model.
4. 'Suggested First Step' gives an immediate Day 1 action, a 4-phase weekly roadmap, required zero-cost resources, validation milestone, and risk mitigation.`;

      while (retries > 0) {
        try {
          response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: systemPrompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: "A unique snake_case ID for this opportunity." },
                  title: { type: Type.STRING, description: "Professional, inspiring title for the opportunity." },
                  category: { type: Type.STRING, enum: ["Service", "Product", "Entrepreneurship", "Community", "Technology", "Career Pathway"] },
                  opportunityType: { type: Type.STRING, description: "e.g. Freelance Service, Hardware Micro-Enterprise, Digital Studio, Community Initiative" },
                  difficulty: { type: Type.STRING, enum: ["Beginner", "Intermediate", "Advanced"] },
                  applications: { type: Type.ARRAY, items: { type: Type.STRING }, description: "4 tangible real-world deliverables or applications." },
                  nextSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "4 logical next skills to learn." },
                  preferredSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "2-3 complementary skill names or IDs." },
                  
                  problemProfile: {
                    type: Type.OBJECT,
                    properties: {
                      overview: { type: Type.STRING, description: "Context and why this problem exists in society or local commerce." },
                      keyChallenges: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-4 specific root challenges or pain points." },
                      urgency: { type: Type.STRING, description: "Why solving this matters now and economic/social impact." },
                      marketGap: { type: Type.STRING, description: "Why existing large companies or generic templates leave an opening for student innovators." }
                    },
                    required: ["overview", "keyChallenges", "urgency", "marketGap"]
                  },

                  usersProfile: {
                    type: Type.OBJECT,
                    properties: {
                      primaryAudience: { type: Type.STRING, description: "Summary of who the main customers/users are." },
                      audienceSegments: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            segment: { type: Type.STRING, description: "Segment name (e.g. 'Neighborhood Cafes', 'Middle Schoolers')" },
                            description: { type: Type.STRING, description: "Brief description of this user group." },
                            painPoint: { type: Type.STRING, description: "Specific frustration they experience." },
                            whyTheyCare: { type: Type.STRING, description: "Why this solution provides real relief or value to them." }
                          },
                          required: ["segment", "description", "painPoint", "whyTheyCare"]
                        }
                      },
                      realWorldContext: { type: Type.STRING, description: "Where to find these users (e.g. local markets, school clubs, residential societies)." },
                      outreachStrategy: { type: Type.STRING, description: "Practical, zero-cost method for a student to connect with their first 3-5 users." }
                    },
                    required: ["primaryAudience", "audienceSegments", "realWorldContext", "outreachStrategy"]
                  },

                  solutionProfile: {
                    type: Type.OBJECT,
                    properties: {
                      summary: { type: Type.STRING, description: "Comprehensive description of the solution and value proposition." },
                      coreDeliverables: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            name: { type: Type.STRING, description: "Name of the deliverable or product feature." },
                            description: { type: Type.STRING, description: "What it includes and how it works." }
                          },
                          required: ["name", "description"]
                        }
                      },
                      howItWorks: { type: Type.STRING, description: "Step-by-step mechanism of how the solution is delivered." },
                      economicValue: { type: Type.STRING, description: "Revenue model, pricing guidance, and financial literacy aspect (costs vs profit margin)." },
                      skillIntegration: { type: Type.STRING, description: "Detailed explanation of how the selected skills specifically synthesize." }
                    },
                    required: ["summary", "coreDeliverables", "howItWorks", "economicValue", "skillIntegration"]
                  },

                  firstStepProfile: {
                    type: Type.OBJECT,
                    properties: {
                      immediateAction: { type: Type.STRING, description: "Concrete Day 1 actionable step the student can take right now." },
                      roadmap: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            phase: { type: Type.STRING, description: "e.g. Phase 1, Phase 2, Phase 3, Phase 4" },
                            title: { type: Type.STRING, description: "Milestone name" },
                            action: { type: Type.STRING, description: "Specific execution step" },
                            duration: { type: Type.STRING, description: "e.g. Days 1-3, Week 2" }
                          },
                          required: ["phase", "title", "action", "duration"]
                        }
                      },
                      requiredResources: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Zero-cost or accessible tools and materials." },
                      validationMilestone: { type: Type.STRING, description: "Clear proof of success or validation metric." },
                      riskMitigation: { type: Type.STRING, description: "Common beginner pitfall and how to avoid it." }
                    },
                    required: ["immediateAction", "roadmap", "requiredResources", "validationMilestone", "riskMitigation"]
                  }
                },
                required: ["id", "title", "category", "opportunityType", "difficulty", "applications", "nextSkills", "problemProfile", "usersProfile", "solutionProfile", "firstStepProfile"]
              }
            }
          });
          break;
        } catch (error: any) {
          const isRetryable = error?.status === 503 || error?.status === 429 || error?.status === 'UNAVAILABLE' || (error?.message && (error.message.includes('503') || error.message.includes('demand')));
          if (isRetryable && retries > 1) {
            retries--;
            console.log(`Gemini API busy for opportunity. Retrying in ${delayMs}ms...`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            delayMs *= 2;
          } else {
            throw error;
          }
        }
      }
      
      if (!response || !response.text) throw new Error("No response from Gemini");
      const oppData = JSON.parse(response.text);
      
      // Enforce skill mapping and compatibility fields
      oppData.requiredSkills = skillIds && skillIds.length > 0 ? skillIds : [];
      oppData.problems = oppData.problemProfile?.keyChallenges || ["Key challenges in local ecosystem"];
      oppData.targetUsers = oppData.usersProfile?.audienceSegments?.map((s: any) => s.segment) || ["Target Community"];
      oppData.solution = oppData.solutionProfile?.summary || "Structured innovative solution.";
      oppData.firstStep = oppData.firstStepProfile?.immediateAction || "Create an initial project outline.";
      
      res.json(oppData);
    } catch (error) {
      console.error("Opportunity generation error, using smart synthesis:", error);
      // High-quality contextual fallback synthesis
      const comboTitle = `${skillNames.join(' & ')} Innovation Venture`;
      const safeId = `custom_${skillNames.map(s => s.toLowerCase().replace(/[^a-z0-9]/g, '_')).join('_')}_${Date.now()}`;
      
      const fallbackOpportunity = {
        id: safeId,
        title: comboTitle,
        category: skillNames.some(s => s.toLowerCase().includes('coding') || s.toLowerCase().includes('electronics')) ? "Technology" : "Entrepreneurship",
        opportunityType: "Integrated Micro-Venture / Service",
        difficulty: "Intermediate",
        requiredSkills: skillIds || [],
        preferredSkills: ["communication", "financial_literacy", "project_management"],
        applications: [
          `Rapid prototyping combining ${skillNames.join(' and ')}`,
          `Customized client solutions for local small enterprises`,
          `Educational demonstrations and peer workshops`,
          `Portfolio showcase projects for competitions and expos`
        ],
        nextSkills: ["Business Pricing", "User Research", "Agile Planning", "Intellectual Property Basics"],
        problems: [
          `Siloed workflows where neither ${skillNames[0]} nor ${skillNames[1] || 'adjacent domains'} can independently solve complex client needs`,
          `High commercial agency rates preventing grassroots organizations from accessing cross-disciplinary solutions`,
          `Lack of practical, student-led prototypes addressing neighborhood challenges`
        ],
        targetUsers: ["Local independent businesses", "School STEM & Arts clubs", "Community organizations"],
        solution: `Synthesize the direct execution strengths of ${skillNames.join(' and ')} into an agile, cost-effective service and prototype pipeline.`,
        firstStep: `Build a 1-page sample case study or prototype uniting ${skillNames.join(' and ')} and test it with 1 peer or neighborhood client.`,
        problemProfile: {
          overview: `In today's interconnected market, isolated skills are rarely sufficient. By uniting ${skillNames.join(' and ')}, innovators can address multi-dimensional challenges that single-domain specialists cannot solve alone.`,
          keyChallenges: [
            `Single-skill professionals miss cross-disciplinary synergy, leading to fragmented project deliverables.`,
            `Small community organizations lack the financial budget to hire separate specialists for each requirement.`,
            `Students often keep their skills theoretical without connecting them to measurable commercial or social utility.`
          ],
          urgency: `Interdisciplinary problem-solving is the core benchmark of the CBSE Skill Expo and modern 21st-century entrepreneurship.`,
          marketGap: `Large agencies impose expensive minimum contracts. A student possessing both ${skillNames.join(' and ')} can offer direct, personalized solutions.`
        },
        usersProfile: {
          primaryAudience: `Local enterprises, school institutions, and community initiatives needing combined ${skillNames.join(' and ')} execution.`,
          audienceSegments: [
            {
              segment: "Local Independent Shops & Micro-Businesses",
              description: "Neighborhood storefronts looking to upgrade their service delivery and outreach.",
              painPoint: "High fees charged by professional corporate consultancies.",
              whyTheyCare: "Obtain high-touch, affordable assistance from motivated student creators."
            },
            {
              segment: "Educational & Peer Communities",
              description: "Students and clubs seeking mentorship or interactive tools in these domains.",
              painPoint: "Theoretical textbooks that fail to bridge practical skill combinations.",
              whyTheyCare: "Practical, relatable knowledge transfer from an active builder."
            }
          ],
          realWorldContext: "Neighborhood commercial districts, school tech fairs, and community WhatsApp groups.",
          outreachStrategy: `Reach out to 3 local organizations or club leaders with a tailored sample showing how ${skillNames.join(' and ')} can solve an immediate operational bottleneck.`
        },
        solutionProfile: {
          summary: `A cross-functional initiative that applies ${skillNames[0]} for structural execution and ${skillNames[1] || 'integrated skills'} for optimization, design, or market outreach.`,
          coreDeliverables: [
            { name: "Integrated Project Blueprint", description: "Comprehensive plan showing workflow, inputs, and measurable outcomes." },
            { name: "Live Pilot Demonstration", description: "Working demo or visual prototype ready for client review." },
            { name: "Value & Pricing Guide", description: "Clear financial metrics detailing operational cost savings or revenue generation." }
          ],
          howItWorks: `Step 1: Discover client requirements. Step 2: Formulate solution using ${skillNames.join(' + ')}. Step 3: Iterate based on client feedback and package for deployment.`,
          economicValue: `Zero-overhead student venture. Recommended initial service or project pricing of ₹2,000 – ₹5,000 per implementation with 80%+ profit margin.`,
          skillIntegration: `${skillNames[0]} provides the core capability while ${skillNames[1] || 'supporting discipline'} provides enhancement, refinement, and user accessibility.`
        },
        firstStepProfile: {
          immediateAction: `Create a 1-page digital or physical portfolio specimen illustrating how ${skillNames.join(' and ')} interlock in a single project.`,
          roadmap: [
            { phase: "Phase 1", title: "Concept & Specimen", action: `Draft the initial prototype utilizing ${skillNames.join(' and ')}.`, duration: "Days 1–3" },
            { phase: "Phase 2", title: "Stakeholder Review", action: "Showcase the prototype to a teacher or peer for honest critique.", duration: "Days 4–7" },
            { phase: "Phase 3", title: "Free Pilot", action: "Deploy the solution for one real-world user to collect a testimonial.", duration: "Week 2" },
            { phase: "Phase 4", title: "Venture Launch", action: "Package your service with clear pricing tiers and pitch 3 potential clients.", duration: "Weeks 3–4" }
          ],
          requiredResources: ["Standard computer / mobile device", "Free Google Workspace tools", "Open-source software / local materials"],
          validationMilestone: `Receiving positive confirmation from an external client or mentor on the viability of the prototype.`,
          riskMitigation: "Start with a strictly bounded scope to ensure high-quality delivery before taking on complex commitments."
        }
      };

      res.json(fallbackOpportunity);
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

