// Pure client-side physiological calculation engines for ZenFit Tools

export interface TDEEResult {
  bmr: number;
  tdee: number;
  bmrFormula: string;
  maintenance: number;
  cutting: number;
  aggressiveCutting: number;
  leanBulking: number;
  aggressiveBulking: number;
  breakdown: {
    bmr: number;
    tef: number;
    neat: number;
    eat: number;
  };
}

export function calculateTDEE(
  gender: 'male' | 'female',
  age: number,
  heightCm: number,
  weightKg: number,
  activityMultiplier: number,
  bodyFatPct?: number
): TDEEResult {
  let bmr = 0;
  let formulaUsed = 'Mifflin-St Jeor';

  if (bodyFatPct && bodyFatPct > 3 && bodyFatPct < 60) {
    const lbmKg = weightKg * (1 - bodyFatPct / 100);
    bmr = 370 + 21.6 * lbmKg;
    formulaUsed = 'Katch-McArdle (LBM-based)';
  } else {
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  }

  const tdee = Math.round(bmr * activityMultiplier);
  const roundedBmr = Math.round(bmr);

  // Daily energy breakdown
  const tef = Math.round(tdee * 0.1); // Thermic Effect of Food ~10%
  const totalPhysicalActivity = tdee - roundedBmr - tef;
  const neat = Math.round(totalPhysicalActivity * 0.65);
  const eat = Math.max(0, totalPhysicalActivity - neat);

  return {
    bmr: roundedBmr,
    tdee,
    bmrFormula: formulaUsed,
    maintenance: tdee,
    cutting: Math.max(1200, tdee - 500),
    aggressiveCutting: Math.max(1200, tdee - 750),
    leanBulking: tdee + 300,
    aggressiveBulking: tdee + 500,
    breakdown: {
      bmr: roundedBmr,
      tef,
      neat,
      eat,
    },
  };
}

export interface MacroResult {
  calories: number;
  proteinGrams: number;
  proteinCalories: number;
  proteinPct: number;
  fatGrams: number;
  fatCalories: number;
  fatPct: number;
  carbGrams: number;
  carbCalories: number;
  carbPct: number;
  perMeal: {
    protein: number;
    fat: number;
    carbs: number;
    calories: number;
  };
}

export function calculateMacros(
  calories: number,
  goal: 'fat_loss' | 'maintenance' | 'muscle_gain' | 'keto' | 'endurance',
  weightKg: number,
  mealsCount: number = 4
): MacroResult {
  let pRatio = 0.3;
  let fRatio = 0.3;
  let cRatio = 0.4;

  switch (goal) {
    case 'fat_loss':
      // Higher protein to preserve lean muscle in deficit
      pRatio = 0.35;
      fRatio = 0.3;
      cRatio = 0.35;
      break;
    case 'muscle_gain':
      // Optimized carbohydrates for glycogen replenishment
      pRatio = 0.28;
      fRatio = 0.25;
      cRatio = 0.47;
      break;
    case 'keto':
      pRatio = 0.25;
      fRatio = 0.7;
      cRatio = 0.05;
      break;
    case 'endurance':
      pRatio = 0.2;
      fRatio = 0.25;
      cRatio = 0.55;
      break;
    case 'maintenance':
    default:
      pRatio = 0.3;
      fRatio = 0.3;
      cRatio = 0.4;
      break;
  }

  const pCal = calories * pRatio;
  const fCal = calories * fRatio;
  const cCal = calories * cRatio;

  const proteinGrams = Math.round(pCal / 4);
  const fatGrams = Math.round(fCal / 9);
  const carbGrams = Math.round(cCal / 4);

  return {
    calories,
    proteinGrams,
    proteinCalories: Math.round(pCal),
    proteinPct: Math.round(pRatio * 100),
    fatGrams,
    fatCalories: Math.round(fCal),
    fatPct: Math.round(fRatio * 100),
    carbGrams,
    carbCalories: Math.round(cCal),
    carbPct: Math.round(cRatio * 100),
    perMeal: {
      protein: Math.round((proteinGrams / mealsCount) * 10) / 10,
      fat: Math.round((fatGrams / mealsCount) * 10) / 10,
      carbs: Math.round((carbGrams / mealsCount) * 10) / 10,
      calories: Math.round(calories / mealsCount),
    },
  };
}

export interface NavyBodyFatResult {
  bodyFatPct: number;
  fatMassKg: number;
  leanMassKg: number;
  category: string;
  idealRange: string;
}

export function calculateNavyBodyFat(
  gender: 'male' | 'female',
  heightCm: number,
  neckCm: number,
  waistCm: number,
  hipCm: number,
  weightKg: number
): NavyBodyFatResult {
  let bf = 0;
  if (gender === 'male') {
    const diff = waistCm - neckCm;
    if (diff > 0 && heightCm > 0) {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(diff) + 0.15456 * Math.log10(heightCm)) - 450;
    }
  } else {
    const sum = waistCm + hipCm - neckCm;
    if (sum > 0 && heightCm > 0) {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(sum) + 0.221 * Math.log10(heightCm)) - 450;
    }
  }

  bf = Math.max(3, Math.min(60, Math.round(bf * 10) / 10));
  const fatMass = Math.round((weightKg * (bf / 100)) * 10) / 10;
  const leanMass = Math.round((weightKg - fatMass) * 10) / 10;

  let category = 'Fitness';
  let idealRange = gender === 'male' ? '10% - 15%' : '18% - 24%';

  if (gender === 'male') {
    if (bf < 6) category = 'Essential Fat';
    else if (bf <= 13) category = 'Athletes';
    else if (bf <= 17) category = 'Fitness';
    else if (bf <= 24) category = 'Average';
    else category = 'Obese';
  } else {
    if (bf < 14) category = 'Essential Fat';
    else if (bf <= 20) category = 'Athletes';
    else if (bf <= 24) category = 'Fitness';
    else if (bf <= 31) category = 'Average';
    else category = 'Obese';
  }

  return {
    bodyFatPct: bf,
    fatMassKg: fatMass,
    leanMassKg: leanMass,
    category,
    idealRange,
  };
}

export interface OneRepMaxResult {
  average1RM: number;
  brzycki: number;
  epley: number;
  lombardi: number;
  mayhew: number;
  oconner: number;
  wathan: number;
  percentages: Array<{ pct: number; weight: number; targetReps: string; stimulus: string }>;
}

export function calculateOneRepMax(weight: number, reps: number): OneRepMaxResult {
  if (reps <= 1) {
    const table = [100, 95, 90, 85, 80, 75, 70, 65, 60, 50].map((pct) => ({
      pct,
      weight: Math.round((weight * pct) / 100),
      targetReps: pct === 100 ? '1' : pct === 95 ? '2' : pct === 90 ? '3-4' : pct === 85 ? '5-6' : pct === 80 ? '7-8' : pct === 75 ? '9-10' : pct === 70 ? '11-12' : '15+',
      stimulus: pct >= 85 ? 'Maximal Strength / Neural Drive' : pct >= 70 ? 'Hypertrophy / Muscle Growth' : 'Muscular Endurance',
    }));

    return {
      average1RM: weight,
      brzycki: weight,
      epley: weight,
      lombardi: weight,
      mayhew: weight,
      oconner: weight,
      wathan: weight,
      percentages: table,
    };
  }

  const r = Math.min(15, reps);
  const brzycki = weight / (1.0278 - 0.0278 * r);
  const epley = weight * (1 + 0.0333 * r);
  const lombardi = weight * Math.pow(r, 0.1);
  const mayhew = (100 * weight) / (52.2 + 41.9 * Math.exp(-0.055 * r));
  const oconner = weight * (1 + 0.025 * r);
  const wathan = (100 * weight) / (48.8 + 53.8 * Math.exp(-0.075 * r));

  const avg = Math.round((brzycki + epley + lombardi + mayhew + oconner + wathan) / 6);

  const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 50].map((pct) => ({
    pct,
    weight: Math.round((avg * pct) / 100),
    targetReps: pct === 100 ? '1' : pct === 95 ? '2' : pct === 90 ? '3-4' : pct === 85 ? '5-6' : pct === 80 ? '7-8' : pct === 75 ? '9-10' : pct === 70 ? '11-12' : '15+',
    stimulus: pct >= 85 ? 'Maximal Strength / Neural Drive' : pct >= 70 ? 'Hypertrophy / Muscle Growth' : 'Muscular Endurance',
  }));

  return {
    average1RM: avg,
    brzycki: Math.round(brzycki),
    epley: Math.round(epley),
    lombardi: Math.round(lombardi),
    mayhew: Math.round(mayhew),
    oconner: Math.round(oconner),
    wathan: Math.round(wathan),
    percentages,
  };
}

export interface TargetHeartRateResult {
  maxHRTanaka: number;
  maxHRFox: number;
  recommendedMax: number;
  restingHR: number;
  zones: Array<{
    zone: number;
    name: string;
    range: string;
    intensity: string;
    purpose: string;
    benefit: string;
    color: string;
  }>;
}

export function calculateTargetHeartRate(age: number, restingHR: number = 60): TargetHeartRateResult {
  const maxTanaka = Math.round(208 - 0.7 * age);
  const maxFox = Math.round(220 - age);
  const maxHR = maxTanaka;
  const hrr = maxHR - restingHR;

  // Karvonen formula: Target HR = ((Max HR - Rest HR) * %Intensity) + Rest HR
  const getBpm = (pct: number) => Math.round(restingHR + (pct / 100) * hrr);

  const zones = [
    {
      zone: 1,
      name: 'Active Recovery',
      range: `${getBpm(50)} - ${getBpm(60)} BPM`,
      intensity: '50% - 60% HRR',
      purpose: 'Warm-up, cooldown, active recovery, mitochondrial maintenance',
      benefit: 'Low stress, promotes blood flow and tissue repair without metabolic fatigue.',
      color: 'border-emerald-500 text-emerald-700 bg-emerald-50',
    },
    {
      zone: 2,
      name: 'Aerobic Base / Fat Burn',
      range: `${getBpm(60)} - ${getBpm(70)} BPM`,
      intensity: '60% - 70% HRR',
      purpose: 'Endurance foundation, lipid oxidation, cardiac output enlargement',
      benefit: 'Builds massive capillary network and high fatty-acid fuel efficiency.',
      color: 'border-cyan-500 text-cyan-700 bg-cyan-50',
    },
    {
      zone: 3,
      name: 'Tempo / Aerobic Power',
      range: `${getBpm(70)} - ${getBpm(80)} BPM`,
      intensity: '70% - 80% HRR',
      purpose: 'Glycogen utilization, stamina building, steady-state pacing',
      benefit: 'Improves pulmonary efficiency and race-pace fatigue resistance.',
      color: 'border-amber-500 text-amber-700 bg-amber-50',
    },
    {
      zone: 4,
      name: 'Lactate Threshold',
      range: `${getBpm(80)} - ${getBpm(90)} BPM`,
      intensity: '80% - 90% HRR',
      purpose: 'Anaerobic capacity, high-intensity intervals, lactate clearing',
      benefit: 'Raises the point at which lactic acid accumulates in muscle tissue.',
      color: 'border-orange-500 text-orange-700 bg-orange-50',
    },
    {
      zone: 5,
      name: 'VO2 Max / Neuromuscular',
      range: `${getBpm(90)} - ${maxHR} BPM`,
      intensity: '90% - 100% HRR',
      purpose: 'All-out sprints, maximum oxygen intake, peak motor unit recruitment',
      benefit: 'Spikes peak power output and expands maximum aerobic speed ceiling.',
      color: 'border-rose-500 text-rose-700 bg-rose-50',
    },
  ];

  return {
    maxHRTanaka: maxTanaka,
    maxHRFox: maxFox,
    recommendedMax: maxHR,
    restingHR,
    zones,
  };
}

export interface RunningPaceResult {
  pacePerKm: string;
  pacePerMile: string;
  speedKmh: number;
  speedMph: number;
  vo2MaxEst: number;
  racePredictions: Array<{ distance: string; distKm: number; predictedTime: string; predictedPace: string }>;
}

export function calculateRunningPace(
  distKm: number,
  hours: number,
  minutes: number,
  seconds: number
): RunningPaceResult {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const safeDist = Math.max(0.1, distKm);
  const secPerKm = totalSeconds / safeDist;
  const secPerMile = secPerKm * 1.60934;

  const formatPace = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.round(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const formatTime = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const rem = totalSec % 3600;
    const m = Math.floor(rem / 60);
    const s = Math.round(rem % 60);
    if (h > 0) {
      return `${h}h ${m}m ${s}s`;
    }
    return `${m}m ${s}s`;
  };

  const speedKmh = Math.round((safeDist / (totalSeconds / 3600)) * 10) / 10;
  const speedMph = Math.round((speedKmh / 1.60934) * 10) / 10;

  // Pete Riegel formula: T2 = T1 * (D2 / D1)^1.06
  const races = [
    { name: '1 Mile', km: 1.60934 },
    { name: '5K', km: 5 },
    { name: '10K', km: 10 },
    { name: 'Half Marathon', km: 21.0975 },
    { name: 'Marathon', km: 42.195 },
  ];

  const racePredictions = races.map((r) => {
    const predSec = totalSeconds * Math.pow(r.km / safeDist, 1.06);
    const pPerKm = predSec / r.km;
    return {
      distance: r.name,
      distKm: r.km,
      predictedTime: formatTime(predSec),
      predictedPace: `${formatPace(pPerKm)} /km`,
    };
  });

  // Daniels/Gilbert VO2 Max approximate estimation
  const velocityMetersMin = (safeDist * 1000) / (totalSeconds / 60);
  const vo2 = Math.round((-4.60 + 0.182258 * velocityMetersMin + 0.000104 * Math.pow(velocityMetersMin, 2)) * 10) / 10;

  return {
    pacePerKm: `${formatPace(secPerKm)} /km`,
    pacePerMile: `${formatPace(secPerMile)} /mi`,
    speedKmh,
    speedMph,
    vo2MaxEst: Math.max(20, Math.min(85, vo2)),
    racePredictions,
  };
}

export interface FastingResult {
  protocolName: string;
  fastingHours: number;
  eatingHours: number;
  eatingWindowStarts: string;
  eatingWindowEnds: string;
  fastingWindowStarts: string;
  fastingWindowEnds: string;
  stages: Array<{
    hoursRange: string;
    name: string;
    status: string;
    description: string;
    marker: string;
  }>;
}

export function calculateIntermittentFasting(
  protocol: '16_8' | '18_6' | '20_4' | '24_0' | '12_12',
  fastStartTime: string // "20:00"
): FastingResult {
  let fastHours = 16;
  let eatHours = 8;
  let name = '16:8 Leangains Standard';

  if (protocol === '18_6') {
    fastHours = 18;
    eatHours = 6;
    name = '18:6 Accelerated Fat Oxidation';
  } else if (protocol === '20_4') {
    fastHours = 20;
    eatHours = 4;
    name = '20:4 Warrior Fasting';
  } else if (protocol === '24_0') {
    fastHours = 24;
    eatHours = 0;
    name = '24-Hour OMAD / Monk Protocol';
  } else if (protocol === '12_12') {
    fastHours = 12;
    eatHours = 12;
    name = '12:12 Circadian Harmony';
  }

  const [sh, sm] = fastStartTime.split(':').map(Number);
  const startMinutes = (sh || 20) * 60 + (sm || 0);

  const formatClock = (mins: number) => {
    const norm = ((mins % 1440) + 1440) % 1440;
    const h = Math.floor(norm / 60);
    const m = norm % 60;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH}:${m < 10 ? '0' : ''}${m} ${period}`;
  };

  const fastEndMinutes = startMinutes + fastHours * 60;
  const eatEndMinutes = fastEndMinutes + eatHours * 60;

  const stages = [
    {
      hoursRange: '0 - 4 Hours',
      name: 'Anabolic / Absorptive Phase',
      status: 'Digestion & Storage',
      description: 'Blood glucose and circulating insulin remain elevated. Nutrients are partitioned into muscle glycogen and adipose stores.',
      marker: 'Elevated Insulin & Amino Acids',
    },
    {
      hoursRange: '4 - 8 Hours',
      name: 'Post-Absorptive / Glycemic Plateau',
      status: 'Stabilization',
      description: 'Blood sugar normalizes to baseline (70-90 mg/dL). Pancreatic beta cells cease insulin secretion; glucagon production begins.',
      marker: 'Glucagon Upregulation',
    },
    {
      hoursRange: '8 - 12 Hours',
      name: 'Hepatic Glycogen Depletion',
      status: 'Substrate Switch',
      description: 'Liver glycogen stores are utilized for basic organ metabolism. Hormone-sensitive lipase activates to liberate triglycerides.',
      marker: 'Free Fatty Acid Release',
    },
    {
      hoursRange: '12 - 18 Hours',
      name: 'Ketogenesis & Lipolysis Acceleration',
      status: 'Fat Burning Engine',
      description: 'Beta-hydroxybutyrate (BHB) ketones emerge in bloodstream. Mental clarity surges as brain utilizes ketone fuel.',
      marker: 'Serum Ketones 0.5 - 1.5 mmol/L',
    },
    {
      hoursRange: '18 - 24 Hours',
      name: 'Cellular Autophagy & Mitophagy Trigger',
      status: 'Deep Recycling',
      description: 'mTOR pathway is deeply inhibited; AMPK activates. Cellular lysosomal degradation recycles damaged proteins and senescent mitochondria.',
      marker: 'AMPK Upregulation & Autophagy',
    },
    {
      hoursRange: '24+ Hours',
      name: 'Maximum Autophagy & Peak HGH Surge',
      status: 'Biological Rejuvenation',
      description: 'Human Growth Hormone rises up to 500% to protect lean muscle tissue from proteolysis while systemic inflammation plunges.',
      marker: '5x HGH Secretion & Stem Cell Signaling',
    },
  ];

  return {
    protocolName: name,
    fastingHours: fastHours,
    eatingHours: eatHours,
    fastingWindowStarts: formatClock(startMinutes),
    fastingWindowEnds: formatClock(fastEndMinutes),
    eatingWindowStarts: formatClock(fastEndMinutes),
    eatingWindowEnds: formatClock(eatEndMinutes),
    stages,
  };
}

export interface HydrationResult {
  totalLiters: number;
  totalFlOz: number;
  baseLiters: number;
  exerciseAddonLiters: number;
  climateAddonLiters: number;
  hourlyRecommendationMl: number;
  sodiumGuidelineMg: string;
  potassiumGuidelineMg: string;
}

export function calculateHydration(
  weightKg: number,
  exerciseMinutes: number,
  sweatIntensity: 'light' | 'moderate' | 'heavy',
  climate: 'temperate' | 'hot_humid' | 'dry_arid' | 'cold_altitude'
): HydrationResult {
  // Base: 35ml per kg of body mass
  const baseMl = weightKg * 35;

  // Exercise hydration: 400ml to 750ml per 30 mins
  let exerciseRateMlPerMin = 13; // ~400ml per 30min
  if (sweatIntensity === 'moderate') exerciseRateMlPerMin = 18; // ~550ml per 30min
  if (sweatIntensity === 'heavy') exerciseRateMlPerMin = 25; // ~750ml per 30min
  const exerciseMl = exerciseMinutes * exerciseRateMlPerMin;

  // Climate coefficient
  let climateMult = 1.0;
  if (climate === 'hot_humid') climateMult = 1.25;
  if (climate === 'dry_arid') climateMult = 1.2;
  if (climate === 'cold_altitude') climateMult = 1.15;

  const totalMl = Math.round((baseMl + exerciseMl) * climateMult);
  const climateAddon = Math.round(totalMl - (baseMl + exerciseMl));

  const totalLiters = Math.round((totalMl / 1000) * 10) / 10;
  const totalFlOz = Math.round(totalLiters * 33.814);

  return {
    totalLiters,
    totalFlOz,
    baseLiters: Math.round((baseMl / 1000) * 10) / 10,
    exerciseAddonLiters: Math.round((exerciseMl / 1000) * 10) / 10,
    climateAddonLiters: Math.max(0, Math.round((climateAddon / 1000) * 10) / 10),
    hourlyRecommendationMl: Math.round(totalMl / 14), // active waking hours ~14h
    sodiumGuidelineMg: exerciseMinutes > 60 ? '1,500 - 2,500 mg (Electrolyte replenishment)' : '1,000 - 1,500 mg',
    potassiumGuidelineMg: '2,600 - 3,400 mg (Target whole foods intake)',
  };
}

export interface CreatineResult {
  loadingDailyGrams: number;
  loadingDosePerServing: number;
  loadingDosesPerDay: number;
  loadingDurationDays: number;
  steadyDailyGrams: number;
  steadySaturationDays: number;
  maintenanceDailyGrams: number;
  surplusWaterMl: number;
  uptakeStrategy: string;
}

export function calculateCreatine(
  weightKg: number,
  trainingIntensity: 'fitness' | 'bodybuilding_powerlifting'
): CreatineResult {
  // Scientific dosage: Loading = 0.3g / kg / day for 5-7 days
  const loadingGrams = Math.min(30, Math.max(15, Math.round(weightKg * 0.3)));
  const dosesPerDay = 4;
  const dosePerServing = Math.round((loadingGrams / dosesPerDay) * 10) / 10;

  // Maintenance: 0.03g - 0.05g / kg
  let maintenance = Math.round(weightKg * 0.04 * 10) / 10;
  if (trainingIntensity === 'bodybuilding_powerlifting' && weightKg > 85) {
    maintenance = Math.max(5, Math.min(10, maintenance));
  } else {
    maintenance = Math.max(3, Math.min(6, maintenance));
  }

  return {
    loadingDailyGrams: loadingGrams,
    loadingDosePerServing: dosePerServing,
    loadingDosesPerDay: dosesPerDay,
    loadingDurationDays: 6,
    steadyDailyGrams: maintenance,
    steadySaturationDays: 28,
    maintenanceDailyGrams: maintenance,
    surplusWaterMl: 600,
    uptakeStrategy: 'Co-ingest with 30-50g fast-acting carbohydrates or protein to trigger insulin-mediated muscle creatine transporter (CRT) saturation.',
  };
}

export interface FFMIResult {
  lbmKg: number;
  fatMassKg: number;
  ffmi: number;
  normalizedFfmi: number;
  classification: string;
  naturalCeilingPct: number;
  summary: string;
}

export function calculateFFMI(
  weightKg: number,
  heightCm: number,
  bodyFatPct: number
): FFMIResult {
  const heightM = heightCm / 100;
  const lbm = weightKg * (1 - bodyFatPct / 100);
  const fatMass = weightKg - lbm;

  const rawFFMI = lbm / (heightM * heightM);
  // Normalized FFMI formula: rawFFMI + 6.1 * (1.8 - heightM)
  const normalizedFFMI = rawFFMI + 6.1 * (1.8 - heightM);

  const roundedFFMI = Math.round(rawFFMI * 10) / 10;
  const roundedNorm = Math.round(normalizedFFMI * 10) / 10;

  let classification = 'Average';
  let naturalCeilingPct = 65;
  let summary = 'Typical lean muscle mass for an active individual.';

  if (roundedNorm < 18) {
    classification = 'Below Average';
    naturalCeilingPct = 50;
    summary = 'Low muscular development relative to stature. Substantial room for progressive overload.';
  } else if (roundedNorm <= 19.9) {
    classification = 'Average Development';
    naturalCeilingPct = 70;
    summary = 'Solid foundational base. Typical for recreational gym-goers.';
  } else if (roundedNorm <= 21.9) {
    classification = 'Above Average / Athletic';
    naturalCeilingPct = 85;
    summary = 'Noticeable muscular physique. Several years of dedicated resistance training.';
  } else if (roundedNorm <= 24.9) {
    classification = 'Elite Natural Threshold';
    naturalCeilingPct = 96;
    summary = 'Approaching the upper physiological boundary for a drug-free natural athlete.';
  } else {
    classification = 'Genetic Anomaly or Enhanced';
    naturalCeilingPct = 100;
    summary = 'Exceeds the classic Kouri et al. 25.0 drug-free natural baseline threshold.';
  }

  return {
    lbmKg: Math.round(lbm * 10) / 10,
    fatMassKg: Math.round(fatMass * 10) / 10,
    ffmi: roundedFFMI,
    normalizedFfmi: roundedNorm,
    classification,
    naturalCeilingPct,
    summary,
  };
}

export interface IdealBodyWeightResult {
  devineKg: number;
  robinsonKg: number;
  millerKg: number;
  hamwiKg: number;
  averageIdealKg: number;
  frameSize: 'Small Frame' | 'Medium Frame' | 'Large Frame';
  adjustedRangeKg: { min: number; max: number };
}

export function calculateIdealBodyWeight(
  gender: 'male' | 'female',
  heightCm: number,
  wristCircumferenceCm: number
): IdealBodyWeightResult {
  const heightInches = heightCm / 2.54;
  const inchesOver60 = Math.max(0, heightInches - 60);

  let devine = 0;
  let robinson = 0;
  let miller = 0;
  let hamwi = 0;

  if (gender === 'male') {
    devine = 50.0 + 2.3 * inchesOver60;
    robinson = 52.0 + 1.9 * inchesOver60;
    miller = 56.2 + 1.41 * inchesOver60;
    hamwi = 48.0 + 2.7 * inchesOver60;
  } else {
    devine = 45.5 + 2.3 * inchesOver60;
    robinson = 49.0 + 1.7 * inchesOver60;
    miller = 53.1 + 1.36 * inchesOver60;
    hamwi = 45.5 + 2.2 * inchesOver60;
  }

  const avg = (devine + robinson + miller + hamwi) / 4;

  // Frame size via height / wrist ratio
  const ratio = heightCm / wristCircumferenceCm;
  let frameSize: 'Small Frame' | 'Medium Frame' | 'Large Frame' = 'Medium Frame';
  let adjustment = 1.0;

  if (gender === 'male') {
    if (ratio > 10.4) {
      frameSize = 'Small Frame';
      adjustment = 0.93;
    } else if (ratio < 9.6) {
      frameSize = 'Large Frame';
      adjustment = 1.07;
    }
  } else {
    if (ratio > 11.0) {
      frameSize = 'Small Frame';
      adjustment = 0.93;
    } else if (ratio < 10.1) {
      frameSize = 'Large Frame';
      adjustment = 1.07;
    }
  }

  const adjustedMean = avg * adjustment;

  return {
    devineKg: Math.round(devine * 10) / 10,
    robinsonKg: Math.round(robinson * 10) / 10,
    millerKg: Math.round(miller * 10) / 10,
    hamwiKg: Math.round(hamwi * 10) / 10,
    averageIdealKg: Math.round(adjustedMean * 10) / 10,
    frameSize,
    adjustedRangeKg: {
      min: Math.round((adjustedMean * 0.92) * 10) / 10,
      max: Math.round((adjustedMean * 1.08) * 10) / 10,
    },
  };
}

export interface MuscularPotentialResult {
  berkhanMaxKg: number;
  berkhanCondition: string;
  caseyButtMaxLbmKg: number;
  caseyButtMaxWeightAt10PctKg: number;
  maxMeasurementsCm: {
    chest: number;
    biceps: number;
    forearm: number;
    neck: number;
    thigh: number;
    calf: number;
  };
}

export function calculateMuscularPotential(
  heightCm: number,
  wristCm: number,
  ankleCm: number
): MuscularPotentialResult {
  // Martin Berkhan Leangains equation: Max bodyweight at 5-6% shredded bodyfat = Height in cm - 100
  const berkhanKg = Math.round(Math.max(45, heightCm - 100) * 10) / 10;

  // Casey Butt scientific bone-structure frame equations (metric conversions)
  // Height in inches, wrist & ankle in inches
  const hIn = heightCm / 2.54;
  const wIn = wristCm / 2.54;
  const aIn = ankleCm / 2.54;

  const maxLbmLb =
    Math.pow(hIn, 1.5) *
    (Math.sqrt(wIn) / 22.667 + Math.sqrt(aIn) / 17.0104) *
    (1 / 224);

  // Fallback if formula parameters are out of nominal range
  const safeMaxLbmKg = Math.max(50, Math.round((maxLbmLb * 0.453592) * 10) / 10);
  const maxWeightAt10Pct = Math.round((safeMaxLbmKg / 0.9) * 10) / 10;

  // Max natural drug-free circumference potentials (Casey Butt formulas, converted to cm)
  const chestIn = 1.6817 * wIn + 1.3759 * aIn + 0.3314 * hIn;
  const bicepsIn = 1.2033 * wIn + 0.1236 * hIn;
  const forearmIn = 0.9612 * wIn + 0.0989 * hIn;
  const neckIn = 1.1424 * wIn + 0.1236 * hIn;
  const thighIn = 1.3868 * aIn + 0.1805 * hIn;
  const calfIn = 0.9298 * aIn + 0.121 * hIn;

  return {
    berkhanMaxKg: berkhanKg,
    berkhanCondition: 'At contest-lean 5-6% body fat (shredded abs and striations)',
    caseyButtMaxLbmKg: safeMaxLbmKg,
    caseyButtMaxWeightAt10PctKg: maxWeightAt10Pct,
    maxMeasurementsCm: {
      chest: Math.round(chestIn * 2.54 * 10) / 10,
      biceps: Math.round(bicepsIn * 2.54 * 10) / 10,
      forearm: Math.round(forearmIn * 2.54 * 10) / 10,
      neck: Math.round(neckIn * 2.54 * 10) / 10,
      thigh: Math.round(thighIn * 2.54 * 10) / 10,
      calf: Math.round(calfIn * 2.54 * 10) / 10,
    },
  };
}

export interface WHtRResult {
  whtr: number;
  classification: string;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  targetWaistCm: { min: number; max: number };
  clinicalInsight: string;
}

export function calculateWHtR(
  waistCm: number,
  heightCm: number
): WHtRResult {
  const whtr = Math.round((waistCm / heightCm) * 100) / 100;
  let classification = 'Healthy Weight Boundary';
  let riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High' = 'Low';
  let clinicalInsight = 'Waist circumference is within the optimal cardioprotective threshold (less than half your height).';

  if (whtr < 0.4) {
    classification = 'Take Care / Abnormally Lean';
    riskLevel = 'Moderate';
    clinicalInsight = 'Very low visceral fat store. May indicate nutritional deficit or lean wasting.';
  } else if (whtr <= 0.49) {
    classification = 'Optimal / Healthy Cardiometabolic Profile';
    riskLevel = 'Low';
    clinicalInsight = 'Excellent Ashwell shape indicator. Minimal deep intra-abdominal visceral adipose accumulation.';
  } else if (whtr <= 0.59) {
    classification = 'Increased Risk / Central Adiposity';
    riskLevel = 'High';
    clinicalInsight = 'Elevated visceral fat surrounding abdominal organs. Associated with early insulin resistance and arterial stiffness.';
  } else {
    classification = 'Substantially High Health Risk';
    riskLevel = 'Very High';
    clinicalInsight = 'Significant visceral fat burden strongly correlated with Type 2 diabetes, metabolic syndrome, and hypertension.';
  }

  return {
    whtr,
    classification,
    riskLevel,
    targetWaistCm: {
      min: Math.round(heightCm * 0.4 * 10) / 10,
      max: Math.round(heightCm * 0.49 * 10) / 10,
    },
    clinicalInsight,
  };
}

export interface ExerciseMETItem {
  id: string;
  name: string;
  category: string;
  met: number;
}

export const EXERCISE_MET_LIST: ExerciseMETItem[] = [
  { id: 'heavy_lifting', name: 'Heavy Weightlifting / Powerlifting (Power RPE 8-10)', category: 'Strength', met: 6.0 },
  { id: 'mod_lifting', name: 'Moderate Resistance Training / Machine Circuit', category: 'Strength', met: 4.5 },
  { id: 'hiit', name: 'HIIT / Tabata / MetCon Circuit', category: 'Conditioning', met: 8.5 },
  { id: 'crossfit', name: 'CrossFit WOD / Olympic Lifting Complex', category: 'Conditioning', met: 9.0 },
  { id: 'running_easy', name: 'Running - Easy Recovery (8 km/h / 5 mph)', category: 'Cardio', met: 8.3 },
  { id: 'running_tempo', name: 'Running - Moderate Tempo (10 km/h / 6.2 mph)', category: 'Cardio', met: 9.8 },
  { id: 'running_fast', name: 'Running - Vigorous Sprint/Pace (13 km/h / 8 mph)', category: 'Cardio', met: 11.8 },
  { id: 'cycling_mod', name: 'Cycling - Moderate Effort (15-19 km/h / 10-12 mph)', category: 'Cardio', met: 6.8 },
  { id: 'cycling_hard', name: 'Cycling - High Intensity / Spin Class', category: 'Cardio', met: 8.8 },
  { id: 'swimming_crawl', name: 'Swimming - Freestyle / Front Crawl Vigorous', category: 'Cardio', met: 9.8 },
  { id: 'swimming_breast', name: 'Swimming - Breaststroke / Leisurely Laps', category: 'Cardio', met: 5.3 },
  { id: 'rowing_erg', name: 'Rowing Machine - Moderate (150W)', category: 'Cardio', met: 7.0 },
  { id: 'rowing_hard', name: 'Rowing Machine - Vigorous Erg (200W+)', category: 'Cardio', met: 10.5 },
  { id: 'boxing_sparring', name: 'Boxing - Sparring / Heavy Bag Rounds', category: 'Combat', met: 8.0 },
  { id: 'bjj_wrestling', name: 'Brazilian Jiu-Jitsu / Wrestling', category: 'Combat', met: 10.2 },
  { id: 'jump_rope', name: 'Jumping Rope - Fast Cadence (120+ RPM)', category: 'Cardio', met: 12.0 },
  { id: 'walking_brisk', name: 'Walking - Brisk Incline (5.5 km/h, 5% grade)', category: 'Low Impact', met: 4.3 },
  { id: 'yoga_vinyasa', name: 'Power Vinyasa Yoga / Hot Flow', category: 'Mobility', met: 4.0 },
];

export function calculateCaloriesBurned(
  met: number,
  durationMinutes: number,
  weightKg: number
): { totalCalories: number; calPerMinute: number } {
  // ACSM Formula: Calories = (MET * 3.5 * weightKg / 200) * durationMinutes
  const cal = ((met * 3.5 * weightKg) / 200) * durationMinutes;
  return {
    totalCalories: Math.round(cal),
    calPerMinute: Math.round((cal / durationMinutes) * 10) / 10,
  };
}

export interface SleepCycleResult {
  recommendedTimes: Array<{
    cycles: number;
    hoursSleep: number;
    formattedTime: string;
    description: string;
    isOptimal: boolean;
  }>;
  latencyMinutes: number;
  circadianArchitecture: string;
}

export function calculateSleepCycles(
  mode: 'wake_at' | 'sleep_now',
  timeInput: string, // "06:30"
  latencyMinutes: number = 14
): SleepCycleResult {
  const [h, m] = timeInput.split(':').map(Number);
  const baseMinutes = (h || 6) * 60 + (m || 30);

  const formatClock = (totalMins: number) => {
    const norm = ((totalMins % 1440) + 1440) % 1440;
    const hour = Math.floor(norm / 60);
    const minute = norm % 60;
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayH = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayH}:${minute < 10 ? '0' : ''}${minute} ${period}`;
  };

  const cycleLength = 90; // Ultradian 90-minute cycle
  const results = [];

  if (mode === 'wake_at') {
    // Counting backward from target wake-up time
    for (let cycles = 6; cycles >= 3; cycles--) {
      const sleepDurationMinutes = cycles * cycleLength;
      const bedtimeMinutes = baseMinutes - sleepDurationMinutes - latencyMinutes;
      results.push({
        cycles,
        hoursSleep: cycles * 1.5,
        formattedTime: formatClock(bedtimeMinutes),
        description: cycles === 5 ? 'Optimal (7.5 Hours - Complete Rest)' : cycles === 6 ? 'Peak Athletic Recovery (9.0 Hours)' : `${cycles * 1.5} Hours`,
        isOptimal: cycles === 5 || cycles === 6,
      });
    }
  } else {
    // Counting forward from going to bed now
    for (let cycles = 3; cycles <= 6; cycles++) {
      const sleepDurationMinutes = cycles * cycleLength;
      const wakeMinutes = baseMinutes + latencyMinutes + sleepDurationMinutes;
      results.push({
        cycles,
        hoursSleep: cycles * 1.5,
        formattedTime: formatClock(wakeMinutes),
        description: cycles === 5 ? 'Optimal (7.5 Hours - 5 Cycles)' : cycles === 6 ? 'Full Neuro-Restorative (9.0 Hours - 6 Cycles)' : `${cycles * 1.5} Hours`,
        isOptimal: cycles === 5 || cycles === 6,
      });
    }
  }

  return {
    recommendedTimes: results,
    latencyMinutes,
    circadianArchitecture: 'A complete ultradian cycle encompasses N1 light transition, N2 spindle sleep, N3 slow-wave deep sleep (cellular physical repair & growth hormone), and REM sleep (synaptic consolidation). Waking mid-cycle causes sleep inertia.',
  };
}

export interface BMRComparativeResult {
  mifflinStJeor: number;
  harrisBenedict: number;
  katchMcArdle: number | null;
  schofieldWHO: number;
  meanBMR: number;
  deltaMaxMin: number;
  clinicalRecommendation: string;
}

export function calculateBMRComparative(
  gender: 'male' | 'female',
  age: number,
  heightCm: number,
  weightKg: number,
  bodyFatPct?: number
): BMRComparativeResult {
  // 1. Mifflin-St Jeor (1990)
  let msj = 10 * weightKg + 6.25 * heightCm - 5 * age + (gender === 'male' ? 5 : -161);

  // 2. Revised Harris-Benedict (Roza and Shizgal 1984)
  let hb = 0;
  if (gender === 'male') {
    hb = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
  } else {
    hb = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
  }

  // 3. Katch-McArdle (if body fat % given)
  let km: number | null = null;
  if (bodyFatPct && bodyFatPct > 3) {
    const lbmKg = weightKg * (1 - bodyFatPct / 100);
    km = 370 + 21.6 * lbmKg;
  }

  // 4. Schofield / Oxford WHO equation (18-29, 30-59, 60+)
  let schofield = 0;
  if (gender === 'male') {
    if (age < 30) schofield = 15.057 * weightKg + 679;
    else if (age < 60) schofield = 11.6 * weightKg + 879;
    else schofield = 13.5 * weightKg + 487;
  } else {
    if (age < 30) schofield = 14.7 * weightKg + 496;
    else if (age < 60) schofield = 8.7 * weightKg + 829;
    else schofield = 10.5 * weightKg + 596;
  }

  const values = [msj, hb, schofield];
  if (km !== null) values.push(km);

  const mean = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  return {
    mifflinStJeor: Math.round(msj),
    harrisBenedict: Math.round(hb),
    katchMcArdle: km ? Math.round(km) : null,
    schofieldWHO: Math.round(schofield),
    meanBMR: mean,
    deltaMaxMin: Math.round(maxVal - minVal),
    clinicalRecommendation: km
      ? 'Katch-McArdle is favored when accurate body fat percentage is known, as lean metabolic mass drives ~95% of basal caloric burn.'
      : 'Mifflin-St Jeor is the current gold standard recognized by the Academy of Nutrition and Dietetics with ±10% clinical accuracy.',
  };
}

export interface ProteinDistributionResult {
  totalDailyGrams: number;
  gramsPerKg: number;
  meals: Array<{
    mealNumber: number;
    title: string;
    proteinGrams: number;
    leucineEstimateGrams: number;
    timingWindow: string;
    recommendedSources: string;
  }>;
  leucineThresholdSummary: string;
}

export function calculateProteinDistribution(
  weightKg: number,
  goal: 'hypertrophy' | 'fat_loss' | 'maintenance' | 'endurance',
  mealsCount: number = 4
): ProteinDistributionResult {
  let gPerKg = 2.0;
  if (goal === 'hypertrophy') gPerKg = 2.2;
  if (goal === 'fat_loss') gPerKg = 2.4; // higher to mitigate catabolism
  if (goal === 'endurance') gPerKg = 1.6;
  if (goal === 'maintenance') gPerKg = 1.8;

  const totalProtein = Math.round(weightKg * gPerKg);
  const perMealGrams = Math.round(totalProtein / mealsCount);

  const mealTemplates = [
    { title: 'Morning MPS Anchor', timing: 'Within 90 mins of waking', sources: 'Whole eggs, whey isolate, egg whites, Greek yogurt' },
    { title: 'Mid-Day Sustained Release', timing: '3-4 hours post-breakfast', sources: 'Chicken breast, turkey, lentils, quinoa, edamame' },
    { title: 'Peri-Workout Anabolic Pulse', timing: '60-90 mins pre/post resistance session', sources: 'Fast-digesting whey protein hydrolysate, lean beef, white fish' },
    { title: 'Nocturnal Muscle Sparing', timing: '30-45 mins before bedtime', sources: 'Micellar casein, cottage cheese, slow-digesting milk peptides' },
    { title: 'Afternoon Recovery Bridge', timing: 'Inter-meal bridge (if 5 meals)', sources: 'Plant isolate blend, tuna, tempeh' },
    { title: 'Second Evening Feed', timing: 'Evening dinner (if 6 meals)', sources: 'Salmon, sirloin steak, tofu' },
  ];

  const meals = [];
  for (let i = 0; i < mealsCount; i++) {
    const template = mealTemplates[i] || { title: `Meal ${i + 1}`, timing: `Every ${Math.round(14 / mealsCount)} hours`, sources: 'Complete biological protein' };
    // Leucine is approximately 8% to 11% of high-quality animal/dairy protein
    const leucine = Math.round(perMealGrams * 0.09 * 10) / 10;
    meals.push({
      mealNumber: i + 1,
      title: template.title,
      proteinGrams: perMealGrams,
      leucineEstimateGrams: leucine,
      timingWindow: template.timing,
      recommendedSources: template.sources,
    });
  }

  return {
    totalDailyGrams: totalProtein,
    gramsPerKg: gPerKg,
    meals,
    leucineThresholdSummary: `Each meal provides approximately ${meals[0].leucineEstimateGrams}g of leucine, exceeding the critical ~2.7g-3.0g trigger needed to fully initiate intracellular mTORC1 phosphorylation.`,
  };
}

export interface RecompPlannerResult {
  maintenanceCalories: number;
  targetDailyCalories: number;
  weeklyCalorieDelta: number;
  dailyProteinGrams: number;
  projectedWeeks: number;
  projectedFatLossKg: number;
  projectedLeanGainKg: number;
  strategyName: string;
  rationale: string;
}

export function calculateBodyRecomposition(
  weightKg: number,
  tdee: number,
  experienceLevel: 'beginner' | 'intermediate' | 'advanced',
  preference: 'slight_deficit' | 'pure_maintenance' | 'slight_surplus'
): RecompPlannerResult {
  let deltaPct = 0;
  let strategyName = 'Iso-Caloric Strict Recomposition (0% Delta)';
  let rationale = 'Zero net energy change forces physiological energy partition: fat stores subsidize muscle protein synthesis.';

  if (preference === 'slight_deficit') {
    deltaPct = -0.15;
    strategyName = 'Hypertrophic Fat Loss (-15% Deficit)';
    rationale = 'Accelerated adipose reduction while preserving muscle hypertrophy through high protein and progressive overload.';
  } else if (preference === 'slight_surplus') {
    deltaPct = 0.08;
    strategyName = 'Lean Hypertrophy Surge (+8% Surplus)';
    rationale = 'Minimal adipose spillover with maximized glycogen replenishment and neuromuscular recovery.';
  }

  const targetCal = Math.round(tdee * (1 + deltaPct));
  const weeklyDelta = (targetCal - tdee) * 7;
  const proteinGrams = Math.round(weightKg * 2.3);

  // Recomp potential is heavily modulated by training status (Aragon & Schoenfeld)
  let potentialMultiplier = 1.0;
  if (experienceLevel === 'beginner') potentialMultiplier = 2.2;
  if (experienceLevel === 'intermediate') potentialMultiplier = 1.0;
  if (experienceLevel === 'advanced') potentialMultiplier = 0.4;

  const projectedWeeks = 12;
  const projectedFatLossKg = Math.round(Math.abs(weeklyDelta * (projectedWeeks / 7700) + (preference === 'pure_maintenance' ? 2.0 * potentialMultiplier : 0)) * 10) / 10;
  const projectedLeanGainKg = Math.round((1.8 * potentialMultiplier) * 10) / 10;

  return {
    maintenanceCalories: tdee,
    targetDailyCalories: targetCal,
    weeklyCalorieDelta: weeklyDelta,
    dailyProteinGrams: proteinGrams,
    projectedWeeks,
    projectedFatLossKg,
    projectedLeanGainKg,
    strategyName,
    rationale,
  };
}

export interface HRRResult {
  maxHR: number;
  restingHR: number;
  hrr: number;
  zones: Array<{
    zone: string;
    range: string;
    hrrPctRange: string;
    physiologicalAdaptation: string;
  }>;
}

export function calculateHRR(
  age: number,
  restingHR: number,
  customMaxHR?: number
): HRRResult {
  const maxHR = customMaxHR && customMaxHR > 120 ? customMaxHR : Math.round(208 - 0.7 * age);
  const hrr = maxHR - restingHR;

  const targetBpm = (pct: number) => Math.round(restingHR + (pct / 100) * hrr);

  const zones = [
    {
      zone: 'Zone 1: Active Recovery / Parasympathetic Balance',
      range: `${targetBpm(30)} - ${targetBpm(40)} BPM`,
      hrrPctRange: '30% - 40% HRR',
      physiologicalAdaptation: 'Promotes venous return, lymph clearance, and parasympathetic autonomic restoration without cortisol elevation.',
    },
    {
      zone: 'Zone 2: Aerobic Base / Mitochondrial Biogenesis',
      range: `${targetBpm(40)} - ${targetBpm(59)} BPM`,
      hrrPctRange: '40% - 59% HRR',
      physiologicalAdaptation: 'Peak lipid oxidation; expands left ventricular stroke volume and boosts peripheral capillary density.',
    },
    {
      zone: 'Zone 3: Tempo / Aerobic Glycolysis',
      range: `${targetBpm(60)} - ${targetBpm(69)} BPM`,
      hrrPctRange: '60% - 69% HRR',
      physiologicalAdaptation: 'Develops metabolic endurance; teaches type I and IIa fibers to efficiently clear lactate at submaximal race paces.',
    },
    {
      zone: 'Zone 4: Anaerobic Threshold / Lactate Turnpoint',
      range: `${targetBpm(70)} - ${targetBpm(84)} BPM`,
      hrrPctRange: '70% - 84% HRR',
      physiologicalAdaptation: 'Shifts primary reliance to intracellular glycogen; buffers hydrogen ion accumulation and expands maximum time to exhaustion.',
    },
    {
      zone: 'Zone 5: Neuromuscular / VO2 Peak Power',
      range: `${targetBpm(85)} - ${maxHR} BPM`,
      hrrPctRange: '85% - 100% HRR',
      physiologicalAdaptation: 'Maximal pulmonary ventilation and cardiac output; recruits high-threshold fast-twitch motor units for short explosive intervals.',
    },
  ];

  return {
    maxHR,
    restingHR,
    hrr,
    zones,
  };
}
