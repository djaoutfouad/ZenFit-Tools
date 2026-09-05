import { CalculatorMeta, CategoryMeta } from '../types';

export const CATEGORIES_CATALOG: CategoryMeta[] = [
  {
    id: 'metabolism',
    slug: 'metabolism-diet',
    routePath: '/categories/metabolism-diet',
    title: 'Metabolism & Diet',
    shortDescription: 'Validated clinical models for caloric expenditure, adaptive thermogenesis, nutrient partitioning, and fasting physiology.',
    badge: '5 Core Calculators',
  },
  {
    id: 'body_composition',
    slug: 'body-composition',
    routePath: '/categories/body-composition',
    title: 'Body Composition',
    shortDescription: 'Anthropometric formulas, logarithmic circumferences, lean mass tracking, and natural muscular thresholds.',
    badge: '5 Precision Models',
  },
  {
    id: 'performance',
    slug: 'cardio-strength',
    routePath: '/categories/cardio-strength',
    title: 'Cardio & Strength',
    shortDescription: 'Cardiopulmonary reserve metrics, fatigue kinetics, maximal strength standards, and metabolic equivalent expenditure.',
    badge: '5 Athletic Tools',
  },
  {
    id: 'biohacking',
    slug: 'biohacking-recovery',
    routePath: '/categories/biohacking-recovery',
    title: 'Biohacking & Recovery',
    shortDescription: 'Ultradian sleep architecture, cellular hydration dynamics, cellular ergogenic saturation, and chronobiology.',
    badge: '4 Longevity Tools',
  },
];

export const CALCULATORS_CATALOG: CalculatorMeta[] = [
  {
    id: 'tdee',
    slug: 'tdee-daily-calorie-burn-calculator',
    routePath: '/calculators/tdee-daily-calorie-burn',
    title: 'TDEE & Daily Calorie Burn Calculator',
    shortDescription: 'Calculate your precise Total Daily Energy Expenditure (TDEE) and basal metabolic rate using Mifflin-St Jeor and Katch-McArdle equations.',
    category: 'metabolism',
    badge: 'Core Metric',
    personaImageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Sports Dietitian & Caloric Metabolism Lead',
    formulaSummary: 'TDEE = BMR × Physical Activity Level (PAL)',
    detailedFormulaHtml: `
      <p class="mb-3"><strong>1. Mifflin-St Jeor Basal Metabolic Rate (BMR):</strong></p>
      <ul class="list-disc pl-5 space-y-1 mb-4 text-slate-700">
        <li><strong>Men:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5</li>
        <li><strong>Women:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161</li>
      </ul>
      <p class="mb-3"><strong>2. Katch-McArdle Formula (Lean Body Mass driven):</strong></p>
      <p class="text-slate-700 mb-4 pl-5">BMR = 370 + (21.6 × Lean Body Mass in kg)</p>
      <p class="mb-3"><strong>3. Activity Multipliers:</strong> Sedentary (1.20), Lightly Active (1.375), Moderately Active (1.55), Very Active (1.725), Athlete / Extreme (1.90).</p>
    `,
    scientificGuidelines: [
      'American College of Sports Medicine (ACSM) Energy Balance Guidelines (2022)',
      'Academy of Nutrition and Dietetics Clinical Review: Mifflin-St Jeor vs Harris-Benedict (Validation error rate < 10%)',
      'International Society of Sports Nutrition (ISSN) Position Stand: Diets and Body Composition (Kerksick et al., 2018)'
    ],
    scientificReferences: [
      'Mifflin MD, St Jeor ST, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51(2):241-247.',
      'Katch FI, McArdle WD. Nutrition, Weight Control, and Exercise. Lea & Febiger, 1983.',
      'Westerterp KR. Physical activity and minimal energy expenditure. Am J Clin Nutr. 1998;68(4):947S-951S.'
    ],
    safetyDisclosures: [
      'Energy calculations are empirical estimations based on population averages. Individual metabolic variances of ±8-12% can occur due to adaptive thermogenesis and thyroid hormone balance.',
      'Never consume below your Basal Metabolic Rate (BMR) for extended periods without medical supervision, as this triggers neuroendocrine starvation responses.'
    ],
    faqs: [
      {
        question: 'What is the physiological difference between BMR and TDEE?',
        answer: 'Basal Metabolic Rate (BMR) represents the absolute minimum caloric energy required by the central nervous system, cellular ion pumps, and visceral organs to sustain life in a comatose state at thermoneutral temperature. TDEE includes BMR plus the Thermic Effect of Food (TEF ~10%), Non-Exercise Activity Thermogenesis (NEAT ~15%), and Exercise Activity Thermogenesis (EAT).'
      },
      {
        question: 'Which equation is more accurate: Mifflin-St Jeor or Katch-McArdle?',
        answer: 'Mifflin-St Jeor is the gold standard for individuals whose body fat percentage is unknown. However, for lean athletes and resistance-trained lifters with known body composition, Katch-McArdle is clinically superior because it calculates metabolic burn directly from metabolically active lean muscle mass rather than total scale weight.'
      },
      {
        question: 'What caloric deficit should I set for safe, sustained fat loss?',
        answer: 'The American College of Sports Medicine recommends a moderate deficit of 300 to 500 kcal/day beneath TDEE. This typically yields a sustainable fat loss rate of 0.5% to 1.0% of total bodyweight per week while preserving lean skeletal muscle tissue and avoiding adaptive hormonal downregulation.'
      },
      {
        question: 'Why does weight loss plateau after several weeks at the same caloric intake?',
        answer: 'As body mass decreases, your BMR drops proportionally. Simultaneously, unconscious NEAT (fidgeting, posture) decreases, and metabolic adaptation reduces mitochondrial respiration efficiency. Recalculating your TDEE every 4 to 6 weeks is essential to adjust caloric targets.'
      }
    ]
  },
  {
    id: 'macros',
    slug: 'advanced-macronutrient-macro-split-estimator',
    routePath: '/calculators/advanced-macronutrient-split',
    title: 'Advanced Macronutrient & Macro Split Estimator',
    shortDescription: 'Calculate gram-accurate protein, carbohydrate, and dietary fat ratios tailored to fat loss, muscle hypertrophy, or ketogenic protocols.',
    category: 'metabolism',
    badge: 'Nutrition Suite',
    personaImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Clinical Sports Nutritionist',
    formulaSummary: 'Caloric Budget = (Protein × 4 kcal) + (Carbohydrate × 4 kcal) + (Fats × 9 kcal)',
    detailedFormulaHtml: `
      <p class="mb-3">Energy density per macronutrient:</p>
      <ul class="list-disc pl-5 space-y-1 mb-4 text-slate-700">
        <li><strong>Protein:</strong> 4.0 kcal per gram</li>
        <li><strong>Carbohydrates:</strong> 4.0 kcal per gram</li>
        <li><strong>Dietary Fats:</strong> 9.0 kcal per gram</li>
      </ul>
      <p class="text-slate-700">Protein allocation is anchored primarily at 1.8 - 2.4 g/kg bodyweight, with residual energy partitioned between essential fatty acids (minimum 0.7 g/kg) and glycogen-replenishing carbohydrates.</p>
    `,
    scientificGuidelines: [
      'ISSN Position Stand: Protein and Exercise (Jäger et al., 2017)',
      'Helms ER, et al. A systematic review of dietary protein during caloric restriction in resistance-trained lean athletes. Int J Sport Nutr Exerc Metab. 2014.',
      'Thomas DT, et al. American College of Sports Medicine Joint Position Statement: Nutrition and Athletic Performance. Med Sci Sports Exerc. 2016.'
    ],
    scientificReferences: [
      'Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training. Br J Sports Med. 2018;52(6):376-384.',
      'Phillips SM, Van Loon LJ. Dietary protein for athletes: from requirements to optimum adaptation. J Sports Sci. 2011;29(sup1):S29-S38.'
    ],
    safetyDisclosures: [
      'Individuals with diagnosed pre-existing renal impairment or hepatic failure must consult a nephrologist before adopting high-protein dietary protocols exceeding 1.8 g/kg.',
      'Extremely low fat diets (< 15% of total caloric intake) impair lipid-soluble vitamin absorption (A, D, E, K) and downregulate endogenous steroidogenesis.'
    ],
    faqs: [
      {
        question: 'How much protein is required per day to maximize muscle hypertrophy?',
        answer: 'The current scientific consensus published by Morton et al. (2018) in the British Journal of Sports Medicine indicates that 1.6 to 2.2 grams of protein per kilogram of bodyweight (0.73 - 1.0 g/lb) is sufficient to maximize muscle protein synthesis in resistance-trained individuals.'
      },
      {
        question: 'Why does fat loss require higher protein intake than bulking?',
        answer: 'During a hypocaloric deficit, endogenous amino acids are increasingly oxidized for gluconeogenesis. Upping protein to 2.2 - 2.6 g/kg protects lean skeletal tissue from proteolysis and exerts a superior satiety effect through peptide YY and GLP-1 stimulation.'
      },
      {
        question: 'Can I build muscle on a low-carbohydrate or ketogenic macro split?',
        answer: 'Yes, muscle hypertrophy can occur provided caloric surplus and protein thresholds are met. However, anaerobic glycolytic training (high volume lifting between 8-15 reps) relies heavily on intracellular muscle glycogen; low carbohydrate stores may impair total training volume and peak power output.'
      },
      {
        question: 'How should I distribute my macros across daily meals?',
        answer: 'Research suggests spacing protein into 3 to 5 meals of 0.4 to 0.55 g/kg each (roughly 25 to 45g of high biological value protein per meal) to repeatedly trigger the leucine threshold (~2.7g - 3.2g leucine) and initiate muscle protein synthesis via mTORC1.'
      }
    ]
  },
  {
    id: 'navy_body_fat',
    slug: 'us-navy-body-fat-percentage-calculator',
    routePath: '/calculators/us-navy-body-fat-percentage',
    title: 'US Navy Body Fat Percentage Calculator',
    shortDescription: 'Empirical body circumference method adopted by the United States Department of Defense for accurate body composition assessment.',
    category: 'body_composition',
    badge: 'Clinical Anthropometry',
    personaImageUrl: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Clinical Anthropometry Specialist',
    formulaSummary: 'Logarithmic circumference regression modeling height, neck, waist, and hips',
    detailedFormulaHtml: `
      <p class="mb-3"><strong>US Navy Circumference Equations (Hodgdon & Beckett, 1984):</strong></p>
      <ul class="list-disc pl-5 space-y-2 mb-4 text-slate-700">
        <li><strong>Men:</strong> % Fat = 495 / [1.0324 - 0.19077 × log₁₀(Waist - Neck) + 0.15456 × log₁₀(Height)] - 450</li>
        <li><strong>Women:</strong> % Fat = 495 / [1.29579 - 0.35004 × log₁₀(Waist + Hip - Neck) + 0.22100 × log₁₀(Height)] - 450</li>
      </ul>
      <p class="text-sm text-slate-600">All circumferences measured in centimeters with a non-elastic tension tape across standardized anatomical landmarks.</p>
    `,
    scientificGuidelines: [
      'DoD Instruction 1308.3: DoD Physical Fitness and Body Fat Program Procedures',
      'Babcock et al. Validation of anthropometric equations for predicting body fat in military cohorts. Med Sci Sports Exerc. 2011.',
      'American Council on Exercise (ACE) Body Composition Percentile Norms'
    ],
    scientificReferences: [
      'Hodgdon JA, Beckett MB. Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Naval Health Research Center Reports. 1984.',
      'Wright SW, et al. Measurement of body composition: a comparison of skinfold thickness and circumference methods. J Strength Cond Res. 2008.'
    ],
    safetyDisclosures: [
      'Circumference-based estimates can exhibit a ±3-4% standard error of estimate compared to dual-energy X-ray absorptiometry (DEXA) or hydrostatic weighing.',
      'Measure immediately upon waking, fasted, and avoid measuring post-workout when acute muscle pump or subcutaneous hydration shifts alter tape readings.'
    ],
    faqs: [
      {
        question: 'Where exactly should tape measurements be taken?',
        answer: 'Neck: Measure immediately below the larynx (Adam’s apple) with head upright. Waist: For men, measure horizontally across the navel; for women, measure at the narrowest point of the natural waistline. Hips (women): Measure across the widest point of the buttocks.'
      },
      {
        question: 'How does the US Navy method compare to DEXA scans?',
        answer: 'In clinical comparisons, the US Navy method has a correlation coefficient of r = 0.85 to 0.90 against underwater weighing and DEXA. It is significantly less prone to hydration-related fluctuations than bioelectrical impedance analysis (BIA) bathroom scales.'
      },
      {
        question: 'What are healthy body fat percentage ranges for men and women?',
        answer: 'Essential fat is 2-5% for men and 10-13% for women. Athletic conditioning is 6-13% (men) and 14-20% (women). Fitness range is 14-17% (men) and 21-24% (women). Average acceptable health is 18-24% (men) and 25-31% (women).'
      },
      {
        question: 'Why do women require a higher baseline body fat percentage than men?',
        answer: 'Women possess essential sex-specific adipose tissue in breast tissue, pelvis, and reproductive organs. Dropping below ~12-14% body fat in females frequently induces hypothalamic amenorrhea, bone demineralization, and endocrine disruption (Female Athlete Triad).'
      }
    ]
  },
  {
    id: 'one_rep_max',
    slug: 'one-rep-max-strength-standards-calculator',
    routePath: '/calculators/one-rep-max-strength-standards',
    title: 'One-Rep Max (1RM) & Strength Standards Calculator',
    shortDescription: 'Calculate your maximum single-rep strength using 6 peer-reviewed formulas and view customized percentage-based training loads.',
    category: 'performance',
    badge: 'Power & Strength',
    personaImageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Strength & Powerlifting Coach',
    formulaSummary: 'Brzycki, Epley, Lombardi, Mayhew, O\'Conner, and Wathan empirical models',
    detailedFormulaHtml: `
      <ul class="list-disc pl-5 space-y-1 mb-4 text-slate-700">
        <li><strong>Brzycki:</strong> 1RM = Weight / (1.0278 - 0.0278 × Reps)</li>
        <li><strong>Epley:</strong> 1RM = Weight × (1 + 0.0333 × Reps)</li>
        <li><strong>Lombardi:</strong> 1RM = Weight × Reps⁰·¹⁰</li>
        <li><strong>Mayhew:</strong> 1RM = (100 × Weight) / (52.2 + 41.9 × e⁻⁰·⁰⁵⁵ˣʳᵉᵖˢ)</li>
        <li><strong>O\'Conner:</strong> 1RM = Weight × (1 + 0.025 × Reps)</li>
        <li><strong>Wathan:</strong> 1RM = (100 × Weight) / (48.8 + 53.8 × e⁻⁰·⁰⁷⁵ˣʳᵉᵖˢ)</li>
      </ul>
    `,
    scientificGuidelines: [
      'National Strength and Conditioning Association (NSCA) Guidelines for Resistance Training Load Prescription',
      'LeSuer DA, et al. The accuracy of prediction equations for estimating 1-RM performance in the bench press, squat, and deadlift. J Strength Cond Res. 1997.',
      'Reynolds JM, et al. Prediction of one repetition maximum strength from multiple repetition maximum testing. J Strength Cond Res. 2006.'
    ],
    scientificReferences: [
      'Brzycki M. Strength testing—predicting a one-rep max from reps-to-fatigue. J Health Phys Educ Rec Dance. 1993;64(1):88-90.',
      'Epley B. Poundage chart. Boyd Epley Workout. Lincoln, NE: University of Nebraska, 1985.'
    ],
    safetyDisclosures: [
      'Multi-rep estimations become progressively less reliable above 10 repetitions due to variations in individual muscle fiber composition and aerobic capacity.',
      'Always utilize certified safety spotters or safety pins when attempting true 1RM loads in compound lifts.'
    ],
    faqs: [
      {
        question: 'Why use submaximal rep tests instead of testing a true 1RM?',
        answer: 'Testing true 1RM poses substantial musculoskeletal risk to connective tissues, tendons, and the axial skeleton. Submaximal testing (3 to 6 repetitions performed with strict mechanics) yields ~98% predictive accuracy while dramatically lowering injury likelihood and central nervous system fatigue.'
      },
      {
        question: 'Which formula is most reliable for heavy compound lifts?',
        answer: 'The Brzycki and Epley equations are the most extensively validated in sports science literature for bench press, back squat, and deadlift tests between 2 and 6 repetitions.'
      },
      {
        question: 'How should I translate 1RM percentages into hypertrophy training?',
        answer: 'Hypertrophy protocols typically utilize 65% to 80% of 1RM for sets of 6 to 12 repetitions within 1-3 Reps in Reserve (RIR). Strength development focuses on 82.5% to 92.5% of 1RM for sets of 2 to 5 reps.'
      },
      {
        question: 'Can someone with high slow-twitch fibers do more reps at 80% 1RM?',
        answer: 'Yes. Individuals with predominantly Type I (slow-twitch) muscle fibers often perform 12-15 repetitions at 75-80% 1RM, whereas fast-twitch dominant lifters may fatigue after 7-8 reps. This makes 3-5 rep sets the most reliable window for calculation.'
      }
    ]
  },
  {
    id: 'heart_rate_zones',
    slug: 'target-heart-rate-training-zones-calculator',
    routePath: '/calculators/target-heart-rate-training-zones',
    title: 'Target Heart Rate & Training Zones Calculator',
    shortDescription: 'Determine your 5 cardiovascular physiological training zones based on Tanaka age-predicted maximum and Karvonen Heart Rate Reserve.',
    category: 'performance',
    badge: 'Cardiovascular Suite',
    personaImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Cardiovascular Conditioning Director',
    formulaSummary: 'Tanaka Max HR = 208 - (0.7 × Age) | Karvonen Target = Rest HR + [% × (Max HR - Rest HR)]',
    detailedFormulaHtml: `
      <p class="mb-2"><strong>Tanaka Equation (2001):</strong> Max HR = 208 - (0.7 × Age)</p>
      <p class="mb-3"><strong>Karvonen Heart Rate Reserve (HRR):</strong> Target HR = Resting HR + [% Intensity × (Max HR - Resting HR)]</p>
      <p class="text-sm text-slate-600">Calculates precise thresholds for Zone 1 (Recovery 50-60%), Zone 2 (Base Aerobic 60-70%), Zone 3 (Tempo 70-80%), Zone 4 (Threshold 80-90%), and Zone 5 (VO2 Max 90-100%).</p>
    `,
    scientificGuidelines: [
      'American Heart Association (AHA) Exercise Standards for Testing and Training',
      'Tanaka H, Monahan KD, Seals DR. Age-predicted maximal heart rate revisited. J Am Coll Cardiol. 2001;37(1):153-156.',
      'Seiler S. What is best practice for training intensity and duration distribution in endurance athletes? Int J Sports Physiol Perform. 2010.'
    ],
    scientificReferences: [
      'Karvonen MJ, Kentala E, Mustala O. The effects of training on heart rate; a longitudinal study. Ann Med Exp Biol Fenn. 1957;35(3):307-315.',
      'Fox SM, Naughton JP, Haskell WL. Physical activity and the prevention of coronary heart disease. Ann Clin Res. 1971;3(6):404-432.'
    ],
    safetyDisclosures: [
      'Beta-blockers, anti-arrhythmics, calcium-channel antagonists, and stimulants significantly alter resting and peak heart rate.',
      'Consult a cardiologist before engaging in Zone 4 or Zone 5 training if you possess a family history of cardiovascular disease or exertional syncope.'
    ],
    faqs: [
      {
        question: 'Why is Zone 2 training emphasized so heavily by longevity physiologists?',
        answer: 'Zone 2 training (lactate < 2.0 mmol/L) stimulates mitochondrial biogenesis and enhances the ability of muscle cells to clear lactate and oxidize fatty acids through beta-oxidation. It builds the aerobic engine without imposing autonomic nervous system exhaustion.'
      },
      {
        question: 'Why is the Tanaka equation better than the traditional 220 - Age rule?',
        answer: 'The traditional Fox formula (220 - age) was formulated from a small meta-review in 1971 and substantially underestimates maximum heart rate in older adults. Tanaka et al. analyzed 351 studies with 18,712 subjects, proving 208 - (0.7 × age) provides superior statistical precision across all age brackets.'
      },
      {
        question: 'How do I know I am in Zone 2 without a heart rate monitor?',
        answer: 'You can apply the ventilatory "Talk Test": in Zone 2, you should be breathing through your nose or able to speak full sentences comfortably without gasping, but unable to sing.'
      },
      {
        question: 'How does resting heart rate impact training zone calculations?',
        answer: 'By incorporating resting heart rate via the Karvonen method, the calculator accounts for individual cardiovascular fitness. A lower resting heart rate indicates higher stroke volume, expanding your operational Heart Rate Reserve.'
      }
    ]
  },
  {
    id: 'running_pace',
    slug: 'running-pace-race-time-predictor',
    routePath: '/calculators/running-pace-race-predictor',
    title: 'Running Pace & Race Time Predictor',
    shortDescription: 'Convert split paces (min/km & min/mile) and predict 5K, 10K, Half, and Full Marathon times using Pete Riegel’s fatigue equation.',
    category: 'performance',
    badge: 'Endurance Science',
    personaImageUrl: 'https://images.unsplash.com/photo-1483721074576-805b8c8fa250?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Endurance & Marathon Pacing Lead',
    formulaSummary: 'Riegel Fatigue Model: T₂ = T₁ × (D₂ / D₁)¹·⁰⁶',
    detailedFormulaHtml: `
      <p class="mb-3"><strong>Pete Riegel Endurance Equation:</strong></p>
      <p class="text-slate-800 font-mono bg-slate-100 p-3 rounded-xl mb-4">T₂ = T₁ × (D₂ / D₁)¹·⁰⁶</p>
      <p class="text-slate-700">Where T₁ is your baseline race time, D₁ is baseline distance, D₂ is target distance, and 1.06 is the empirical fatigue factor across human aerobic endurance events from 1,500m to ultra-marathons.</p>
    `,
    scientificGuidelines: [
      'World Athletics Physiological Evaluation Models',
      'Riegel PS. Athletic records and human endurance. American Scientist. 1981;69(3):285-290.',
      'Daniels J. Daniels\' Running Formula (4th Edition). Human Kinetics, 2021.'
    ],
    scientificReferences: [
      'Vickers AJ, Vertosick FT. An empirical study of race times in recreational marathon runners. BMC Sports Sci Med Rehabil. 2016;8:26.',
      'Noakes TD. Lore of Running (4th Edition). Human Kinetics, 2003.'
    ],
    safetyDisclosures: [
      'The Riegel prediction assumes adequate aerobic base training for the target distance. Attempting a marathon based purely on 5K pace without high weekly mileage will result in glycogen depletion ("the wall").',
      'Environmental factors including heat index, humidity, elevation, and terrain grade alter pacing requirements by 3-15%.'
    ],
    faqs: [
      {
        question: 'Why does the Riegel equation use an exponent of 1.06?',
        answer: 'In 1981, research engineer Pete Riegel analyzed world records from 1,500m to 100 miles. He discovered that human speed decays at a predictable logarithmic power function with an exponent of 1.06 due to neuromuscular fatigue, glycogen depletion, and thermoregulatory load.'
      },
      {
        question: 'Can I predict my marathon time accurately from a 5K test?',
        answer: 'While mathematically possible, a 5K relies 85% on aerobic capacity and 15% on anaerobic power, whereas a marathon is 99% aerobic and limited by hepatic/muscular glycogen capacity. A Half Marathon time provides a much more accurate predictor for a Full Marathon.'
      },
      {
        question: 'What is negative split pacing in endurance racing?',
        answer: 'A negative split occurs when the second half of a race is run faster than the first half. Physiological data confirms this is the optimal pacing strategy for distance records, preventing premature lactate accumulation and preserving muscle glycogen stores.'
      },
      {
        question: 'What cadence (steps per minute) should I aim for when running?',
        answer: 'Most elite distance runners maintain a stride cadence between 170 and 185 steps per minute (SPM). Higher cadence reduces ground contact time, shortens over-striding, and significantly lowers peak impact forces on the patellofemoral joint.'
      }
    ]
  },
  {
    id: 'intermittent_fasting',
    slug: 'intermittent-fasting-window-autophagy-timer',
    routePath: '/calculators/intermittent-fasting-autophagy',
    title: 'Intermittent Fasting Window & Autophagy Timer',
    shortDescription: 'Plan circadian feeding windows (16:8, 18:6, 20:4, OMAD) and map physiological metabolic checkpoints from ketosis to peak autophagy.',
    category: 'biohacking',
    badge: 'Circadian Biology',
    personaImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Circadian Biology & Fasting Researcher',
    formulaSummary: 'Temporal feeding boundaries & cellular lysosomal autophagy progression',
    detailedFormulaHtml: `
      <p class="mb-3">Chronobiological stages of fasting:</p>
      <ul class="list-disc pl-5 space-y-1 mb-4 text-slate-700">
        <li><strong>0-4h:</strong> Postprandial Digestion & Insulin Storage</li>
        <li><strong>4-8h:</strong> Euglycemic Stabilization & Glucagon Release</li>
        <li><strong>8-12h:</strong> Hepatic Glycogen Depletion</li>
        <li><strong>12-18h:</strong> Beta-Oxidation & Ketone Generation</li>
        <li><strong>18-24h:</strong> AMPK Activation & Autophagy Trigger</li>
        <li><strong>24h+:</strong> Peak Autophagy & Human Growth Hormone (HGH) Surge</li>
      </ul>
    `,
    scientificGuidelines: [
      'Panda S. Circadian clock regulation of hepatic metabolism. Cell Metab. 2016.',
      'Mattson MP, et al. Effects of Intermittent Fasting on Health, Aging, and Disease. N Engl J Med. 2019;381(26):2541-2551.',
      'Levine B, Kroemer G. Biological Functions of Autophagy Genes: A Disease Perspective. Cell. 2019;176(1-2):11-42.'
    ],
    scientificReferences: [
      'de Cabo R, Mattson MP. Effects of Intermittent Fasting on Health, Aging, and Disease. N Engl J Med. 2019.',
      'Alirezaei M, et al. Short-term fasting induces profound neuronal autophagy. Autophagy. 2010;6(6):702-710.'
    ],
    safetyDisclosures: [
      'Pregnant or nursing mothers, individuals with a history of eating disorders, and Type 1 diabetics must not undertake extended fasts without physician clearance.',
      'Maintain electrolyte balance (sodium, potassium, magnesium) with unflavored mineral salts during fasting periods exceeding 16 hours.'
    ],
    faqs: [
      {
        question: 'What breaks an intermittent fast from a cellular standpoint?',
        answer: 'Any caloric intake, particularly amino acids (leucine, methionine) or carbohydrates, triggers insulin secretion and reactivates the mammalian target of rapamycin (mTORC1), which shuts down autophagy. Black coffee, plain green tea, and water do not break a metabolic fast.'
      },
      {
        question: 'When does cellular autophagy peak during a fast?',
        answer: 'In humans, baseline basal autophagy is always occurring at low rates. Significant upregulation occurs around 16 to 18 hours of fasting, reaching peak physiological stimulation between 24 and 48 hours as liver glycogen is exhausted and AMPK signaling peaks.'
      },
      {
        question: 'Will intermittent fasting cause muscle loss?',
        answer: 'No, provided daily protein requirements (1.6 - 2.2 g/kg) and resistance training volume are maintained within the eating window. Fasting triggers a compensatory rise in endogenous growth hormone that actively preserves skeletal muscle proteins from catabolism.'
      },
      {
        question: 'What is the optimal timing for the daily feeding window?',
        answer: 'Early Time-Restricted Feeding (eTRF), such as an 8:00 AM to 4:00 PM or 10:00 AM to 6:00 PM window, aligns superiorly with human circadian insulin sensitivity compared to late-evening eating windows that disrupt melatonin secretion and sleep architecture.'
      }
    ]
  },
  {
    id: 'hydration',
    slug: 'daily-water-hydration-intake-calculator',
    routePath: '/calculators/daily-water-hydration-intake',
    title: 'Daily Water & Hydration Intake Calculator',
    shortDescription: 'Calculate volumetric fluid requirements based on body mass, exercise sweat rate, environmental climate, and electrolyte dynamics.',
    category: 'biohacking',
    badge: 'Electrolyte Balance',
    personaImageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Fluid & Electrolyte Balance Specialist',
    formulaSummary: 'Fluid Requirement = (Body Mass × 35 ml/kg) + Exercise Sweat Loss + Climate Adjustment',
    detailedFormulaHtml: `
      <p class="mb-3"><strong>Baseline Daily Hydration:</strong> 35 ml fluid per kg of body mass</p>
      <p class="mb-3"><strong>Exercise Sweat Replacement:</strong> +400ml to 750ml per 30 minutes of vigorous sweat-inducing activity</p>
      <p class="mb-3"><strong>Environmental Stressors:</strong> Hot/Humid (+25%), Dry/Arid (+20%), Cold/High Altitude (+15%)</p>
    `,
    scientificGuidelines: [
      'National Academies of Sciences, Engineering, and Medicine (NASEM) Dietary Reference Intakes for Water',
      'ACSM Position Stand: Exercise and Fluid Replacement (Sawka et al., 2007)',
      'Cheuvront SN, Kenefick RW. Dehydration: physiology, assessment, and performance effects. Compr Physiol. 2014.'
    ],
    scientificReferences: [
      'Sawka MN, et al. American College of Sports Medicine position stand. Exercise and fluid replacement. Med Sci Sports Exerc. 2007;39(2):377-390.',
      'Armstrong LE. Assessing hydration status: the elusive gold standard. J Am Coll Nutr. 2007;26(sup5):575S-584S.'
    ],
    safetyDisclosures: [
      'Over-hydrating with pure distilled or low-sodium water during prolonged endurance events (>3 hours) can trigger exercise-associated hyponatremia (EAH), a life-threatening dilution of blood sodium.',
      'Assess urine color: pale straw yellow indicates optimal hydration; completely clear urine often indicates over-hydration with excessive electrolyte flushing.'
    ],
    faqs: [
      {
        question: 'Why is drinking plain water sometimes insufficient for intense exercise?',
        answer: 'Sweat contains both water and critical osmotic electrolytes—primarily sodium (400-1,200 mg/L), along with potassium, magnesium, and chloride. Replacing sweat with pure water dilutes blood osmolarity, blunts thirst, and can trigger muscular cramping or hyponatremia.'
      },
      {
        question: 'How much fluid should I consume per hour during resistance training?',
        answer: 'Aim for 400 to 800 ml (14 to 28 oz) per hour, consumed in regular sips of 150-250 ml every 15-20 minutes. Avoid chugging massive volumes at once, which causes gastric sloshing and impairs gastric emptying.'
      },
      {
        question: 'Does coffee or tea contribute toward daily hydration totals?',
        answer: 'Yes. Controlled trials by Armstrong et al. confirm that caffeine doses under 300-400 mg do not exert a net dehydrating diuretic effect in habitual consumers; the fluid content of the beverage outweighs the mild acute diuretic impact.'
      },
      {
        question: 'How do I calculate my individual sweat rate accurately?',
        answer: 'Weigh yourself naked immediately before a 60-minute training session. Weigh yourself naked again immediately after, noting any fluid consumed and urine expelled. One kilogram of lost weight equals approximately one liter of sweat loss.'
      }
    ]
  },
  {
    id: 'creatine',
    slug: 'creatine-loading-dosage-calculator',
    routePath: '/calculators/creatine-loading-dosage',
    title: 'Creatine Loading & Dosage Calculator',
    shortDescription: 'Calculate optimal creatine monohydrate loading vs steady saturation protocols and daily maintenance doses based on lean body mass.',
    category: 'biohacking',
    badge: 'Ergogenic Aids',
    personaImageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Sports Pharmacokinetics & Ergogenics Advisor',
    formulaSummary: 'Loading: 0.3 g/kg/day (divided 4×) for 5-7 days | Maintenance: 0.03-0.05 g/kg/day',
    detailedFormulaHtml: `
      <ul class="list-disc pl-5 space-y-2 mb-4 text-slate-700">
        <li><strong>Rapid Loading Phase:</strong> Body mass (kg) × 0.3g = Total daily grams for 5 to 7 days, divided into 4 discrete 5g doses.</li>
        <li><strong>Steady Saturation Protocol:</strong> 3g to 5g daily for 28 consecutive days to reach identical intracellular phosphocreatine levels without GI distress.</li>
        <li><strong>Long-Term Maintenance:</strong> 3g to 5g/day (or up to 8-10g/day for athletes exceeding 90 kg of lean skeletal mass).</li>
      </ul>
    `,
    scientificGuidelines: [
      'ISSN Position Stand: Safety and Efficacy of Creatine Supplementation in Exercise, Sport, and Medicine (Buford et al., 2007 / Kreider et al., 2017)',
      'Hultman E, et al. Muscle creatine loading in men. J Appl Physiol. 1996;81(1):232-237.',
      'Gualano B, et al. In sickness and in health: the widespread application of creatine supplementation. Amino Acids. 2012.'
    ],
    scientificReferences: [
      'Kreider RB, et al. International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine. J Int Soc Sports Nutr. 2017;14:18.',
      'Antonio J, Ciccone V. The effects of pre versus post workout supplementation of creatine monohydrate on body composition and strength. J Int Soc Sports Nutr. 2013;10:36.'
    ],
    safetyDisclosures: [
      'Creatine draws water into the intracellular muscle compartment (cell volumization), which typically causes a benign scale weight increase of 1 to 2.5 kg during initial saturation.',
      'Serum creatinine blood tests will artificially read slightly higher due to metabolic clearance; inform your physician that you supplement with creatine prior to routine kidney panels.'
    ],
    faqs: [
      {
        question: 'Is a loading phase strictly required when starting creatine?',
        answer: 'No. A loading phase saturates intramuscular phosphocreatine stores within 5 to 7 days, whereas a steady 3-5g daily dose achieves identical saturation levels within 28 days without the mild gastrointestinal discomfort that some experience with 20g/day.'
      },
      {
        question: 'When is the optimal time to take creatine: pre-workout or post-workout?',
        answer: 'Research by Antonio & Ciccone indicates a slight statistical advantage for post-workout ingestion alongside protein and carbohydrates, as insulin spike stimulates the sodium-dependent creatine transporter (CreaT). However, total daily adherence is 95% of the battle.'
      },
      {
        question: 'Does creatine monohydrate cause hair loss or kidney damage?',
        answer: 'Over 500 peer-reviewed clinical trials span decades of research: creatine does not damage healthy kidneys. The hair loss myth stems from a single 2009 rugby study that observed minor DHT fluctuations without measuring hair loss; dozens of follow-up studies have failed to replicate this.'
      },
      {
        question: 'Do I need to cycle off creatine periodically?',
        answer: 'No. Endogenous creatine synthesis downregulates slightly during supplementation, but returns to baseline within 4 to 6 weeks upon cessation. There is no biological adaptation or receptor downregulation that necessitates cycling on and off.'
      }
    ]
  },
  {
    id: 'ffmi',
    slug: 'lean-body-mass-ffmi-calculator',
    routePath: '/calculators/lean-body-mass-ffmi',
    title: 'Lean Body Mass (LBM) & FFMI Calculator',
    shortDescription: 'Calculate Fat-Free Mass Index (FFMI) and normalized FFMI to evaluate genetic muscle-building limits based on Kouri et al. benchmarks.',
    category: 'body_composition',
    badge: 'Natural Limit Benchmarks',
    personaImageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Natural Physique & Anthropometry Analyst',
    formulaSummary: 'FFMI = LBM (kg) / Height (m)² | Normalized = FFMI + 6.1 × (1.8 - Height)',
    detailedFormulaHtml: `
      <p class="mb-3"><strong>Standard FFMI Equation:</strong></p>
      <p class="text-slate-800 font-mono bg-slate-100 p-3 rounded-xl mb-3">FFMI = Lean Body Mass (kg) / [Height (m)]²</p>
      <p class="mb-3"><strong>Height-Normalized FFMI (Kouri et al., 1995):</strong></p>
      <p class="text-slate-800 font-mono bg-slate-100 p-3 rounded-xl mb-4">Normalized FFMI = FFMI + 6.1 × [1.8 - Height (m)]</p>
      <p class="text-sm text-slate-600">The normalization factor adjusts for the allometric scaling artifact where taller individuals naturally exhibit higher raw FFMI.</p>
    `,
    scientificGuidelines: [
      'Kouri EM, Pope HG, et al. Fat-free mass index in users and nonusers of anabolic-androgenic steroids. Clin J Sport Med. 1995;5(4):223-228.',
      'Trexler ET, et al. Physiological changes after extreme weight loss in a bodybuilder: a case report. Eur J Sport Sci. 2017.',
      'Hall KD. What is the required energy expenditure to gain 1 kg of lean mass? Int J Obes. 2010.'
    ],
    scientificReferences: [
      'Kouri EM, et al. Clin J Sport Med. 1995.',
      'Hartgens F, Kuipers H. Effects of androgenic-anabolic steroids in athletes. Sports Med. 2004;34(8):513-554.'
    ],
    safetyDisclosures: [
      'Accurate body fat measurement is critical for valid FFMI output; inaccurate body fat input of even ±3% shifts your calculated FFMI by nearly 1.0 full point.',
      'Elite natural athletes with exceptional bone structure (thick wrists, ankles, and clavicles) can occasionally achieve normalized FFMIs between 25.0 and 26.0.'
    ],
    faqs: [
      {
        question: 'What is the significance of the 25.0 FFMI threshold?',
        answer: 'In 1995, Dr. Harrison Pope and Ellen Kouri analyzed 157 male athletes, including 74 non-steroid users and 83 steroid users, along with Mr. America winners from the pre-steroid era (1939-1959). The natural athletes averaged an FFMI of 21.8, with an upper ceiling around 25.0. Above 25.0, steroid use becomes increasingly probable.'
      },
      {
        question: 'Why do taller lifters need the normalized FFMI formula?',
        answer: 'Because human body mass scales with volume (the cube of height) rather than area (the square of height), taller individuals naturally carry higher raw FFMI values even at the same relative muscularity. The Kouri normalization standardizes all individuals to a baseline height of 1.80m (5\'11").'
      },
      {
        question: 'What is an average FFMI for an untrained man vs a seasoned lifter?',
        answer: 'An untrained male typically possesses an FFMI around 18-19. A dedicated natural lifter with 3-5 years of structured progressive overload and nutrition typically reaches 21-23. An elite natural competitor at contest-lean conditioning reaches 24-25.'
      },
      {
        question: 'Can women use the same FFMI benchmarks?',
        answer: 'No. Due to endocrine differences (androgen receptor density and circulating testosterone), natural female athletes have a natural FFMI baseline around 15-16, with elite natural female bodybuilders reaching an upper ceiling around 21.0 to 22.0.'
      }
    ]
  },
  {
    id: 'ideal_weight',
    slug: 'ideal-body-weight-bone-frame-size-calculator',
    routePath: '/calculators/ideal-body-weight-frame-size',
    title: 'Ideal Body Weight & Bone Frame Size Calculator',
    shortDescription: 'Compare Devine, Robinson, Miller, and Hamwi clinical equations with wrist circumference bone frame size calibrations.',
    category: 'body_composition',
    badge: 'Anthropometry',
    personaImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Skeletal Biometrics & Clinical Evaluator',
    formulaSummary: 'Devine, Robinson, Miller, & Hamwi clinical formulas + r-value frame ratio',
    detailedFormulaHtml: `
      <p class="mb-3"><strong>Standard Clinical Formulas (Over 5 feet / 60 inches):</strong></p>
      <ul class="list-disc pl-5 space-y-1 mb-4 text-slate-700">
        <li><strong>Devine (1974):</strong> Men: 50 kg + 2.3 kg/in | Women: 45.5 kg + 2.3 kg/in</li>
        <li><strong>Robinson (1983):</strong> Men: 52 kg + 1.9 kg/in | Women: 49 kg + 1.7 kg/in</li>
        <li><strong>Miller (1983):</strong> Men: 56.2 kg + 1.41 kg/in | Women: 53.1 kg + 1.36 kg/in</li>
        <li><strong>Hamwi (1964):</strong> Men: 48 kg + 2.7 kg/in | Women: 45.5 kg + 2.2 kg/in</li>
      </ul>
      <p class="text-sm text-slate-600">Bone frame size is estimated via the ratio of height to wrist circumference (r = Height / Wrist).</p>
    `,
    scientificGuidelines: [
      'Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974;8:650-655.',
      'Robinson JD, et al. Determination of ideal body weight for drug dosage. Am J Hosp Pharm. 1983;40(6):1016-1019.',
      'Metropolitan Life Insurance Company Height and Weight Tables'
    ],
    scientificReferences: [
      'Pai MP, Paloucek FP. The origin of the \'ideal\' body weight equations. Ann Pharmacother. 2000;34(9):1066-1069.',
      'Hamwi GJ. Therapy: changing concepts in diabetes mellitus. In: Danowski TS, ed. Diabetes Mellitus: Diagnosis and Treatment. 1964.'
    ],
    safetyDisclosures: [
      'Ideal Body Weight formulas were originally engineered for clinical pharmacokinetics and drug dosage calculation; they do not differentiate between adipose mass and muscular hypertrophy.',
      'Athletes with significant skeletal muscle mass will routinely exceed standard IBW ranges without any increased cardiovascular risk.'
    ],
    faqs: [
      {
        question: 'Why do different ideal weight formulas produce different numbers?',
        answer: 'Each equation was developed using different clinical cohorts: Devine was developed for gentamicin drug dosing; Robinson modified Devine based on revised actuarial tables; Miller adjusted for lower height weight distributions; Hamwi was designed as a quick clinical heuristic for diabetic diet planning.'
      },
      {
        question: 'How does bone frame size affect ideal weight?',
        answer: 'Skeletal frame size accounts for skeletal density and joint girth. A large-framed person has wider clavicles, pelvis, and denser bone mineral content, supporting roughly 7-10% more baseline mass than a small-framed individual of identical height.'
      },
      {
        question: 'How do I measure my wrist circumference accurately for frame size?',
        answer: 'Use a flexible tape measure directly over the styloid process (the bony protrusion on the outside of your wrist joint) with the hand relaxed and palm facing upward.'
      },
      {
        question: 'Is Ideal Body Weight more accurate than BMI?',
        answer: 'IBW combined with frame size provides a more nuanced target than standard Body Mass Index (BMI) because it incorporates skeletal width and offers an empirical range rather than arbitrary static cutoffs.'
      }
    ]
  },
  {
    id: 'muscular_potential',
    slug: 'maximum-muscular-potential-estimator',
    routePath: '/calculators/maximum-muscular-potential',
    title: 'Maximum Muscular Potential Estimator',
    shortDescription: 'Estimate your genetic ceiling for natural drug-free lean mass and maximum muscle girths using Casey Butt and Martin Berkhan models.',
    category: 'body_composition',
    badge: 'Genetic Limits',
    personaImageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Drug-Free Muscle Hypertrophy Researcher',
    formulaSummary: 'Casey Butt Skeletal Frame Model & Berkhan Leangains Equation',
    detailedFormulaHtml: `
      <p class="mb-3"><strong>1. Martin Berkhan Formula (at 5-6% contest body fat):</strong></p>
      <p class="text-slate-800 font-mono bg-slate-100 p-3 rounded-xl mb-3">Maximum Weight (kg) = Height (cm) - 100</p>
      <p class="mb-3"><strong>2. Casey Butt Skeletal Frame Equation:</strong></p>
      <p class="text-slate-700 mb-2">Max LBM is calculated as a function of height, wrist girth, and ankle girth, predicting maximum circumferences for chest, arms, forearms, neck, thighs, and calves.</p>
    `,
    scientificGuidelines: [
      'Butt C. Maximum Muscular Potential of Drug-Free Athletes. Weightology Research, 2009.',
      'Berkhan M. The Leangains Guide to Maximum Muscular Potential. 2010.',
      'Schoenfeld BJ. The mechanisms of muscle hypertrophy and their application to resistance training. J Strength Cond Res. 2010.'
    ],
    scientificReferences: [
      'Butt C. An Examination of the Maximum Muscular Potential of Drug-Free Athletes. 2009.',
      'Forbes GB. Lean body mass and fat in obese subjects. J Clin Invest. 1964.'
    ],
    safetyDisclosures: [
      'Achieving within 95% of your natural genetic ceiling requires 5 to 10 years of consistent progressive overload, rigorous nutritional tracking, and optimal sleep architecture.',
      'Anabolic-androgenic compounds bypass these physiological feedback mechanisms by activating satellite cell donation and supraphysiological myonuclear domain expansion.'
    ],
    faqs: [
      {
        question: 'Why are wrist and ankle circumferences used to predict maximum muscle size?',
        answer: 'Wrists and ankles contain virtually no muscle tissue, consisting purely of bone, tendons, and connective tissue. Their circumferences reflect skeletal robustness, articular surface area, and axial bone density, which dictate how much muscle cross-sectional area your framework can mechanically anchor.'
      },
      {
        question: 'What is the Martin Berkhan formula and who is it designed for?',
        answer: 'Pioneered by Martin Berkhan of Leangains after coaching hundreds of natural bodybuilding competitors, it states: Max Bodyweight in kg (at 5-6% body fat) = Height in cm - 100. For example, a 180cm lifter can reach ~80 kg shredded.'
      },
      {
        question: 'Can someone surpass Casey Butt’s natural maximum without PEDs?',
        answer: 'Casey Butt’s formulas were derived from elite drug-free bodybuilders and strength champions. Statistical outliers (top 0.1% genetic variance) might exceed predictions by 2-3%, but claiming 10-15% above the model without pharmaceutical enhancement is biologically impossible.'
      },
      {
        question: 'How long does it take a natural lifter to approach their genetic ceiling?',
        answer: 'According to the Lyle McDonald and Alan Aragon rate-of-gain models, a lifter can gain ~10-12 kg of muscle in year one, ~5-6 kg in year two, ~2-3 kg in year three, and only 1-1.5 kg per year thereafter.'
      }
    ]
  },
  {
    id: 'whtr',
    slug: 'waist-to-height-ratio-health-risk-calculator',
    routePath: '/calculators/waist-to-height-ratio-whtr',
    title: 'Waist-to-Height Ratio (WHtR) & Health Risk Calculator',
    shortDescription: 'Assess deep visceral intra-abdominal adiposity and cardiometabolic risk using the clinically validated Ashwell Shape Chart methodology.',
    category: 'body_composition',
    badge: 'Cardiometabolic Health',
    personaImageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Cardiometabolic Risk Screening Lead',
    formulaSummary: 'WHtR = Waist Circumference / Height | Target: Keep your waist to less than half your height',
    detailedFormulaHtml: `
      <p class="mb-3"><strong>Waist-to-Height Ratio:</strong> WHtR = Waist Circumference / Height (same units)</p>
      <ul class="list-disc pl-5 space-y-1 mb-4 text-slate-700">
        <li><strong>< 0.40:</strong> Take Care / Underweight (Increased non-cardiac mortality risk)</li>
        <li><strong>0.40 - 0.49:</strong> Healthy Weight Boundary / Low Cardiometabolic Risk</li>
        <li><strong>0.50 - 0.59:</strong> Increased Risk / Elevated Central Adiposity</li>
        <li><strong>≥ 0.60:</strong> Substantially High Risk / Significant Visceral Adipose Burden</li>
      </ul>
    `,
    scientificGuidelines: [
      'National Institute for Health and Care Excellence (NICE) Clinical Guideline CG189 (2022 Update: WHtR recommended over BMI)',
      'Ashwell M, Gibson S. Waist-to-height ratio as an indicator of early health risk. BMJ Open. 2016.',
      'World Health Organization (WHO) Consultation on Obesity and Metabolic Syndrome'
    ],
    scientificReferences: [
      'Ashwell M, Gunn P, Gibson S. Waist-to-height ratio is a better screening tool than waist circumference and BMI for adult cardiometabolic risk factors: systematic review and meta-analysis. Obes Rev. 2012;13(3):275-286.',
      'Browning LM, et al. A systematic review of waist-to-height ratio as a screening tool for the prediction of cardiovascular disease and diabetes. Nutr Res Rev. 2010;23(2):247-269.'
    ],
    safetyDisclosures: [
      'Measure waist circumference midway between the lowest palpable rib and the top of the iliac crest (pelvic bone) at the end of normal expiration.',
      'WHtR is a screening metric. A high WHtR should prompt follow-up clinical lab tests including fasting blood glucose, HbA1c, and a comprehensive lipid panel (ApoB, Triglyceride-to-HDL ratio).'
    ],
    faqs: [
      {
        question: 'Why is Waist-to-Height Ratio clinically superior to BMI?',
        answer: 'Body Mass Index (BMI) fails to distinguish between lean skeletal muscle and adipose tissue, routinely misclassifying muscular athletes as "overweight" or "obese." WHtR specifically tracks abdominal visceral adiposity—the metabolically active fat surrounding internal organs that drives insulin resistance, systemic inflammation, and atherosclerosis.'
      },
      {
        question: 'What is the "Ashwell Rule" for waist circumference?',
        answer: 'Dr. Margaret Ashwell coined the golden public health rule: "Keep your waist circumference to less than half your height." A ratio below 0.50 is strongly correlated with longevity and normal cardiometabolic markers.'
      },
      {
        question: 'Why is visceral fat more dangerous than subcutaneous fat?',
        answer: 'Unlike harmless subcutaneous fat stored beneath the skin on thighs and arms, deep visceral fat drains fatty acids directly into the portal vein into the liver. It secretes inflammatory cytokines (TNF-alpha, IL-6), increases hepatic steatosis, and triggers arterial hypertension.'
      },
      {
        question: 'How quickly can lifestyle changes reduce waist-to-height ratio?',
        answer: 'Visceral fat is metabolically active and more sensitive to catecholamines than subcutaneous fat. A moderate caloric deficit coupled with resistance training and reduction in refined sugars/alcohol often reduces waist circumference within 4 to 8 weeks.'
      }
    ]
  },
  {
    id: 'calories_burned',
    slug: 'calories-burned-per-exercise-calculator',
    routePath: '/calculators/calories-burned-per-exercise',
    title: 'Calories Burned per Exercise Calculator',
    shortDescription: 'Calculate exercise energy expenditure for 35+ sports and strength activities using the Compendium of Physical Activities MET database.',
    category: 'performance',
    badge: 'Energy Expenditure',
    personaImageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Metabolic Kinetics & Biomechanics Specialist',
    formulaSummary: 'Calories = (MET × 3.5 × Body Mass in kg / 200) × Duration in Minutes',
    detailedFormulaHtml: `
      <p class="mb-3"><strong>Standard ACSM Metabolic Equation:</strong></p>
      <p class="text-slate-800 font-mono bg-slate-100 p-3 rounded-xl mb-3">Calories Burned = [MET × 3.5 × Weight (kg) / 200] × Time (minutes)</p>
      <p class="text-sm text-slate-600">Where 1 MET = 3.5 ml O₂/kg/min (resting oxygen uptake in a seated resting human). MET values are derived from Ainsworth et al. Compendium of Physical Activities.</p>
    `,
    scientificGuidelines: [
      'Ainsworth BE, et al. 2011 Compendium of Physical Activities: a second update of codes and MET values. Med Sci Sports Exerc. 2011;43(8):1575-1581.',
      'American College of Sports Medicine (ACSM) Guidelines for Exercise Testing and Prescription (11th Edition).',
      'Hall KD, et al. Energy balance and its components: implications for body weight regulation. Am J Clin Nutr. 2012.'
    ],
    scientificReferences: [
      'Ainsworth BE, et al. Med Sci Sports Exerc. 2011.',
      'Bahr R, Sejersted OM. Effect of intensity on postexercise O2 consumption. Metabolism. 1991;40(8):836-841.'
    ],
    safetyDisclosures: [
      'Wearable fitness trackers routinely overestimate exercise calorie burn by 25% to 40% (Stanford University evaluation of commercial wrist trackers).',
      'Do not "eat back" 100% of exercise calories burned if your objective is fat loss, as your body compensates by reducing subsequent spontaneous physical activity (constrained energy expenditure model).'
    ],
    faqs: [
      {
        question: 'What is a MET (Metabolic Equivalent of Task)?',
        answer: 'One MET represents the rate of energy expenditure while sitting quietly at rest, which equates to roughly 1 kcal per kilogram of bodyweight per hour, or 3.5 ml of oxygen consumed per kg per minute. An activity with a MET of 8.0 burns eight times more energy than resting.'
      },
      {
        question: 'Does weightlifting or steady-state cardio burn more calories during the session?',
        answer: 'Steady-state cardio (e.g. running or rowing at 8-10 METs) burns more total calories per minute during the session than traditional weightlifting (4.5-6.0 METs). However, resistance training preserves and builds metabolically active muscle tissue and elevates excess post-exercise oxygen consumption (EPOC).'
      },
      {
        question: 'What is the "constrained energy expenditure model" by Herman Pontzer?',
        answer: 'Evolutionary anthropologist Dr. Herman Pontzer demonstrated that total daily energy expenditure does not scale linearly with high exercise volumes. Beyond a certain threshold, the human body adapts by suppressing energy spent on immune function, reproduction, and non-exercise movement to cap total daily burn.'
      },
      {
        question: 'How does bodyweight influence exercise calorie burn?',
        answer: 'Caloric burn is directly proportional to bodyweight in weight-bearing exercises like running or walking, because moving an 85kg mass against gravity requires significantly more mechanical work than moving a 60kg mass over the same distance.'
      }
    ]
  },
  {
    id: 'sleep_cycles',
    slug: 'sleep-cycle-circadian-wake-up-estimator',
    routePath: '/calculators/sleep-cycle-circadian-wake-up',
    title: 'Sleep Cycle & Circadian Wake-Up Estimator',
    shortDescription: 'Time your sleep and wake alarms in exact 90-minute ultradian cycles to bypass sleep inertia and maximize deep restorative slow-wave sleep.',
    category: 'biohacking',
    badge: 'Neuro-Restoration',
    personaImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Sleep Architecture & Neuro-Restoration Specialist',
    formulaSummary: '90-Minute Ultradian Sleep Cycle + 14-Minute Average Sleep Latency',
    detailedFormulaHtml: `
      <p class="mb-3">Each complete ultradian sleep cycle lasts approximately 90 minutes, transitioning through:</p>
      <ul class="list-disc pl-5 space-y-1 mb-4 text-slate-700">
        <li><strong>N1 (Light Sleep):</strong> 5-10 mins, alpha-to-theta transition</li>
        <li><strong>N2 (True Sleep):</strong> 45-55 mins, sleep spindles and K-complexes</li>
        <li><strong>N3 (Slow-Wave / Deep Sleep):</strong> 20-25 mins, delta waves, growth hormone release, physical tissue repair</li>
        <li><strong>REM (Rapid Eye Movement):</strong> 10-25 mins, dreaming, synaptic memory consolidation</li>
      </ul>
      <p class="text-sm text-slate-600">Calculates wake-up and bedtimes accounting for 14 minutes of physiological sleep latency.</p>
    `,
    scientificGuidelines: [
      'American Academy of Sleep Medicine (AASM) & Sleep Research Society Consensus Statement on Recommended Sleep',
      'Walker M. Why We Sleep: Unlocking the Power of Sleep and Dreams. Scribner, 2017.',
      'Carskadon MA, Dement WC. Normal human sleep: an overview. Principles and Practice of Sleep Medicine. 2011.'
    ],
    scientificReferences: [
      'Dijk DJ, Czeisler CA. Contribution of the circadian pacemaker and the homeostatic process to the human sleep-wake cycle. J Neurosci. 1995;15(5):3526-3538.',
      'Van Dongen HP, et al. The cumulative cost of additional wakefulness: dose-response effects on neurobehavioral functions and sleep physiology. Sleep. 2003;26(2):117-126.'
    ],
    safetyDisclosures: [
      'Chronic sleep deprivation (<6 hours per night) downregulates circulating testosterone by 10-15%, elevates hunger-stimulating ghrelin, and increases insulin resistance.',
      'Alcohol consumed within 3 hours of sleep severely fragments sleep architecture, suppressing up to 80% of critical REM sleep cycles.'
    ],
    faqs: [
      {
        question: 'Why do I wake up groggy even after sleeping 8 or 9 hours?',
        answer: 'Grogginess upon waking is called "sleep inertia." It occurs when an alarm jolts you awake from the middle of deep Slow-Wave Sleep (N3 Stage) when brainwaves are dominated by low-frequency delta waves. Waking at the conclusion of a 90-minute cycle during light N1 or REM sleep feels effortless and refreshing.'
      },
      {
        question: 'How many sleep cycles per night are optimal for athletes?',
        answer: 'Five cycles (7.5 hours) represents the optimal baseline for most adults. Hard-training athletes with high muscle turnover and central nervous system fatigue benefit substantially from 6 cycles (9.0 hours) to maximize slow-wave sleep and nocturnal growth hormone pulses.'
      },
      {
        question: 'What is sleep latency and what is considered normal?',
        answer: 'Sleep latency is the time it takes to transition from full wakefulness to light sleep. A normal, healthy sleep latency is between 10 and 20 minutes. Falling asleep the instant your head hits the pillow (<5 minutes) is a primary clinical indicator of severe accumulated sleep debt.'
      },
      {
        question: 'How does morning sunlight exposure optimize circadian rhythms?',
        answer: 'Viewing 10-15 minutes of natural sunlight within 60 minutes of waking triggers intrinsically photosensitive retinal ganglion cells (ipRGCs). This resets your central circadian pacemaker (the suprachiasmatic nucleus), suppresses daytime melatonin, and starts a biological timer for evening melatonin release ~14-16 hours later.'
      }
    ]
  },
  {
    id: 'bmr_comparative',
    slug: 'basal-metabolic-rate-bmr-comparative-calculator',
    routePath: '/calculators/basal-metabolic-rate-bmr-comparative',
    title: 'Basal Metabolic Rate (BMR) Comparative Calculator',
    shortDescription: 'Side-by-side comparative analysis of Mifflin-St Jeor, Revised Harris-Benedict, Katch-McArdle, and Schofield WHO equations.',
    category: 'metabolism',
    badge: 'Clinical Comparison',
    personaImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Clinical Indirect Calorimetry Researcher',
    formulaSummary: 'Comparative matrix across 4 clinical BMR prediction methodologies',
    detailedFormulaHtml: `
      <ul class="list-disc pl-5 space-y-1 mb-4 text-slate-700">
        <li><strong>Mifflin-St Jeor (1990):</strong> 10W + 6.25H - 5A (+5 for men, -161 for women)</li>
        <li><strong>Revised Harris-Benedict (1984):</strong> Men: 88.362 + 13.397W + 4.799H - 5.677A | Women: 447.593 + 9.247W + 3.098H - 4.330A</li>
        <li><strong>Katch-McArdle (1983):</strong> 370 + 21.6 × LBM (kg)</li>
        <li><strong>Schofield / Oxford WHO (1985):</strong> Age-stratified regression constants based on total body weight</li>
      </ul>
    `,
    scientificGuidelines: [
      'Frankenfield D, et al. Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults: a systematic review. J Am Diet Assoc. 2005;105(5):775-789.',
      'Roza AM, Shizgal HM. The Harris Benedict equation reevaluated: resting energy requirements and the body cell mass. Am J Clin Nutr. 1984;40(1):168-182.',
      'Schofield WN. Predicting basal metabolic rate, new standards and review of previous work. Hum Nutr Clin Nutr. 1985;39 Suppl 1:5-41.'
    ],
    scientificReferences: [
      'Frankenfield D, et al. J Am Diet Assoc. 2005.',
      'Mifflin MD, et al. Am J Clin Nutr. 1990.'
    ],
    safetyDisclosures: [
      'BMR accounts for approximately 60% to 75% of total daily caloric burn. It does not include calories burned walking, digesting food, or exercising.',
      'Severe caloric restriction (<1,000 kcal/day) causes down-regulation of thyroid hormone T3 and up-regulation of reverse T3 (rT3), depressing BMR below predicted formulas.'
    ],
    faqs: [
      {
        question: 'Why does the original Harris-Benedict equation tend to overestimate calories?',
        answer: 'The original 1919 Harris-Benedict study examined young, lean, physically active college students and laboratory staff in cold environments. Subsequent re-evaluations (Roza & Shizgal 1984) and modern studies show it overestimates modern sedentary adults’ BMR by approximately 5% to 15%.'
      },
      {
        question: 'When should I choose Katch-McArdle over Mifflin-St Jeor?',
        answer: 'Use Katch-McArdle whenever you have an accurate measurement of body fat percentage from DEXA or hydrostatic weighing. Because adipose tissue burns only ~4.5 kcal/kg/day while skeletal muscle burns ~13 kcal/kg/day and organs burn ~200-400 kcal/kg/day, basing calculations on Lean Body Mass eliminates weight-bias errors.'
      },
      {
        question: 'How much does age reduce BMR every decade?',
        answer: 'BMR declines by approximately 1% to 2% per decade after age 25-30. Most of this decline is not biological aging per se, but sarcopenia—the gradual loss of metabolically active skeletal muscle mass and reduction in spontaneous physical activity (NEAT).'
      },
      {
        question: 'Can resistance training permanently elevate my BMR?',
        answer: 'Yes. Gaining 5 kg (11 lbs) of lean skeletal muscle increases resting metabolic rate by approximately 65-100 kcal per day directly, and significantly more when factoring in post-exercise metabolic remodeling and glycogen replenishment.'
      }
    ]
  },
  {
    id: 'protein_timing',
    slug: 'protein-intake-timing-distribution-calculator',
    routePath: '/calculators/protein-intake-timing-distribution',
    title: 'Protein Intake Timing & Distribution Calculator',
    shortDescription: 'Optimize Muscle Protein Synthesis (MPS) by calculating per-meal leucine thresholds, meal distribution frequency, and nocturnal micellar casein.',
    category: 'metabolism',
    badge: 'Anabolic Optimization',
    personaImageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Muscle Protein Synthesis (MPS) Lead',
    formulaSummary: 'Per-Meal Dose = 0.40 - 0.55 g/kg | Leucine Threshold = 2.7 - 3.2g per bolus',
    detailedFormulaHtml: `
      <p class="mb-3"><strong>Anabolic Leucine Trigger Concept:</strong></p>
      <p class="text-slate-700 mb-3">To stimulate the mammalian target of rapamycin (mTORC1) and achieve peak fractional synthetic rate (FSR) of muscle tissue, each meal must provide an intracellular leucine concentration of at least 2.7 to 3.2 grams.</p>
      <p class="text-sm text-slate-600">Calculates meal spacing (every 3.5 to 5 hours) to overcome the physiological "muscle full" refractory effect.</p>
    `,
    scientificGuidelines: [
      'Schoenfeld BJ, Aragon AA. How much protein can the body use in a single meal for muscle-building? Implications for daily distribution. J Int Soc Sports Nutr. 2018;15:10.',
      'Phillips SM. A brief review of critical processes in exercise-induced muscular hypertrophy. Sports Med. 2014;44 Suppl 1:S71-S77.',
      'Snijders T, et al. The impact of pre-sleep protein ingestion on muscle mass and strength gains during prolonged resistance-type exercise training in healthy young men. J Nutr. 2015.'
    ],
    scientificReferences: [
      'Atherton PJ, Smith K. Muscle protein synthesis in response to nutrition and exercise. J Physiol. 2012;590(5):1049-1057.',
      'Moore DR, et al. Ingested protein dose response of muscle and albumin protein synthesis after resistance exercise in young men. Am J Clin Nutr. 2009;89(1):161-168.'
    ],
    safetyDisclosures: [
      'Adequate hydration is mandatory on high-protein diets to facilitate the renal clearance of urea nitrogen produced during amino acid deamination.',
      'Plant-based athletes should combine complementary protein sources (e.g. legumes with grains) or supplement with free-form leucine to achieve the required 3g leucine threshold per meal.'
    ],
    faqs: [
      {
        question: 'What is the "Muscle Full" effect in muscle protein synthesis?',
        answer: 'Research by Bohé et al. and Atherton et al. demonstrated that following protein ingestion, muscle protein synthesis spikes, peaks around 90-120 minutes, and returns to baseline within 3 to 4 hours—even if circulating amino acid levels remain high. This refractory period is why spreading protein into 4-5 discrete meals is superior to eating all protein in one sitting.'
      },
      {
        question: 'Is the "anabolic window" post-workout real or a myth?',
        answer: 'The traditional belief that you must consume protein within 30 minutes of training is largely overstated. The true anabolic window spans roughly 4 to 6 hours peri-workout (pre- and post-exercise combined). If you consumed a complete meal 90 minutes before lifting, that meal is still releasing amino acids post-workout.'
      },
      {
        question: 'Why is pre-sleep protein ingestion recommended?',
        answer: 'During 7 to 9 hours of nocturnal sleep, your body enters a net negative protein balance (catabolism) as fasting continues. Consuming 30-40g of slow-digesting protein (such as micellar casein or cottage cheese) sustains elevated plasma amino acid levels throughout the night, stimulating nocturnal muscle protein synthesis.'
      },
      {
        question: 'Can your body only absorb 30 grams of protein in one meal?',
        answer: 'This is a complete physiological myth. The human digestive tract will absorb virtually 100% of the amino acids consumed regardless of quantity. However, the upper limit for *stimulating muscle protein synthesis* from a single feeding appears to cap around 0.40 to 0.55 g/kg per meal.'
      }
    ]
  },
  {
    id: 'body_recomposition',
    slug: 'body-recomposition-caloric-surplus-deficit-planner',
    routePath: '/calculators/body-recomposition-caloric-planner',
    title: 'Body Recomposition & Caloric Surplus/Deficit Planner',
    shortDescription: 'Plan concurrent adipose reduction and skeletal muscle hypertrophy with periodized caloric budgeting and high-protein partitioning.',
    category: 'metabolism',
    badge: 'Body Recomposition',
    personaImageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Concurrent Hypertrophy & Fat Loss Coach',
    formulaSummary: 'Iso-caloric to Mild Deficit (-10% to 0%) + Protein at 2.2 - 2.6 g/kg',
    detailedFormulaHtml: `
      <p class="mb-3">Energy partitioning relies on the Hall Energy Flux and Forbes Adipose Model:</p>
      <ul class="list-disc pl-5 space-y-1 mb-4 text-slate-700">
        <li><strong>Caloric Energy Intake:</strong> Set between -15% deficit (fat focus) to +8% surplus (hypertrophy focus).</li>
        <li><strong>Protein Sparing Factor:</strong> 2.2 to 2.6 g/kg of total body mass.</li>
        <li><strong>Progressive Overload Stimulus:</strong> High mechanical tension resistance training 3 to 5 days per week.</li>
      </ul>
    `,
    scientificGuidelines: [
      'Barakat C, et al. Body Recomposition: Can Trained Individuals Build Muscle and Lose Fat at the Same Time? Strength Cond J. 2020;42(5):7-21.',
      'Longland TM, et al. Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat-mass loss: a randomized trial. Am J Clin Nutr. 2016;103(3):738-746.',
      'Schoenfeld BJ. Science and Development of Muscle Hypertrophy (2nd Edition). Human Kinetics, 2020.'
    ],
    scientificReferences: [
      'Barakat C, et al. Strength Cond J. 2020.',
      'Garthe I, et al. Effect of two different weight-loss rates on body composition and strength and power-related performance in elite athletes. Int J Sport Nutr Exerc Metab. 2011;21(2):97-104.'
    ],
    safetyDisclosures: [
      'True body recomposition requires patient longitudinal tracking; scale weight may remain flat for 8-12 weeks while waist circumference drops and muscle density increases.',
      'Advanced lifters with >5 years of structured training will experience much slower recomposition rates than beginners or returning athletes due to proximity to their genetic ceiling.'
    ],
    faqs: [
      {
        question: 'Who is the ideal candidate for simultaneous body recomposition?',
        answer: 'Recomposition occurs most dramatically in four categories: (1) Resistance training beginners ("newbie gains"), (2) Individuals with significant excess body fat (>25% men, >32% women), (3) Detrained lifters returning after a hiatus due to muscle memory, and (4) Athletes using androgenic compounds.'
      },
      {
        question: 'Can advanced natural lifters still achieve body recomposition?',
        answer: 'Yes, but at a substantially slower rate. Advanced lifters require micro-caloric cycling—such as consuming a slight 200 kcal surplus on heavy training days and a 300 kcal deficit on rest days—coupled with meticulous progressive overload.'
      },
      {
        question: 'Why does high protein intake make recomposition possible?',
        answer: 'High protein (2.2-2.6 g/kg) provides the necessary substrate to sustain muscle protein synthesis even in a mild caloric deficit. Furthermore, protein has the highest Thermic Effect of Food (20-30% of energy lost as heat during digestion), effectively widening the metabolic deficit.'
      },
      {
        question: 'How should I measure progress if the bathroom scale is not moving?',
        answer: 'Track three independent metrics: (1) Bi-weekly abdominal tape measurements (waist should decrease), (2) Gym performance logs (strength on compound lifts should increase or maintain), and (3) Standardized monthly progress photos in identical lighting.'
      }
    ]
  },
  {
    id: 'hrr_zones',
    slug: 'heart-rate-reserve-cardio-intensity-zone-calculator',
    routePath: '/calculators/heart-rate-reserve-hrr-zones',
    title: 'Heart Rate Reserve (HRR) & Cardio Intensity Zone Calculator',
    shortDescription: 'Calculate clinical Karvonen Heart Rate Reserve zones factoring individual resting bradycardia for precision endurance prescription.',
    category: 'performance',
    badge: 'Cardio Physiology',
    personaImageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80',
    personaRole: 'Aerobic Reserve & Karvonen Zone Specialist',
    formulaSummary: 'Target HR = Resting HR + [% Intensity × (Max HR - Resting HR)]',
    detailedFormulaHtml: `
      <p class="mb-3"><strong>The Karvonen Heart Rate Reserve (HRR) Method:</strong></p>
      <ul class="list-disc pl-5 space-y-1 mb-4 text-slate-700">
        <li><strong>Step 1:</strong> Heart Rate Reserve (HRR) = Maximum HR - Resting HR</li>
        <li><strong>Step 2:</strong> Target HR = Resting HR + (Target % × HRR)</li>
      </ul>
      <p class="text-sm text-slate-600">Unlike simple % Max HR formulas, HRR reflects actual metabolic reserve by taking resting heart rate (cardiovascular fitness) into account.</p>
    `,
    scientificGuidelines: [
      'ACSM\'s Guidelines for Exercise Testing and Prescription (11th Edition)',
      'Swain DP, Leutholtz BC. Heart rate reserve is equivalent to %VO2 reserve, not to %VO2max. Med Sci Sports Exerc. 1997;29(3):410-414.',
      'American College of Cardiology (ACC) / American Heart Association (AHA) Task Force Guidelines'
    ],
    scientificReferences: [
      'Karvonen MJ, et al. Ann Med Exp Biol Fenn. 1957.',
      'Lounana J, et al. Evaluation of the Karvonen method to calculate target heart rate for intensity prescription in endurance exercise. Int J Sports Med. 2007;28(10):848-854.'
    ],
    safetyDisclosures: [
      'Always measure your true resting heart rate over 3 consecutive mornings immediately upon waking, before consuming caffeine or getting out of bed.',
      'Exercise intensity should be governed by Rate of Perceived Exertion (RPE) alongside heart rate monitor data to safeguard against cardiac drift.'
    ],
    faqs: [
      {
        question: 'Why is the Karvonen HRR method more accurate than percent of Max HR?',
        answer: 'Simple % Max HR (e.g. 70% of 190 = 133 BPM) completely ignores whether an athlete’s resting pulse is 45 BPM (highly conditioned endurance athlete) or 80 BPM (sedentary individual). HRR measures the usable operational bandwidth between rest and exhaustion.'
      },
      {
        question: 'What is cardiac drift and how does it affect heart rate training?',
        answer: 'During prolonged steady-state exercise, particularly in warm environments, heart rate gradually drifts upward (5-15 BPM) even if running pace remains constant. This is driven by dehydration, reduced plasma volume, and the body shunting blood to the skin for evaporative cooling.'
      },
      {
        question: 'How does resting heart rate change as cardiovascular fitness improves?',
        answer: 'Aerobic endurance training induces athletic cardiac remodeling: left ventricular cavity volume increases (eccentric hypertrophy), enabling each heartbeat to pump significantly more blood (higher stroke volume). Consequently, resting heart rate drops from typical 70-80 BPM down to 40-55 BPM.'
      },
      {
        question: 'What is the relationship between % HRR and % VO2 Max?',
        answer: 'Pioneering research by Swain & Leutholtz proved that % HRR correlates almost 1:1 with % VO2 Reserve (Oxygen Uptake Reserve), making the Karvonen calculation the closest laboratory-grade surrogate for VO2 max testing available outside of a metabolic cart.'
      }
    ]
  }
];

export const CALCULATORS_DATA = CALCULATORS_CATALOG;
