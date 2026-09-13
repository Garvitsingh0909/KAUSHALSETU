/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — CREATIVE ASSESSMENT QUESTION BANKS & RUBRICS
 * Covers: graphic_design, photography, photo_editing, video_editing, illustration, ui_ux_design, 3d_modeling, content_creation
 */

import { AssessmentProfile } from '../assessmentTypes';

export const CREATIVE_ASSESSMENTS: AssessmentProfile[] = [
  // 1. Graphic Design
  {
    skillId: 'graphic_design',
    skillName: 'Graphic Design',
    category: 'Creative',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Using more than 3 distinct font families in a single flyer layout, causing visual chaos.',
        guidance: 'Stick to maximum 2 font families (one for display heading, one for clean body copy).'
      },
      {
        mistake: 'Placing low-contrast text (e.g., light gray on white background), failing WCAG accessibility.',
        guidance: 'Always maintain at least 4.5:1 contrast ratio for readable body text.'
      }
    ],
    recommendedNextSkills: ['ui_ux_design', 'marketing', 'illustration'],
    recommendedProjects: ['Bakery Brand Identity Kit', 'Cleanliness Campaign Posters', 'Exhibition Stall Banner Package'],
    practicalTask: {
      id: 'task_design_brand_kit',
      skillId: 'graphic_design',
      title: 'Design a Social Media Campaign Post with Clear Hierarchy',
      instructions: 'Design a 1080x1080px promotional social media post for an eco-friendly student handicraft market. Include primary headline, date/venue, supporting graphic, call-to-action button, and defined 3-color palette.',
      starterTemplate: `/* Design Brief Submission: Eco Handicraft Market */
Dimensions: 1080 x 1080 px (1:1 Square)
Brand Identity / Theme: Sustainable Artisan Craft

1. Typography Hierarchy:
   - Display Heading Font: (e.g., Playfair Display 64pt, Bold)
   - Subheading / Date Font: (e.g., Plus Jakarta Sans 24pt, Medium)
   - Body & CTA Font: (e.g., Plus Jakarta Sans 16pt, SemiBold)

2. Color Palette Specification:
   - Primary Accent: #2E7D32 (Forest Green)
   - Background Neutral: #F9FBF9 (Soft Sage Tint)
   - High-Contrast Text: #1B2E1C (Deep Evergreen)

3. Spatial Layout & Composition:
   - Focal point alignment:
   - Negative space margin: Minimum 80px outer padding

4. Asset Links / Attachment:
   - [Provide Figma / Canva / Image link here]`,
      expectedOutput: 'Balanced social post meeting WCAG contrast, consistent 2-font hierarchy, and clear visual focal point.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['link', 'file', 'text'],
      rubric: [
        {
          id: 'crit_hierarchy',
          name: 'Visual Hierarchy & Focal Point',
          maxPoints: 5,
          description: 'Eye is guided naturally from primary headline to supporting details to CTA without confusion.',
          levelDescriptors: {
            5: 'Masterful hierarchy with deliberate scale contrast and clear reading sequence.',
            3: 'Good hierarchy with slightly competing elements.',
            1: 'Flat layout where all elements compete for attention.'
          }
        },
        {
          id: 'crit_typography',
          name: 'Typography & Readability',
          maxPoints: 5,
          description: 'Uses paired fonts, appropriate line-height (1.4-1.6), and scannable tracking.',
          levelDescriptors: {
            5: 'Exemplary type pairing, no awkward widows/orphans, clean legibility.',
            3: 'Readable text with minor spacing inconsistencies.',
            1: 'Too many mismatched fonts or unreadable stretched text.'
          }
        },
        {
          id: 'crit_color_contrast',
          name: 'Color Theory & WCAG Contrast',
          maxPoints: 5,
          description: 'Harmonious palette with accessible contrast ratio (> 4.5:1 for body).',
          levelDescriptors: {
            5: 'Refined harmonious palette passing WCAG AAA standards.',
            3: 'Attractive colors with acceptable contrast.',
            1: 'Clashing colors or unreadable low-contrast text.'
          }
        },
        {
          id: 'crit_composition',
          name: 'Balance & Negative Space',
          maxPoints: 5,
          description: 'Uses breathing room and grid alignment to prevent cluttered borders.',
          levelDescriptors: {
            5: 'Spacious, elegant composition with disciplined grid alignment.',
            3: 'Adequate balance with slight border crowding.',
            1: 'Cluttered, edge-touching elements.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_des_01',
        skillId: 'graphic_design',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Color Spaces',
        question: 'Which color mode should be used when preparing artwork strictly intended for professional commercial offset printing?',
        options: ['CMYK (Cyan, Magenta, Yellow, Key/Black)', 'RGB (Red, Green, Blue)', 'HEX code', 'Grayscale only'],
        correctAnswer: 'CMYK (Cyan, Magenta, Yellow, Key/Black)',
        explanation: 'CMYK is a subtractive ink color model used in physical printing, whereas RGB is an additive light model used for digital computer screens.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_des_02',
        skillId: 'graphic_design',
        difficulty: 'Foundation',
        type: 'true_false',
        competency: 'Vector vs Raster',
        question: 'Vector graphics (.SVG, .AI) can be scaled infinitely without pixelation because they are rendered using mathematical geometric formulas rather than fixed pixel grids.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Vectors store mathematical coordinates (lines, curves, fills), allowing infinite resolution-independent scaling.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_des_03',
        skillId: 'graphic_design',
        difficulty: 'Intermediate',
        type: 'scenario',
        competency: 'Visual Hierarchy Optimization',
        scenarioContext: 'A poster layout looks cluttered and stressful: the headline, discount badge, photo, address, and date are all large, bold, and center-aligned in red text.',
        question: 'Which design intervention will immediately restore visual breathing room and readability?',
        options: [
          'Establish a single primary focal point, size secondary elements down by at least 50%, introduce neutral background space, and limit accent colors.',
          'Add a bright rainbow gradient behind the entire poster.',
          'Make the address text blinking and animated.',
          'Add 10 more decorative starburst icons.'
        ],
        correctAnswer: 'Establish a single primary focal point, size secondary elements down by at least 50%, introduce neutral background space, and limit accent colors.',
        explanation: 'Effective visual hierarchy uses deliberate scale contrast and ample negative space to guide the reader\'s eye smoothly.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_des_04',
        skillId: 'graphic_design',
        difficulty: 'Strong',
        type: 'multi_select',
        competency: 'Accessibility Standards',
        question: 'Which practices ensure a graphic design layout is accessible to users with visual impairments? (Select all that apply)',
        options: [
          'Ensuring text has at least 4.5:1 contrast against its background',
          'Not relying on color alone to convey critical status information (e.g., adding text/icons alongside red/green)',
          'Setting line height to at least 1.4x font size for multi-line body paragraphs',
          'Using light gray 8pt text on dark gray backgrounds'
        ],
        correctAnswer: [
          'Ensuring text has at least 4.5:1 contrast against its background',
          'Not relying on color alone to convey critical status information (e.g., adding text/icons alongside red/green)',
          'Setting line height to at least 1.4x font size for multi-line body paragraphs'
        ],
        explanation: 'WCAG standards mandate sufficient contrast, non-color status cues, and adequate line spacing for legibility.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 2. Photography & Lighting
  {
    skillId: 'photography',
    skillName: 'Photography & Lighting',
    category: 'Creative',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Using on-camera direct pop-up flash in a dark room, creating harsh shadows and washed-out faces.',
        guidance: 'Diffuse light using softboxes, bounce flash off ceilings, or position subjects near large windows.'
      }
    ],
    recommendedNextSkills: ['photo_editing', 'marketing', 'client_handling'],
    recommendedProjects: ['5-Item Product Lookbook', 'Annual Sports Day Documentary', 'Artisan Process Series'],
    practicalTask: {
      id: 'task_photo_exposure_triangle',
      skillId: 'photography',
      title: 'Plan a Product Photography Setup & Exposure Triangle Settings',
      instructions: 'Document camera settings (Aperture, Shutter Speed, ISO, Focal Length) and 3-point lighting setup (Key, Fill, Rim) to photograph a handmade ceramic bowl on a clean white background with crisp sharpness and zero motion blur.',
      starterTemplate: `# Photography Setup: Tabletop Ceramic Product
Subject: Handcrafted Glazed Ceramic Bowl

1. Exposure Triangle Parameters:
   - Aperture: f/8.0 (Explanation: Ensures entire depth of bowl is in sharp focus)
   - Shutter Speed: 1/160s (Explanation: Sync speed; eliminates hand tremor on tripod)
   - ISO: ISO 100 (Explanation: Minimum digital sensor noise)
   - Lens Focal Length: 50mm - 85mm prime

2. Lighting Setup Diagram / Strategy:
   - Key Light: 45° angle with large diffusion softbox
   - Fill Light / Reflector: White foam-board on opposite side to soften shadows
   - Rim / Background Light: To separate dark rim from background

3. Composition & Framing:
   - Camera Angle: 45° hero angle + Top-down flat lay`,
      expectedOutput: 'Technically sound exposure settings with diffused lighting plan eliminating specular hot-spots.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_photo_exposure',
          name: 'Exposure Triangle Mastery',
          maxPoints: 5,
          description: 'Calculates aperture, shutter, and ISO trade-offs accurately for subject depth.',
          levelDescriptors: {
            5: 'Optimal f/stop for sharp depth of field, low ISO for zero noise.',
            3: 'Correct exposure but non-ideal aperture for product depth.',
            1: 'Incorrect exposure causing blur or heavy noise.'
          }
        },
        {
          id: 'crit_photo_lighting',
          name: 'Lighting Direction & Diffusion',
          maxPoints: 5,
          description: 'Uses diffused directional light to sculpt form without harsh hot-spots.',
          levelDescriptors: {
            5: 'Professional multi-point light design with fill reflection.',
            3: 'Single diffused source with acceptable fill.',
            1: 'Harsh unflattering direct flash.'
          }
        },
        {
          id: 'crit_photo_composition',
          name: 'Framing, Angles & Rule of Thirds',
          maxPoints: 5,
          description: 'Compositional intentionality and clean background separation.',
          levelDescriptors: {
            5: 'Compelling framing, clean horizons, and intentional focal plane.',
            3: 'Good composition with minor distracting background element.',
            1: 'Crooked framing with cluttered backdrop.'
          }
        },
        {
          id: 'crit_photo_storytelling',
          name: 'Texture & Detail Capture',
          maxPoints: 5,
          description: 'Accurately captures material textures, reflections, and true color fidelity.',
          levelDescriptors: {
            5: 'Pristine detail and accurate white balance calibration.',
            3: 'Good detail with slight color cast.',
            1: 'Muddy, blurry, or washed-out textures.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_pho_01',
        skillId: 'photography',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Exposure Triangle - Aperture',
        question: 'Which aperture setting produces the shallowest depth of field (blurry background bokeh)?',
        options: ['f/1.8', 'f/8.0', 'f/16', 'f/22'],
        correctAnswer: 'f/1.8',
        explanation: 'A smaller f-number (f/1.8) corresponds to a wider physical lens opening, which lets in more light and creates a shallow depth of field with soft bokeh.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_pho_02',
        skillId: 'photography',
        difficulty: 'Intermediate',
        type: 'scenario',
        competency: 'Motion Blur Mitigation',
        scenarioContext: 'You are photographing a fast-paced school basketball match indoors under gym lights, but all players are blurry.',
        question: 'Which setting change will freeze the fast athlete motion cleanly?',
        options: [
          'Increase shutter speed to at least 1/500s or 1/1000s, opening aperture to maximum (e.g. f/2.8) and raising ISO accordingly.',
          'Lower shutter speed to 1/2 second.',
          'Turn down camera ISO to 50.',
          'Ask the players to run in slow motion.'
        ],
        correctAnswer: 'Increase shutter speed to at least 1/500s or 1/1000s, opening aperture to maximum (e.g. f/2.8) and raising ISO accordingly.',
        explanation: 'Fast shutter speeds (>1/500s) freeze high-speed athletic movements, requiring wider aperture and higher ISO in indoor conditions.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 3. Photo Editing & Retouching
  {
    skillId: 'photo_editing',
    skillName: 'Photo Editing & Retouching',
    category: 'Creative',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Over-saturating colors and over-sharpening until halo artifacts appear around edges.',
        guidance: 'Use subtle curve adjustments and inspect 100% crop for edge halos.'
      }
    ],
    recommendedNextSkills: ['photography', 'graphic_design', 'marketing'],
    recommendedProjects: ['10-Item Product Cleanup', 'Vintage Photo Restoration', 'Uniform E-Commerce Grid'],
    practicalTask: {
      id: 'task_photo_edit_curves',
      skillId: 'photo_editing',
      title: 'Formulate an E-Commerce Product Image Retouching Workflow',
      instructions: 'Document a non-destructive 4-step editing workflow in Photoshop/Lightroom/GIMP to clean up a raw product photo: exposure balancing with tone curves, color temperature correction, background isolation, and web-ready export.',
      starterTemplate: `# Retouching Workflow: E-Commerce Catalog
1. Non-Destructive Layer Setup:
   - RAW conversion profile & lens chromatic aberration correction.

2. Tone & Curve Adjustments:
   - White point set to RGB (255, 255, 255) for pure white background without clipping product highlights.
   - S-Curve contrast applied via Adjustment Layer.

3. Defect & Dust Retouching:
   - Healing Brush / Clone Stamp on separate blank layer (Sample: Current & Below).

4. Export Specifications:
   - Color Space: sRGB (for web consistency).
   - Dimensions: 2000 x 2000 px at 80% JPEG quality with metadata stripped.`,
      expectedOutput: 'Professional non-destructive workflow with correct sRGB color profiling and highlight preservation.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_edit_nondestructive',
          name: 'Non-Destructive Workflow',
          maxPoints: 5,
          description: 'Uses adjustment layers, masks, and smart objects without altering original pixels.',
          levelDescriptors: {
            5: '100% non-destructive with organized layer grouping and naming.',
            3: 'Mostly non-destructive with minor flattened operations.',
            1: 'Destructive direct edits on background layer.'
          }
        },
        {
          id: 'crit_edit_color',
          name: 'Color Accuracy & White Balance',
          maxPoints: 5,
          description: 'Corrects color casts and matches real product tones.',
          levelDescriptors: {
            5: 'Precise white balance calibration without oversaturation.',
            3: 'Good color balance with minor saturation exaggeration.',
            1: 'Harsh color cast or unnatural skin tones.'
          }
        },
        {
          id: 'crit_edit_retouch',
          name: 'Cleanliness & Artifact Avoidance',
          maxPoints: 5,
          description: 'Removes blemishes naturally without plastic blur or halo sharpening artifacts.',
          levelDescriptors: {
            5: 'Flawless texture preservation with zero halos.',
            3: 'Clean retouching with slight softening.',
            1: 'Obvious clone stamp repeating patterns or haloing.'
          }
        },
        {
          id: 'crit_edit_export',
          name: 'Web Optimization & Color Space',
          maxPoints: 5,
          description: 'Applies sRGB profile, target dimensions, and compression balance.',
          levelDescriptors: {
            5: 'Optimal sRGB export balancing file size (<300KB) and visual clarity.',
            3: 'Correct export format with slightly large file size.',
            1: 'Wrong color space (e.g. ProPhoto/AdobeRGB on web causing washed out colors).'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_pe_01',
        skillId: 'photo_editing',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Web Color Profiles',
        question: 'Which color profile MUST be embedded in images exported for website and smartphone display to ensure colors do not look washed out or dull?',
        options: ['sRGB', 'Adobe RGB (1998)', 'ProPhoto RGB', 'CMYK US Web Coated'],
        correctAnswer: 'sRGB',
        explanation: 'sRGB is the global standard color space for web browsers and mobile screens. Exporting in wider color spaces without conversion causes browsers to render desaturated, muddy colors.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_pe_02',
        skillId: 'photo_editing',
        difficulty: 'Developing',
        type: 'true_false',
        competency: 'Clipping in Histograms',
        question: 'When an image histogram is pressed hard against the far right edge (value 255), it indicates that highlights are "clipped" and pure white data is lost forever.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Highlight clipping means sensor pixels were fully saturated, turning them into pure #FFFFFF with zero recoverable texture detail.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 4. Video Production & Editing
  {
    skillId: 'video_editing',
    skillName: 'Video Production & Editing',
    category: 'Creative',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Neglecting audio levels, allowing loud background music to drown out spoken dialogue.',
        guidance: 'Apply audio ducking to reduce music by -18dB to -24dB during speech.'
      }
    ],
    recommendedNextSkills: ['content_creation', 'marketing', 'public_speaking'],
    recommendedProjects: ['60-Second Artisan Promo Reel', 'Science Fair Recap Video', 'Plastic Recycling Explainer'],
    practicalTask: {
      id: 'task_video_edit_storyboard',
      skillId: 'video_editing',
      title: 'Build a 60-Second Promotional Reel Storyboard & Timeline Structure',
      instructions: 'Design the timeline sequence, B-roll cut points, audio track hierarchy, and subtitle pacing for a 60-second high-energy vertical reel promoting a student robotics competition.',
      starterTemplate: `# 60-Second Vertical Video Timeline (9:16)
Aspect Ratio: 1080 x 1920 (9:16 Vertical)
Target Retention Goal: >70% completion

1. Scene Breakdown:
   - 0:00 - 0:03 (Hook): Close-up spark / robotic arm spinning fast + bold text "Can robots save local farms?"
   - 0:03 - 0:15 (Problem): Rapid B-roll of student inventors troubleshooting with dynamic sound effects (whoosh/riser).
   - 0:15 - 0:45 (Solution & Climax): Action montage synced to music beat drops.
   - 0:45 - 1:00 (Call to Action): Event date, venue, ticket link with persistent graphic overlay.

2. Audio Mixing Channels:
   - Dialogue / Voiceover: Normalized to -3dB to -6dB peak.
   - Background Music: Ducked to -22dB during dialogue, swells to -12dB in hook/climax.
   - Sound FX (SFX): -10dB for impact hits.`,
      expectedOutput: 'High-retention timeline with audio ducking and dynamic pacing.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'link', 'file'],
      rubric: [
        {
          id: 'crit_vid_pacing',
          name: 'Pacing & Narrative Hook',
          maxPoints: 5,
          description: 'Captures attention within 3 seconds and maintains visual momentum.',
          levelDescriptors: {
            5: 'Gripping hook, rhythmic beat synchronization, and seamless transitions.',
            3: 'Good pacing with minor slow points.',
            1: 'Monotonous, sluggish pacing.'
          }
        },
        {
          id: 'crit_vid_audio',
          name: 'Audio Mixing & Ducking',
          maxPoints: 5,
          description: 'Dialogue is crystal clear; background music does not drown voices.',
          levelDescriptors: {
            5: 'Pristine audio mixing with smooth ducking and impactful SFX.',
            3: 'Acceptable balance with minor volume jumps.',
            1: 'Music overpowers dialogue or harsh clipping.'
          }
        },
        {
          id: 'crit_vid_visual',
          name: 'B-Roll & Visual Variety',
          maxPoints: 5,
          description: 'Cuts between wide, medium, and macro detail shots smoothly.',
          levelDescriptors: {
            5: 'Dynamic shot variety matching narrative context.',
            3: 'Adequate B-roll.',
            1: 'Single static talking head with zero visual variety.'
          }
        },
        {
          id: 'crit_vid_subtitles',
          name: 'Typography & Subtitles',
          maxPoints: 5,
          description: 'Accurate, high-contrast subtitles positioned within vertical safe zones.',
          levelDescriptors: {
            5: 'Dynamic karaoke-style subtitles placed safely away from TikTok/Reels UI icons.',
            3: 'Readable subtitles with minor boundary overlaps.',
            1: 'Subtitles obscured by platform icons or unreadable font.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_vid_01',
        skillId: 'video_editing',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'The 180-Degree Rule',
        question: 'In cinematography and video editing, what is the primary purpose of the "180-degree rule"?',
        options: [
          'To maintain consistent left/right spatial orientation and screen direction between two characters speaking.',
          'To ensure cameras never rotate in circles.',
          'To keep the video temperature at 180 kelvins.',
          'To limit videos to 180 seconds.'
        ],
        correctAnswer: 'To maintain consistent left/right spatial orientation and screen direction between two characters speaking.',
        explanation: 'Crossing the imaginary 180-degree axis line between two subjects causes them to suddenly swap screen directions on cut, disorienting viewers.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_vid_02',
        skillId: 'video_editing',
        difficulty: 'Intermediate',
        type: 'scenario',
        competency: 'Audio Ducking',
        scenarioContext: 'In a promotional video, the background music makes it difficult for viewers on mobile phones to understand what the speaker is saying.',
        question: 'What is the standard audio editing technique to fix this automatically in DaVinci Resolve or Premiere Pro?',
        options: [
          'Set up "Sidechain Audio Ducking" so the music compressor attenuates music volume automatically whenever voiceover is present on track 1.',
          'Delete the speaker\'s voice completely.',
          'Mute the entire video.',
          'Double the music volume.'
        ],
        correctAnswer: 'Set up "Sidechain Audio Ducking" so the music compressor attenuates music volume automatically whenever voiceover is present on track 1.',
        explanation: 'Audio ducking uses a sidechain compressor triggered by voice frequencies to dip background music smoothly during speech.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 5. Digital Illustration & Drawing
  {
    skillId: 'illustration',
    skillName: 'Digital Illustration & Drawing',
    category: 'Creative',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Using pure black (#000000) for shadows, making artwork look muddy and desaturated.',
        guidance: 'Shift hue toward cool purples or deep complementary tones for vibrant shadows.'
      }
    ],
    recommendedNextSkills: ['graphic_design', 'ui_ux_design', 'marketing'],
    recommendedProjects: ['Flora & Fauna Sticker Sheet', 'Conservation Comic', 'Cultural Mascot Character Set'],
    practicalTask: {
      id: 'task_illust_character_sheet',
      skillId: 'illustration',
      title: 'Design an Illustrated Educational Character Mascot with Expression Sheet',
      instructions: 'Create a character design sheet for an educational mascot (e.g. "Tara the Tech Turtle"). Provide front view, 3/4 view, 3 facial expressions (Curious, Excited, Problem-Solving), and defined color palette with light source direction.',
      starterTemplate: `# Mascot Illustration Sheet: Tara the Tech Turtle
Target Demographic: Primary School Students (Ages 7-12)

1. Character Silhouette & Form:
   - Primary basic shapes: Rounded triangle shell + circular eyes for friendliness.
   - Distinctive accessory: Solar-powered mini propeller backpack.

2. Expression Variations:
   - A. Excited / Discovery (Wide eyes, open smile, raised flippers)
   - B. Problem-Solving / Thinking (One eye squinted, chin tap, tilted head)
   - C. Helping / Guiding (Warm smile, pointing forward gesture)

3. Color Harmony & Shading Palette:
   - Base Tone: Mint Green (#48CAE4)
   - Shadow Tone: Rich Teal (#0077B6 - hue-shifted shadow, not black)
   - Highlight: Soft Sunlight Yellow (#FFD166)

4. Export Formats: Vector SVG + Transparent PNG`,
      expectedOutput: 'Original character turnaround with cohesive expressions, clear silhouette, and hue-shifted lighting.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['link', 'file', 'text'],
      rubric: [
        {
          id: 'crit_ill_silhouette',
          name: 'Silhouette & Character Readability',
          maxPoints: 5,
          description: 'Instantly recognizable silhouette and clear dynamic posing.',
          levelDescriptors: {
            5: 'Distinctive, memorable silhouette that reads clearly even in thumbnail size.',
            3: 'Good character design with slightly generic silhouette.',
            1: 'Muddled, stiff posing.'
          }
        },
        {
          id: 'crit_ill_expressions',
          name: 'Expression & Emotional Storytelling',
          maxPoints: 5,
          description: 'Conveys distinct believable emotions through eyes, mouth, and body language.',
          levelDescriptors: {
            5: 'Vibrant, expressive facial and body storytelling.',
            3: 'Identifiable expressions with slight stiffness.',
            1: 'Repetitive flat expressions.'
          }
        },
        {
          id: 'crit_ill_color',
          name: 'Color Theory & Hue-Shifted Shading',
          maxPoints: 5,
          description: 'Applies deliberate color harmony and shifts hue for lighting/shadows.',
          levelDescriptors: {
            5: 'Luminous hue-shifted color palettes with defined light sources.',
            3: 'Pleasing colors with basic direct shading.',
            1: 'Muddy black shading or clashing random colors.'
          }
        },
        {
          id: 'crit_ill_linework',
          name: 'Linework & Vector Cleanliness',
          maxPoints: 5,
          description: 'Confident line weight variation and smooth vector nodes.',
          levelDescriptors: {
            5: 'Pristine vector bezier curves and dynamic line-weight tapering.',
            3: 'Clean lines with minor node excess.',
            1: 'Shaky, unrefined strokes.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_ill_01',
        skillId: 'illustration',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Color Shading Techniques',
        question: 'When painting shadows on a warm yellow-skinned character, why is it better to shift the shadow color towards warm orange or purple rather than adding black?',
        options: [
          'Adding black desaturates the color and makes the skin look muddy and lifeless (the "ashy" effect).',
          'Black pixels damage digital displays.',
          'Paint software crashes if black is mixed with yellow.',
          'Black ink is more expensive.'
        ],
        correctAnswer: 'Adding black desaturates the color and makes the skin look muddy and lifeless (the "ashy" effect).',
        explanation: 'Hue-shifting shadows towards cooler or complementary hues replicates natural light bounce and keeps colors rich and vibrant.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 6. UI/UX & Interaction Design
  {
    skillId: 'ui_ux_design',
    skillName: 'UI/UX & Interaction Design',
    category: 'Creative',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Designing decorative interfaces without conducting user journey mapping or usability audits.',
        guidance: 'Base UI layouts on user job-to-be-done (JTBD) and minimize click depth.'
      }
    ],
    recommendedNextSkills: ['coding', 'problem_solving', 'market_research'],
    recommendedProjects: ['Library Checkout Flow', 'Blood Donor Finder Mockup', 'Accessible Interface for Seniors'],
    practicalTask: {
      id: 'task_ui_ux_flow_wireframe',
      skillId: 'ui_ux_design',
      title: 'Design a 3-Screen Mobile Flow for Peer Skill Exchange',
      instructions: 'Wireframe and document an intuitive 3-step mobile user journey: 1) Skill Browse/Search Screen with filters, 2) Session Booking & Time Slot Picker, 3) Booking Confirmation & Calendar Sync.',
      starterTemplate: `# UI/UX Specification: Peer Skill Booking Flow
Target User: High School Student booking a 30-minute math tutoring session.

1. Screen 1: Discovery & Filter
   - Search bar with instant autocomplete
   - Filter chips: Subject, Skill Level, Today/This Week
   - Skill card anatomy: Avatar, Tutor Name, Indicative Rating (4.9), Distance/Online tag, "Book" CTA.

2. Screen 2: Time Selection & Intent Scoping
   - Horizontal date picker strip
   - Grid of 30-min available time slots
   - Micro-input: "What specific topic do you want help with?"

3. Screen 3: Confirmation & Feedback
   - Success checkmark animation
   - "Add to Google Calendar" button
   - Meeting link and preparation checklist.

4. Usability Laws Applied:
   - Hick's Law (reducing filter choices to 4 chips)
   - Fitts's Law (48dp full-width bottom sticky booking button)`,
      expectedOutput: 'Clear user flow adhering to Fitts\'s and Hick\'s laws with accessible mobile touch targets.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['link', 'file', 'text'],
      rubric: [
        {
          id: 'crit_ux_journey',
          name: 'User Journey & Friction Reduction',
          maxPoints: 5,
          description: 'Flow is intuitive and minimizes cognitive friction and clicks.',
          levelDescriptors: {
            5: 'Zero dead-ends, smooth progressive disclosure, clear micro-interactions.',
            3: 'Logical flow with minor extra step.',
            1: 'Confusing navigation with high drop-off likelihood.'
          }
        },
        {
          id: 'crit_ui_design_system',
          name: 'Design System & Visual Consistency',
          maxPoints: 5,
          description: 'Consistent 8pt spatial grid, unified typography scale, and standard components.',
          levelDescriptors: {
            5: 'Flawless 8pt grid alignment with systematic typography tokens.',
            3: 'Good visual consistency with minor spacing deviations.',
            1: 'Inconsistent button styles, fonts, and random margins.'
          }
        },
        {
          id: 'crit_ui_accessibility',
          name: 'Accessibility & Touch Targets',
          maxPoints: 5,
          description: 'Minimum 44dp touch targets, clear error states, and high contrast.',
          levelDescriptors: {
            5: 'Fully accessible with clear focus states and WCAG AA contrast.',
            3: 'Good touch targets with minor text contrast issue.',
            1: 'Tiny unclickable buttons (<24px) or missing feedback states.'
          }
        },
        {
          id: 'crit_ux_edge_cases',
          name: 'Edge States & Error Handling',
          maxPoints: 5,
          description: 'Designs empty states, zero search results, and network failure states.',
          levelDescriptors: {
            5: 'Helpful empty states with proactive recovery suggestions.',
            3: 'Basic error messages.',
            1: 'No error or empty states defined.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_ux_01',
        skillId: 'ui_ux_design',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Fitts\'s Law',
        question: 'According to Fitts\'s Law in interaction design, how do you make a primary call-to-action button fastest and easiest for a mobile user to tap?',
        options: [
          'Make the button larger and place it in the bottom thumb zone close to the user\'s natural grip.',
          'Hide the button in a hamburger menu at the top-left corner.',
          'Make the button transparent.',
          'Shrink the button to 10 pixels.'
        ],
        correctAnswer: 'Make the button larger and place it in the bottom thumb zone close to the user\'s natural grip.',
        explanation: 'Fitts\'s Law states that target acquisition time is a function of distance and target width. Larger targets closer to thumb rest zones are tapped fastest.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_ux_02',
        skillId: 'ui_ux_design',
        difficulty: 'Intermediate',
        type: 'scenario',
        competency: 'Form Friction & Hick\'s Law',
        scenarioContext: 'A registration form has 18 required input fields on a single long page, resulting in an 82% abandonment rate.',
        question: 'Which UX design pattern will effectively reduce cognitive overload and increase completion rates?',
        options: [
          'Break the form into a multi-step stepper wizard with progressive disclosure (3-4 related fields per step with a progress bar).',
          'Make the text font smaller so all 18 fields fit on one screen.',
          'Add a loud countdown timer.',
          'Make all 18 fields mandatory with red borders.'
        ],
        correctAnswer: 'Break the form into a multi-step stepper wizard with progressive disclosure (3-4 related fields per step with a progress bar).',
        explanation: 'Progressive disclosure chunks complex tasks into manageable sub-steps, reducing perceived cognitive effort and abandonment.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 7. 3D Modeling & CAD Fabrication
  {
    skillId: '3d_modeling',
    skillName: '3D Modeling & CAD Fabrication',
    category: 'Creative',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Designing steep overhangs (>45 degrees) for FDM 3D printing without considering support material or print orientation.',
        guidance: 'Orient flat faces on the build plate and chamfer downward edges to eliminate support waste.'
      }
    ],
    recommendedNextSkills: ['electronics', 'repair', 'woodworking'],
    recommendedProjects: ['Waterproof Sensor Enclosure', 'Replacement Clock Gear Set', 'Molecular Structure Physical Kit'],
    practicalTask: {
      id: 'task_3d_cad_enclosure',
      skillId: '3d_modeling',
      title: 'Design a Parametric 3D-Printable Enclosure for Electronics',
      instructions: 'Create the CAD specification for a snap-fit enclosure holding an Arduino Nano and 9V battery: wall thickness, snap-fit latch tolerances (0.2mm - 0.3mm clearance), ventilation slots, and print bed orientation.',
      starterTemplate: `# CAD Fabrication Spec: Sensor Pod Enclosure
Target Process: FDM 3D Printing (PLA / PETG, 0.4mm nozzle)

1. Enclosure Dimensions & Wall Parameters:
   - External Dimensions: 80mm x 50mm x 30mm
   - Nominal Wall Thickness: 2.0mm (5 perimeter passes at 0.4mm nozzle)
   - Internal Mounting Bosses: 4x M3 screw standoffs (height: 5mm)

2. Tolerances & Snap-Fit Joint:
   - Lid Mating Clearance: 0.25mm offset to account for PLA thermal shrinkage.
   - Snap-fit cantilever beam depth and hook angle (30° lead-in, 90° lock).

3. Printability & Orientation Strategy:
   - Print Orientation: Base printed flat on build plate; Lid printed top-down.
   - Max overhang angle: 45° (Zero support material required).`,
      expectedOutput: 'Toleranced CAD model specification ready for slicing without support material.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_cad_tolerance',
          name: 'Dimensional Tolerances & Clearances',
          maxPoints: 5,
          description: 'Applies correct offsets (0.2-0.3mm) for interlocking parts and shrinkage.',
          levelDescriptors: {
            5: 'Exact fit tolerances with verified mechanical clearances.',
            3: 'Good tolerances with slight tight fit risk.',
            1: 'Zero tolerance offset (parts will bind or fail to assemble).'
          }
        },
        {
          id: 'crit_cad_printability',
          name: 'Design for Additive Manufacturing (DFAM)',
          maxPoints: 5,
          description: 'Optimizes overhang angles, bridge spans, and eliminates unnecessary supports.',
          levelDescriptors: {
            5: 'Optimal print orientation with self-supporting geometry.',
            3: 'Printable with minimal supports.',
            1: 'Impossible overhangs requiring massive wasteful support structures.'
          }
        },
        {
          id: 'crit_cad_structural',
          name: 'Structural Integrity & Wall Thickness',
          maxPoints: 5,
          description: 'Sufficient wall thickness, filleted internal corners, and stress relief.',
          levelDescriptors: {
            5: 'Generous fillets, reinforced screw bosses, and rigid ribbing.',
            3: 'Adequate thickness.',
            1: 'Paper-thin walls or sharp unfilleted stress-concentration corners.'
          }
        },
        {
          id: 'crit_cad_documentation',
          name: 'CAD Constraints & Technical Drawing',
          maxPoints: 5,
          description: 'Fully constrained sketches and clear orthographic dimension drawings.',
          levelDescriptors: {
            5: 'Fully parametric sketches with zero unconstrained geometry.',
            3: 'Parametric with minor loose dimensions.',
            1: 'Unconstrained sketch.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_cad_01',
        skillId: '3d_modeling',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'FDM 3D Printing Physics',
        question: 'Why are 3D-printed parts significantly weaker along the Z-axis (vertical height) compared to the X-Y horizontal plane?',
        options: [
          'Because parts fail along the microscopic layer-to-layer adhesion boundaries (interlayer delamination under tension).',
          'Because gravity makes vertical plastic softer.',
          'Because the nozzle runs out of heat at the top.',
          'Because the Z motor has less voltage.'
        ],
        correctAnswer: 'Because parts fail along the microscopic layer-to-layer adhesion boundaries (interlayer delamination under tension).',
        explanation: 'FDM printing deposits successive fused strands. Tensile forces pulling layers apart test the inter-layer thermal bond, which is weaker than continuous extruded filament strands.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 8. Content Writing & Social Storytelling
  {
    skillId: 'content_creation',
    skillName: 'Content Writing & Social Storytelling',
    category: 'Creative',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Writing dense, unbroken walls of formal text on social platforms without scannable bullet points or hooks.',
        guidance: 'Use short 1-2 sentence paragraphs, bold keywords, and compelling lead sentences.'
      }
    ],
    recommendedNextSkills: ['marketing', 'graphic_design', 'communication'],
    recommendedProjects: ['30-Day Social Calendar for Pottery Shop', '3-Part Interview Series', 'Tutoring Landing Page Copy'],
    practicalTask: {
      id: 'task_content_editorial_hook',
      skillId: 'content_creation',
      title: 'Write a Compelling 3-Part Social Story & Call-to-Action',
      instructions: 'Write a high-converting 300-word educational story for LinkedIn/Instagram about how a student solved a local food-waste problem through community composting. Follow the Hook -> Struggle -> Breakthrough -> Practical Takeaway structure.',
      starterTemplate: `# Social Editorial Story: The Trash Can That Grew a Garden

[HOOK - 1 Sentence]:
Every morning, 40kg of clean vegetable peels from our school canteen were dumped in landfills. Until two 9th graders built a wooden box.

[THE STRUGGLE]:
When we first pitched bokashi composting, the principal worried about smells and fruit flies. And they were right to worry—our first attempt smelled awful because we got the carbon-to-nitrogen ratio wrong.

[THE BREAKTHROUGH & DATA]:
Instead of giving up, we added dried autumn leaves and sawdust. Within 14 days, the temperature hit 55°C—zero odor, rich dark compost.

[PRACTICAL LESSON / CTA]:
3 rules for any classroom wanting to eliminate food waste:
1. Always balance wet greens with dry browns (1:2 ratio).
2. Aerate every 3 days.
3. Involve the canteen staff from Day 1.

Want our free 1-page setup blueprint? Comment "COMPOST" below!`,
      expectedOutput: 'Emotional narrative hook, authentic vulnerability, quantifiable proof, and actionable CTA.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'link', 'file'],
      rubric: [
        {
          id: 'crit_content_hook',
          name: 'Hook & Audience Engagement',
          maxPoints: 5,
          description: 'Stops the scroll with curiosity, contrast, or bold thesis.',
          levelDescriptors: {
            5: 'Irresistible hook with immediate emotional or intellectual stake.',
            3: 'Good opening line.',
            1: 'Boring, generic opening statement.'
          }
        },
        {
          id: 'crit_content_structure',
          name: 'Narrative Arc & Scannability',
          maxPoints: 5,
          description: 'Uses rhythmic short sentences, whitespace, and clear progression.',
          levelDescriptors: {
            5: 'Pristine rhythm, zero fluff, effortless reading flow.',
            3: 'Good structure with minor bulky paragraph.',
            1: 'Dense wall of text.'
          }
        },
        {
          id: 'crit_content_value',
          name: 'Practical Actionability & Proof',
          maxPoints: 5,
          description: 'Delivers genuine educational value with specific details and numbers.',
          levelDescriptors: {
            5: 'Tangible, proven steps readers can apply immediately.',
            3: 'Helpful general takeaways.',
            1: 'Vague platitudes without substance.'
          }
        },
        {
          id: 'crit_content_cta',
          name: 'Call to Action & Tone',
          maxPoints: 5,
          description: 'Authentic conversational voice with frictionless call to action.',
          levelDescriptors: {
            5: 'Compelling, natural CTA driving authentic community discussion.',
            3: 'Clear CTA.',
            1: 'Aggressive sales pitch or missing CTA.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_con_01',
        skillId: 'content_creation',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Copywriting Frameworks',
        question: 'In the classic copywriting formula "AIDA", what do the letters stand for?',
        options: [
          'Attention, Interest, Desire, Action',
          'Automate, Iterate, Deploy, Analyze',
          'Articles, Images, Designs, Audio',
          'Always Inspect Data Accuracy'
        ],
        correctAnswer: 'Attention, Interest, Desire, Action',
        explanation: 'AIDA guides the reader sequentially: capture Attention with a hook -> maintain Interest with story -> ignite Desire with benefits -> prompt Action with a CTA.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  }
];
