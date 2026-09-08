import { CalculatorMeta, UnitSystem } from '../types';
import {
  calculateTDEE,
  calculateMacros,
  calculateNavyBodyFat,
  calculateOneRepMax,
  calculateTargetHeartRate,
  calculateRunningPace,
  calculateIntermittentFasting,
  calculateHydration,
  calculateCreatine,
  calculateFFMI,
  calculateIdealBodyWeight,
  calculateMuscularPotential,
  calculateWHtR,
  calculateCaloriesBurned,
  calculateSleepCycles,
  calculateBMRComparative,
  calculateProteinDistribution,
  calculateBodyRecomposition,
  calculateHRR,
  EXERCISE_MET_LIST,
} from './calculatorEngines';

export interface ExportInputState {
  gender: 'male' | 'female';
  age: number;
  weight: number;
  height: number;
  weightKg: number;
  heightCm: number;
  bodyFatPct: number;
  activityMultiplier: number;
  macroCalories: number;
  macroGoal: 'fat_loss' | 'maintenance' | 'muscle_gain' | 'keto' | 'endurance';
  macroMeals: number;
  neckCirc: number;
  waistCirc: number;
  hipCirc: number;
  neckCm: number;
  waistCm: number;
  hipCm: number;
  liftWeight: number;
  liftKg: number;
  liftReps: number;
  restingHeartRate: number;
  runDistance: number;
  runDistKm: number;
  runHours: number;
  runMinutes: number;
  runSeconds: number;
  fastProtocol: '16_8' | '18_6' | '20_4' | '24_0' | '12_12';
  fastStartTime: string;
  workoutDuration: number;
  sweatIntensity: 'light' | 'moderate' | 'heavy';
  climate: 'temperate' | 'hot_humid' | 'dry_arid' | 'cold_altitude';
  creatineIntensity: 'fitness' | 'bodybuilding_powerlifting';
  wristCirc: number;
  ankleCirc: number;
  wristCm: number;
  ankleCm: number;
  selectedExerciseId: string;
  exerciseDurationMin: number;
  sleepMode: 'wake_at' | 'sleep_now';
  sleepTime: string;
  proteinGoal: 'hypertrophy' | 'fat_loss' | 'maintenance' | 'endurance';
  proteinMeals: number;
  recompPreference: 'slight_deficit' | 'pure_maintenance' | 'slight_surplus';
  recompExperience: 'beginner' | 'intermediate' | 'advanced';
}

export interface ExportPayload {
  filenameBase: string;
  summaryText: string;
  csvText: string;
  title: string;
  timestamp: string;
  entriesCount: number;
}

interface CsvRow {
  timestamp: string;
  calculator: string;
  section: string;
  parameter: string;
  value: string | number;
  unit: string;
}

function escapeCsvField(val: string | number): string {
  const str = String(val ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function buildCsvFromRows(rows: CsvRow[]): string {
  const header = ['Timestamp', 'Calculator', 'Section', 'Parameter', 'Value', 'Unit'];
  const lines = [header.map(escapeCsvField).join(',')];
  for (const r of rows) {
    lines.push([
      escapeCsvField(r.timestamp),
      escapeCsvField(r.calculator),
      escapeCsvField(r.section),
      escapeCsvField(r.parameter),
      escapeCsvField(r.value),
      escapeCsvField(r.unit),
    ].join(','));
  }
  return lines.join('\r\n');
}

export function generateExportData(
  calc: CalculatorMeta,
  unitSystem: UnitSystem,
  s: ExportInputState
): ExportPayload {
  const now = new Date();
  const isoTimestamp = now.toISOString();
  const localFormatted = now.toLocaleString();
  const dateFormatted = isoTimestamp.replace('T', ' ').substring(0, 19) + ' UTC';
  const fileDateStamp = isoTimestamp.substring(0, 10);
  const filenameBase = `zenfit_${calc.id}_${fileDateStamp}`;

  const weightUnit = unitSystem === 'metric' ? 'kg' : 'lbs';
  const heightUnit = unitSystem === 'metric' ? 'cm' : 'inches';

  const rows: CsvRow[] = [];
  const addCsvRow = (section: string, parameter: string, value: string | number, unit: string = '') => {
    rows.push({
      timestamp: isoTimestamp,
      calculator: calc.title,
      section,
      parameter,
      value,
      unit,
    });
  };

  addCsvRow('Metadata', 'Unit System', unitSystem === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lbs/in)');
  addCsvRow('Metadata', 'Timestamp', isoTimestamp);

  const textLines: string[] = [];
  textLines.push('================================================================');
  textLines.push('ZENFIT TOOLS - EVIDENCE-BASED FITNESS & BIOMETRIC LOG');
  textLines.push('================================================================');
  textLines.push(`Calculator:   ${calc.title}`);
  textLines.push(`Category:     ${calc.category.toUpperCase().replace('_', ' ')}`);
  textLines.push(`Timestamp:    ${isoTimestamp} (${localFormatted})`);
  textLines.push(`Unit System:  ${unitSystem === 'metric' ? 'Metric (kg, cm, ml, km/h)' : 'Imperial (lbs, inches, fl oz, mph)'}`);
  textLines.push('');

  textLines.push('----------------------------------------------------------------');
  textLines.push('1. LOGGED INPUT PARAMETERS');
  textLines.push('----------------------------------------------------------------');

  // Add inputs to CSV & Summary according to calc
  if (['tdee', 'navy_body_fat', 'ideal_weight', 'bmr_comparative'].includes(calc.id)) {
    textLines.push(`• Biological Sex:        ${s.gender === 'male' ? 'Male' : 'Female'}`);
    addCsvRow('Input', 'Biological Sex', s.gender === 'male' ? 'Male' : 'Female');
  }
  if (['tdee', 'heart_rate_zones', 'bmr_comparative', 'hrr_zones'].includes(calc.id)) {
    textLines.push(`• Age:                   ${s.age} years`);
    addCsvRow('Input', 'Age', s.age, 'years');
  }
  if (['tdee', 'macros', 'navy_body_fat', 'hydration', 'creatine', 'ffmi', 'calories_burned', 'bmr_comparative', 'protein_timing', 'body_recomposition'].includes(calc.id)) {
    textLines.push(`• Body Weight:           ${s.weight} ${weightUnit} (${Math.round(s.weightKg * 10) / 10} kg)`);
    addCsvRow('Input', 'Body Weight', s.weight, weightUnit);
  }
  if (['tdee', 'navy_body_fat', 'ffmi', 'ideal_weight', 'muscular_potential', 'whtr', 'bmr_comparative'].includes(calc.id)) {
    textLines.push(`• Height:                ${s.height} ${heightUnit} (${Math.round(s.heightCm * 10) / 10} cm)`);
    addCsvRow('Input', 'Height', s.height, heightUnit);
  }
  if (['tdee', 'ffmi', 'bmr_comparative', 'body_recomposition'].includes(calc.id)) {
    textLines.push(`• Body Fat %:            ${s.bodyFatPct}%`);
    addCsvRow('Input', 'Body Fat Percentage', s.bodyFatPct, '%');
  }

  textLines.push('');
  textLines.push('----------------------------------------------------------------');
  textLines.push('2. COMPUTED RESULTS & METRICS');
  textLines.push('----------------------------------------------------------------');

  // Compute calculator results
  if (calc.id === 'tdee') {
    const res = calculateTDEE(s.gender, s.age, s.heightCm, s.weightKg, s.activityMultiplier, s.bodyFatPct);
    textLines.push(`• Basal Metabolic Rate (BMR):        ${res.bmr.toLocaleString()} kcal/day`);
    textLines.push(`  Formula Used:                      ${res.bmrFormula}`);
    textLines.push(`• Total Daily Energy Exp (TDEE):     ${res.tdee.toLocaleString()} kcal/day`);
    textLines.push(`• Maintenance Caloric Level:         ${res.maintenance.toLocaleString()} kcal/day`);
    textLines.push(`• Moderate Cutting Deficit (-500):   ${res.cutting.toLocaleString()} kcal/day`);
    textLines.push(`• Aggressive Cutting Deficit (-750): ${res.aggressiveCutting.toLocaleString()} kcal/day`);
    textLines.push(`• Lean Bulking Target (+300):        ${res.leanBulking.toLocaleString()} kcal/day`);
    textLines.push('');
    textLines.push('Energy Burn Breakdown:');
    textLines.push(`- BMR (Basal Metabolism):            ${res.breakdown.bmr} kcal`);
    textLines.push(`- TEF (Thermic Effect of Food):      ${res.breakdown.tef} kcal`);
    textLines.push(`- NEAT (Daily Activity/Steps):       ${res.breakdown.neat} kcal`);
    textLines.push(`- EAT (Exercise Physical Exertion):  ${res.breakdown.eat} kcal`);

    addCsvRow('Result', 'BMR', res.bmr, 'kcal/day');
    addCsvRow('Result', 'BMR Formula', res.bmrFormula);
    addCsvRow('Result', 'TDEE Maintenance', res.tdee, 'kcal/day');
    addCsvRow('Result', 'Cutting Target', res.cutting, 'kcal/day');
    addCsvRow('Result', 'Aggressive Cut Target', res.aggressiveCutting, 'kcal/day');
    addCsvRow('Result', 'Lean Bulk Target', res.leanBulking, 'kcal/day');
    addCsvRow('Result', 'TEF (Food)', res.breakdown.tef, 'kcal');
    addCsvRow('Result', 'NEAT (Steps)', res.breakdown.neat, 'kcal');
    addCsvRow('Result', 'EAT (Gym)', res.breakdown.eat, 'kcal');
  } else if (calc.id === 'macros') {
    const res = calculateMacros(s.macroCalories, s.macroGoal, s.weightKg, s.macroMeals);
    textLines.push(`• Caloric Budget:       ${res.calories.toLocaleString()} kcal/day`);
    textLines.push(`• Dietary Protocol:     ${s.macroGoal.replace('_', ' ').toUpperCase()}`);
    textLines.push(`• Daily Meals:          ${s.macroMeals} meals/day`);
    textLines.push(`• Protein Target:       ${res.proteinGrams}g (${res.proteinCalories} kcal - ${res.proteinPct}%)`);
    textLines.push(`• Carbohydrate Target:  ${res.carbGrams}g (${res.carbCalories} kcal - ${res.carbPct}%)`);
    textLines.push(`• Fat Target:           ${res.fatGrams}g (${res.fatCalories} kcal - ${res.fatPct}%)`);
    textLines.push('');
    textLines.push(`Per Meal Allocation (${s.macroMeals} meals/day):`);
    textLines.push(`- Protein: ${res.perMeal.protein}g · Carbs: ${res.perMeal.carbs}g · Fat: ${res.perMeal.fat}g (~${res.perMeal.calories} kcal)`);

    addCsvRow('Result', 'Caloric Budget', res.calories, 'kcal');
    addCsvRow('Result', 'Protein', res.proteinGrams, 'grams');
    addCsvRow('Result', 'Protein Calories', res.proteinCalories, 'kcal');
    addCsvRow('Result', 'Carbohydrates', res.carbGrams, 'grams');
    addCsvRow('Result', 'Carb Calories', res.carbCalories, 'kcal');
    addCsvRow('Result', 'Dietary Fat', res.fatGrams, 'grams');
    addCsvRow('Result', 'Fat Calories', res.fatCalories, 'kcal');
    addCsvRow('Result', 'Per Meal Protein', res.perMeal.protein, 'grams');
    addCsvRow('Result', 'Per Meal Carbs', res.perMeal.carbs, 'grams');
    addCsvRow('Result', 'Per Meal Fat', res.perMeal.fat, 'grams');
  } else if (calc.id === 'navy_body_fat') {
    const res = calculateNavyBodyFat(s.gender, s.heightCm, s.neckCm, s.waistCm, s.hipCm, s.weightKg);
    const fatMassDisp = unitSystem === 'metric' ? `${res.fatMassKg} kg` : `${Math.round(res.fatMassKg * 2.20462 * 10) / 10} lbs`;
    const leanMassDisp = unitSystem === 'metric' ? `${res.leanMassKg} kg` : `${Math.round(res.leanMassKg * 2.20462 * 10) / 10} lbs`;

    textLines.push(`• Estimated Body Fat %:  ${res.bodyFatPct}%`);
    textLines.push(`• Category:              ${res.category}`);
    textLines.push(`• Ideal Baseline Range:  ${res.idealRange}`);
    textLines.push(`• Total Fat Mass:        ${fatMassDisp}`);
    textLines.push(`• Lean Body Mass (LBM):  ${leanMassDisp}`);

    addCsvRow('Result', 'Body Fat Percentage', res.bodyFatPct, '%');
    addCsvRow('Result', 'Fitness Category', res.category);
    addCsvRow('Result', 'Fat Mass', unitSystem === 'metric' ? res.fatMassKg : Math.round(res.fatMassKg * 2.20462 * 10) / 10, weightUnit);
    addCsvRow('Result', 'Lean Mass', unitSystem === 'metric' ? res.leanMassKg : Math.round(res.leanMassKg * 2.20462 * 10) / 10, weightUnit);
  } else if (calc.id === 'one_rep_max') {
    const res = calculateOneRepMax(s.liftWeight, s.liftReps);
    textLines.push(`• Lift Tested:           ${s.liftWeight} ${weightUnit} × ${s.liftReps} reps`);
    textLines.push(`• Estimated 1RM (Mean):  ${res.average1RM} ${weightUnit}`);
    textLines.push(`• Brzycki Formula 1RM:   ${res.brzycki} ${weightUnit}`);
    textLines.push(`• Epley Formula 1RM:     ${res.epley} ${weightUnit}`);
    textLines.push(`• Wathan Formula 1RM:    ${res.wathan} ${weightUnit}`);
    textLines.push('');
    textLines.push('Training Load Percentages:');
    res.percentages.slice(0, 8).forEach((p) => {
      textLines.push(`- ${p.pct}% 1RM: ${p.weight} ${weightUnit} (${p.targetReps} reps) - ${p.stimulus}`);
      addCsvRow('Result', `${p.pct}% 1RM Load`, p.weight, weightUnit);
    });

    addCsvRow('Result', 'Mean 1RM', res.average1RM, weightUnit);
    addCsvRow('Result', 'Brzycki 1RM', res.brzycki, weightUnit);
    addCsvRow('Result', 'Epley 1RM', res.epley, weightUnit);
  } else if (calc.id === 'heart_rate_zones') {
    const res = calculateTargetHeartRate(s.age, s.restingHeartRate);
    textLines.push(`• Tanaka Predicted Max HR:  ${res.recommendedMax} BPM`);
    textLines.push(`• Resting Heart Rate:       ${s.restingHeartRate} BPM`);
    textLines.push('');
    textLines.push('Cardiovascular Training Zones:');
    res.zones.forEach((z) => {
      textLines.push(`- Zone ${z.zone} (${z.name}): ${z.range} | ${z.purpose}`);
      addCsvRow('Result', `Zone ${z.zone} (${z.name})`, z.range, 'BPM');
    });

    addCsvRow('Result', 'Predicted Max HR', res.recommendedMax, 'BPM');
  } else if (calc.id === 'running_pace') {
    const res = calculateRunningPace(s.runDistKm, s.runHours, s.runMinutes, s.runSeconds);
    textLines.push(`• Distance Covered:       ${s.runDistance} ${unitSystem === 'metric' ? 'km' : 'miles'}`);
    textLines.push(`• Elapsed Time:           ${String(s.runHours).padStart(2, '0')}:${String(s.runMinutes).padStart(2, '0')}:${String(s.runSeconds).padStart(2, '0')}`);
    textLines.push(`• Metric Pace:            ${res.pacePerKm}`);
    textLines.push(`• Imperial Pace:          ${res.pacePerMile}`);
    textLines.push(`• Speed:                  ${res.speedKmh} km/h (${res.speedMph} mph)`);
    textLines.push(`• Estimated Aerobic VO2:  ${res.vo2MaxEst} ml/kg/min`);
    textLines.push('');
    textLines.push('Pete Riegel Fatigue Model Race Predictions:');
    res.racePredictions.forEach((r) => {
      textLines.push(`- ${r.distance}: ${r.predictedTime} (${r.predictedPace})`);
      addCsvRow('Result', `Predicted ${r.distance}`, r.predictedTime);
    });

    addCsvRow('Result', 'Pace / km', res.pacePerKm);
    addCsvRow('Result', 'Pace / mile', res.pacePerMile);
    addCsvRow('Result', 'Speed', unitSystem === 'metric' ? res.speedKmh : res.speedMph, unitSystem === 'metric' ? 'km/h' : 'mph');
    addCsvRow('Result', 'Estimated VO2 Max', res.vo2MaxEst, 'ml/kg/min');
  } else if (calc.id === 'intermittent_fasting') {
    const res = calculateIntermittentFasting(s.fastProtocol, s.fastStartTime);
    textLines.push(`• Protocol:               ${res.protocolName}`);
    textLines.push(`• Fasting Window:         ${res.fastingHours} hours (${res.fastingWindowStarts} → ${res.fastingWindowEnds})`);
    textLines.push(`• Feeding Window:         ${res.eatingHours} hours (${res.eatingWindowStarts} → ${res.eatingWindowEnds})`);
    textLines.push('');
    textLines.push('Physiological Stages of Fast:');
    res.stages.forEach((st) => {
      textLines.push(`- ${st.name} [${st.hoursRange}]: ${st.marker}`);
      addCsvRow('Result', `Stage: ${st.name}`, st.hoursRange);
    });

    addCsvRow('Result', 'Fasting Start', res.fastingWindowStarts);
    addCsvRow('Result', 'Fasting End', res.fastingWindowEnds);
    addCsvRow('Result', 'Eating Start', res.eatingWindowStarts);
    addCsvRow('Result', 'Eating End', res.eatingWindowEnds);
  } else if (calc.id === 'hydration') {
    const res = calculateHydration(s.weightKg, s.workoutDuration, s.sweatIntensity, s.climate);
    textLines.push(`• Daily Total Fluid Target:  ${res.totalLiters} Liters (${res.totalFlOz} fl oz)`);
    textLines.push(`• Baseline Metabolic Need:   ${res.baseLiters} L`);
    textLines.push(`• Exercise Sweat Excretion:  +${res.exerciseAddonLiters} L`);
    textLines.push(`• Climate Dynamic Loss:      +${res.climateAddonLiters} L`);
    textLines.push(`• Recommended Hourly Intake: ~${res.hourlyRecommendationMl} ml / active hour`);
    textLines.push(`• Sodium Rehydration Target: ${res.sodiumGuidelineMg}`);

    addCsvRow('Result', 'Total Fluid Target', res.totalLiters, 'Liters');
    addCsvRow('Result', 'Total Fluid (Imperial)', res.totalFlOz, 'fl oz');
    addCsvRow('Result', 'Hourly Recommendation', res.hourlyRecommendationMl, 'ml/hr');
    addCsvRow('Result', 'Sodium Target', res.sodiumGuidelineMg);
  } else if (calc.id === 'creatine') {
    const res = calculateCreatine(s.weightKg, s.creatineIntensity);
    textLines.push(`• Daily Maintenance Dose:   ${res.maintenanceDailyGrams} grams/day`);
    textLines.push(`• Optional 6-Day Rapid Load: ${res.loadingDailyGrams} g/day total`);
    textLines.push(`  Split Protocol:            ${res.loadingDosesPerDay} servings of ${res.loadingDosePerServing}g`);
    textLines.push(`• Required Water Surplus:    +${res.surplusWaterMl} ml water daily`);

    addCsvRow('Result', 'Daily Maintenance', res.maintenanceDailyGrams, 'grams');
    addCsvRow('Result', 'Rapid Loading Dose', res.loadingDailyGrams, 'grams/day');
    addCsvRow('Result', 'Loading Doses Count', res.loadingDosesPerDay, 'servings');
    addCsvRow('Result', 'Water Surplus Required', res.surplusWaterMl, 'ml');
  } else if (calc.id === 'ffmi') {
    const res = calculateFFMI(s.weightKg, s.heightCm, s.bodyFatPct);
    const lbmDisp = unitSystem === 'metric' ? `${res.lbmKg} kg` : `${Math.round(res.lbmKg * 2.20462 * 10) / 10} lbs`;
    textLines.push(`• Normalized FFMI:           ${res.normalizedFfmi}`);
    textLines.push(`• Raw FFMI:                  ${res.ffmi}`);
    textLines.push(`• Natural Classification:    ${res.classification}`);
    textLines.push(`• Lean Body Mass (LBM):      ${lbmDisp}`);
    textLines.push(`• Scientific Summary:        ${res.summary}`);

    addCsvRow('Result', 'Normalized FFMI', res.normalizedFfmi);
    addCsvRow('Result', 'Raw FFMI', res.ffmi);
    addCsvRow('Result', 'Natural Classification', res.classification);
    addCsvRow('Result', 'Lean Body Mass', lbmDisp);
  } else if (calc.id === 'ideal_weight') {
    const res = calculateIdealBodyWeight(s.gender, s.heightCm, s.wristCm);
    const avgDisp = unitSystem === 'metric' ? `${res.averageIdealKg} kg` : `${Math.round(res.averageIdealKg * 2.20462)} lbs`;
    const rangeDisp = unitSystem === 'metric' ? `${res.adjustedRangeKg.min} - ${res.adjustedRangeKg.max} kg` : `${Math.round(res.adjustedRangeKg.min * 2.20462)} - ${Math.round(res.adjustedRangeKg.max * 2.20462)} lbs`;

    textLines.push(`• Average Ideal Weight:      ${avgDisp}`);
    textLines.push(`• Skeletal Frame Category:   ${res.frameSize}`);
    textLines.push(`• Calibrated Healthy Range:  ${rangeDisp}`);
    textLines.push(`• Devine Clinical Formula:   ${unitSystem === 'metric' ? `${res.devineKg} kg` : `${Math.round(res.devineKg * 2.20462)} lbs`}`);
    textLines.push(`• Robinson Formula:          ${unitSystem === 'metric' ? `${res.robinsonKg} kg` : `${Math.round(res.robinsonKg * 2.20462)} lbs`}`);
    textLines.push(`• Miller Formula:            ${unitSystem === 'metric' ? `${res.millerKg} kg` : `${Math.round(res.millerKg * 2.20462)} lbs`}`);
    textLines.push(`• Hamwi Formula:             ${unitSystem === 'metric' ? `${res.hamwiKg} kg` : `${Math.round(res.hamwiKg * 2.20462)} lbs`}`);

    addCsvRow('Result', 'Average Ideal Weight', avgDisp);
    addCsvRow('Result', 'Frame Size', res.frameSize);
    addCsvRow('Result', 'Healthy Range', rangeDisp);
    addCsvRow('Result', 'Devine Formula', res.devineKg, 'kg');
  } else if (calc.id === 'muscular_potential') {
    const res = calculateMuscularPotential(s.heightCm, s.wristCm, s.ankleCm);
    const berkhanDisp = unitSystem === 'metric' ? `${res.berkhanMaxKg} kg` : `${Math.round(res.berkhanMaxKg * 2.20462)} lbs`;
    const caseyLbmDisp = unitSystem === 'metric' ? `${res.caseyButtMaxLbmKg} kg` : `${Math.round(res.caseyButtMaxLbmKg * 2.20462)} lbs`;

    textLines.push(`• Berkhan Ceiling (at 5-6%): ${berkhanDisp}`);
    textLines.push(`• Casey Butt Max Lean Mass:  ${caseyLbmDisp}`);
    textLines.push(`• Max Weight at 10% Bodyfat: ${unitSystem === 'metric' ? `${res.caseyButtMaxWeightAt10PctKg} kg` : `${Math.round(res.caseyButtMaxWeightAt10PctKg * 2.20462)} lbs`}`);
    textLines.push('');
    textLines.push('Casey Butt Genetic Circumference Ceilings:');
    textLines.push(`- Chest:  ${unitSystem === 'metric' ? `${res.maxMeasurementsCm.chest} cm` : `${Math.round(res.maxMeasurementsCm.chest / 2.54 * 10) / 10} in`}`);
    textLines.push(`- Biceps: ${unitSystem === 'metric' ? `${res.maxMeasurementsCm.biceps} cm` : `${Math.round(res.maxMeasurementsCm.biceps / 2.54 * 10) / 10} in`}`);
    textLines.push(`- Thighs: ${unitSystem === 'metric' ? `${res.maxMeasurementsCm.thigh} cm` : `${Math.round(res.maxMeasurementsCm.thigh / 2.54 * 10) / 10} in`}`);

    addCsvRow('Result', 'Berkhan Model Max Weight', berkhanDisp);
    addCsvRow('Result', 'Casey Butt Max Lean Mass', caseyLbmDisp);
    addCsvRow('Result', 'Max Chest Circumference', res.maxMeasurementsCm.chest, 'cm');
    addCsvRow('Result', 'Max Bicep Circumference', res.maxMeasurementsCm.biceps, 'cm');
  } else if (calc.id === 'whtr') {
    const res = calculateWHtR(s.waistCm, s.heightCm);
    textLines.push(`• Waist-to-Height Ratio:     ${res.whtr}`);
    textLines.push(`• Clinical Classification:   ${res.classification}`);
    textLines.push(`• Cardiometabolic Risk:      ${res.riskLevel}`);
    textLines.push(`• Clinical Insight:          ${res.clinicalInsight}`);
    textLines.push(`• Target Healthy Waist:      ${unitSystem === 'metric' ? `${res.targetWaistCm.min} - ${res.targetWaistCm.max} cm` : `${Math.round(res.targetWaistCm.min / 2.54)} - ${Math.round(res.targetWaistCm.max / 2.54)} in`}`);

    addCsvRow('Result', 'Waist-to-Height Ratio', res.whtr);
    addCsvRow('Result', 'Classification', res.classification);
    addCsvRow('Result', 'Risk Level', res.riskLevel);
  } else if (calc.id === 'calories_burned') {
    const item = EXERCISE_MET_LIST.find((e) => e.id === s.selectedExerciseId) || EXERCISE_MET_LIST[0];
    const res = calculateCaloriesBurned(item.met, s.exerciseDurationMin, s.weightKg);
    textLines.push(`• Exercise Selected:         ${item.name} (${item.met} METs)`);
    textLines.push(`• Duration:                  ${s.exerciseDurationMin} minutes`);
    textLines.push(`• Total Calorie Expenditure: ${res.totalCalories.toLocaleString()} kcal`);
    textLines.push(`• Rate of Burn:              ${res.calPerMinute} kcal/minute`);

    addCsvRow('Result', 'Exercise Name', item.name);
    addCsvRow('Result', 'MET Value', item.met);
    addCsvRow('Result', 'Total Calories Burned', res.totalCalories, 'kcal');
    addCsvRow('Result', 'Burn Rate', res.calPerMinute, 'kcal/min');
  } else if (calc.id === 'sleep_cycles') {
    const res = calculateSleepCycles(s.sleepMode, s.sleepTime);
    textLines.push(`• Direction:                 ${s.sleepMode === 'wake_at' ? `Waking up at ${s.sleepTime}` : `Going to bed at ${s.sleepTime}`}`);
    textLines.push(`• Sleep Latency factored:    ${res.latencyMinutes} minutes`);
    textLines.push('');
    textLines.push('Ultradian Sleep Cycle Opportunities:');
    res.recommendedTimes.forEach((t) => {
      textLines.push(`- ${t.formattedTime} [${t.cycles} Cycles / ${t.hoursSleep} hrs] ${t.isOptimal ? '★ OPTIMAL' : ''} - ${t.description}`);
      addCsvRow('Result', `${t.cycles} Sleep Cycles Target`, t.formattedTime, `${t.hoursSleep} hrs`);
    });
  } else if (calc.id === 'bmr_comparative') {
    const res = calculateBMRComparative(s.gender, s.age, s.heightCm, s.weightKg, s.bodyFatPct);
    textLines.push(`• Multi-Formula Mean BMR:    ${res.meanBMR} kcal/day`);
    textLines.push(`• Formula Variance Range:    ${res.deltaMaxMin} kcal`);
    textLines.push(`• Mifflin-St Jeor:           ${res.mifflinStJeor} kcal/day`);
    textLines.push(`• Revised Harris-Benedict:   ${res.harrisBenedict} kcal/day`);
    textLines.push(`• Schofield / WHO:           ${res.schofieldWHO} kcal/day`);
    textLines.push(`• Katch-McArdle (LBM):       ${res.katchMcArdle ?? 'N/A'} kcal/day`);
    textLines.push(`• Clinical Recommendation:   ${res.clinicalRecommendation}`);

    addCsvRow('Result', 'Mean BMR', res.meanBMR, 'kcal/day');
    addCsvRow('Result', 'Mifflin-St Jeor', res.mifflinStJeor, 'kcal/day');
    addCsvRow('Result', 'Harris-Benedict', res.harrisBenedict, 'kcal/day');
    addCsvRow('Result', 'Schofield WHO', res.schofieldWHO, 'kcal/day');
    if (res.katchMcArdle) addCsvRow('Result', 'Katch-McArdle', res.katchMcArdle, 'kcal/day');
  } else if (calc.id === 'protein_timing') {
    const res = calculateProteinDistribution(s.weightKg, s.proteinGoal, s.proteinMeals);
    textLines.push(`• Total Daily Protein:       ${res.totalDailyGrams} grams`);
    textLines.push(`• Protein Intake Density:    ${res.gramsPerKg} g/kg bodyweight`);
    textLines.push(`• Bolus Meals Scheduled:     ${s.proteinMeals} meals/day`);
    textLines.push('');
    textLines.push('Anabolic Leucine Pulse Schedule:');
    res.meals.forEach((m) => {
      textLines.push(`- Meal ${m.mealNumber} (${m.title}): ${m.proteinGrams}g protein (~${m.leucineEstimateGrams}g Leucine) | ${m.timingWindow}`);
      addCsvRow('Result', `Meal ${m.mealNumber} (${m.title})`, `${m.proteinGrams}g (Leucine ~${m.leucineEstimateGrams}g)`);
    });

    addCsvRow('Result', 'Total Daily Protein', res.totalDailyGrams, 'grams');
    addCsvRow('Result', 'Protein Density', res.gramsPerKg, 'g/kg');
  } else if (calc.id === 'body_recomposition') {
    const tdeeVal = calculateTDEE(s.gender, s.age, s.heightCm, s.weightKg, s.activityMultiplier).tdee;
    const res = calculateBodyRecomposition(s.weightKg, tdeeVal, s.recompExperience, s.recompPreference);
    const fatLossDisp = unitSystem === 'metric' ? `${res.projectedFatLossKg} kg` : `${Math.round(res.projectedFatLossKg * 2.20462 * 10) / 10} lbs`;
    const leanGainDisp = unitSystem === 'metric' ? `${res.projectedLeanGainKg} kg` : `${Math.round(res.projectedLeanGainKg * 2.20462 * 10) / 10} lbs`;

    textLines.push(`• Strategy:                  ${res.strategyName}`);
    textLines.push(`• Target Daily Calories:     ${res.targetDailyCalories.toLocaleString()} kcal/day`);
    textLines.push(`• Daily Protein Anchor:      ${res.dailyProteinGrams}g`);
    textLines.push(`• 12-Week Projected Fat Loss: -${fatLossDisp}`);
    textLines.push(`• 12-Week Est. Muscle Gain:  +${leanGainDisp}`);
    textLines.push(`• Physiological Rationale:   ${res.rationale}`);

    addCsvRow('Result', 'Strategy', res.strategyName);
    addCsvRow('Result', 'Daily Calories Target', res.targetDailyCalories, 'kcal');
    addCsvRow('Result', 'Daily Protein Anchor', res.dailyProteinGrams, 'grams');
    addCsvRow('Result', '12-Wk Est Fat Loss', fatLossDisp);
    addCsvRow('Result', '12-Wk Est Muscle Gain', leanGainDisp);
  } else if (calc.id === 'hrr_zones') {
    const res = calculateHRR(s.age, s.restingHeartRate);
    textLines.push(`• Operational Heart Rate Res: ${res.hrr} BPM`);
    textLines.push(`• Tanaka Max Heart Rate:      ${res.maxHR} BPM`);
    textLines.push(`• Resting Heart Rate:         ${res.restingHR} BPM`);
    textLines.push('');
    textLines.push('Karvonen Intensity Zones:');
    res.zones.forEach((z) => {
      textLines.push(`- ${z.zone}: ${z.range} (${z.hrrPctRange})`);
      addCsvRow('Result', z.zone, `${z.range} (${z.hrrPctRange})`, 'BPM');
    });

    addCsvRow('Result', 'Max HR', res.maxHR, 'BPM');
    addCsvRow('Result', 'Resting HR', res.restingHR, 'BPM');
    addCsvRow('Result', 'Heart Rate Reserve (HRR)', res.hrr, 'BPM');
  }

  textLines.push('');
  textLines.push('----------------------------------------------------------------');
  textLines.push('3. EVIDENCE-BASED CITATION & FORMULA');
  textLines.push('----------------------------------------------------------------');
  textLines.push(`• Formula:    ${calc.formulaSummary}`);
  if (calc.scientificReferences && calc.scientificReferences.length > 0) {
    textLines.push(`• Reference:  ${calc.scientificReferences[0]}`);
  }
  textLines.push('');
  textLines.push('Generated 100% client-side via ZenFit Tools (Evidence-Based Biometrics).');
  textLines.push('Export formatted for Apple Notes, Notion, Obsidian, and spreadsheet logs.');
  textLines.push('================================================================');

  const summaryText = textLines.join('\n');
  const csvText = buildCsvFromRows(rows);

  return {
    filenameBase,
    summaryText,
    csvText,
    title: calc.title,
    timestamp: dateFormatted,
    entriesCount: rows.length,
  };
}

/**
 * Triggers a browser download of a plain text file
 */
export function downloadTextFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.txt') ? filename : `${filename}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Triggers a browser download of an RFC 4180 CSV file with UTF-8 BOM
 * for perfect compatibility with Excel, Numbers, and Google Sheets
 */
export function downloadCsvFile(content: string, filename: string): void {
  // \uFEFF is UTF-8 Byte Order Mark for Microsoft Excel compatibility
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
