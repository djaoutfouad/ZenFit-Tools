/**
 * Comprehensive Automated Verification Suite for ZenFit Tools
 *
 * Tests:
 * 1. Running pace & time formatting (420s, 360s, boundary rollovers preventing '6m 60s').
 * 2. calculateMacros prevention of mealsCount = 0 and validation error generation.
 * 3. calculateBodyRecomposition with known TDEE = 2400 (verifies maintenance = 2400 and -15% deficit = 2040).
 * 4. All 19 calculators under normal, boundary, and invalid inputs.
 */

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
  formatRunningPace,
  formatRunningTime,
} from './calculatorEngines';

import { validateCalculatorInputs } from './calculatorValidation';
import { formatNumber, containsEasternOrPersianDigits } from './formatNumber';

interface TestLogEntry {
  toolName: string;
  testCase: string;
  input: any;
  status: 'PASS' | 'FAIL';
  detail: string;
}

const testLogs: TestLogEntry[] = [];

function assert(condition: boolean, toolName: string, testCase: string, detail: string, input: any) {
  if (condition) {
    testLogs.push({ toolName, testCase, input, status: 'PASS', detail });
  } else {
    testLogs.push({ toolName, testCase, input, status: 'FAIL', detail: `ASSERTION FAILED: ${detail}` });
    console.error(`[FAIL] ${toolName} - ${testCase}: ${detail}`);
  }
}

export function runFullTestSuite() {
  console.log('================================================================');
  console.log('STARTING ZENFIT TOOLS AUTOMATED TEST & AUDIT SUITE (19 CALCULATORS)');
  console.log('================================================================\n');

  // -------------------------------------------------------------
  // TEST 1: Running Pace Formatting (420s, 360s, rollover tests)
  // -------------------------------------------------------------
  const t360 = formatRunningTime(360);
  assert(t360 === '6m 0s', 'Running Pace', '360 seconds format', `Expected '6m 0s', got '${t360}'`, { totalSec: 360 });

  const t420 = formatRunningTime(420);
  assert(t420 === '7m 0s', 'Running Pace', '420 seconds format', `Expected '7m 0s', got '${t420}'`, { totalSec: 420 });

  const t419_8 = formatRunningTime(419.8);
  assert(t419_8 === '7m 0s', 'Running Pace', '419.8 seconds rollover', `Expected '7m 0s', got '${t419_8}' (no 6m 60s)`, { totalSec: 419.8 });

  const t359_9 = formatRunningTime(359.9);
  assert(t359_9 === '6m 0s', 'Running Pace', '359.9 seconds rollover', `Expected '6m 0s', got '${t359_9}' (no 5m 60s)`, { totalSec: 359.9 });

  const p59_8 = formatRunningPace(59.8);
  assert(p59_8 === '1:00', 'Running Pace', '59.8 seconds pace rollover', `Expected '1:00', got '${p59_8}'`, { secs: 59.8 });

  // -------------------------------------------------------------
  // TEST 2: calculateMacros with mealsCount = 0
  // -------------------------------------------------------------
  const macroZero = calculateMacros(2000, 'fat_loss', 75, 0);
  assert(Number.isFinite(macroZero.perMeal.calories), 'Advanced Macros', 'mealsCount = 0 calories finite', `Calories per meal: ${macroZero.perMeal.calories}`, { mealsCount: 0 });
  assert(!isNaN(macroZero.perMeal.protein), 'Advanced Macros', 'mealsCount = 0 protein not NaN', `Protein per meal: ${macroZero.perMeal.protein}`, { mealsCount: 0 });
  assert(macroZero.perMeal.calories !== Infinity, 'Advanced Macros', 'mealsCount = 0 calories not Infinity', `Calories: ${macroZero.perMeal.calories}`, { mealsCount: 0 });

  const valMacroZero = validateCalculatorInputs('macros', { macroCalories: 2000, weightKg: 75, macroMeals: 0 });
  assert(!valMacroZero.isValid, 'Advanced Macros Validation', 'Prevent mealsCount = 0', `Validation correctly rejected mealsCount = 0: ${valMacroZero.errorMessage}`, { macroMeals: 0 });

  // -------------------------------------------------------------
  // TEST 3: calculateBodyRecomposition with Known TDEE = 2400
  // -------------------------------------------------------------
  const recompResult = calculateBodyRecomposition(80, 2400, 'intermediate', 'slight_deficit');
  assert(recompResult.maintenanceCalories === 2400, 'Body Recomposition', 'TDEE Maintenance Calories = 2400', `Expected 2400, got ${recompResult.maintenanceCalories}`, { tdee: 2400 });
  assert(recompResult.targetDailyCalories === 2040, 'Body Recomposition', '15% Deficit Target = 2040', `Expected 2040, got ${recompResult.targetDailyCalories}`, { tdee: 2400, preference: 'slight_deficit' });

  const recompMaint = calculateBodyRecomposition(80, 2400, 'intermediate', 'pure_maintenance');
  assert(recompMaint.targetDailyCalories === 2400, 'Body Recomposition', 'Iso-caloric Target = 2400', `Expected 2400, got ${recompMaint.targetDailyCalories}`, { tdee: 2400, preference: 'pure_maintenance' });

  const recompSurplus = calculateBodyRecomposition(80, 2400, 'intermediate', 'slight_surplus');
  assert(recompSurplus.targetDailyCalories === 2592, 'Body Recomposition', '+8% Surplus Target = 2592', `Expected 2592, got ${recompSurplus.targetDailyCalories}`, { tdee: 2400, preference: 'slight_surplus' });

  // -------------------------------------------------------------
  // TEST 4: Global English Number Formatting & Eastern/Persian Numeral Prohibition
  // -------------------------------------------------------------
  const fmtZero = formatNumber(0);
  assert(fmtZero === '0', 'Number Formatting', 'Zero format', `Expected '0', got '${fmtZero}'`, { val: 0 });

  const fmtLarge = formatNumber(1234567.89);
  assert(fmtLarge === '1,234,567.89', 'Number Formatting', 'Large number en-US separators', `Expected '1,234,567.89', got '${fmtLarge}'`, { val: 1234567.89 });

  const hasArabicDigits = containsEasternOrPersianDigits('٠١٢٣٤٥٦٧٨٩');
  assert(hasArabicDigits === true, 'Number Formatting', 'Eastern Arabic digits detected', 'Regex correctly caught ٠١٢٣٤٥٦٧٨٩', {});

  const hasPersianDigits = containsEasternOrPersianDigits('۰۱۲۳۴۵۶۷۸۹');
  assert(hasPersianDigits === true, 'Number Formatting', 'Persian digits detected', 'Regex correctly caught ۰۱۲۳۴۵۶۷۸۹', {});

  const fmtClean1 = !containsEasternOrPersianDigits(fmtLarge);
  assert(fmtClean1, 'Number Formatting', 'Output contains no Eastern Arabic or Persian digits', `Verified for '${fmtLarge}'`, { val: fmtLarge });

  const fmtClean2 = !containsEasternOrPersianDigits(formatNumber(2400));
  assert(fmtClean2, 'Number Formatting', 'TDEE 2400 contains only Western English digits', `Verified for '${formatNumber(2400)}'`, { val: 2400 });

  // -------------------------------------------------------------
  // TESTS 5 - 23: All 19 Calculators under Normal, Boundary, and Invalid Inputs
  // -------------------------------------------------------------

  // 1. TDEE
  const tdeeNorm = calculateTDEE('male', 30, 180, 80, 1.55);
  assert(tdeeNorm.tdee > 2000 && tdeeNorm.tdee < 3500, 'TDEE', 'Normal Input', `Computed TDEE: ${tdeeNorm.tdee}`, { age: 30, h: 180, w: 80 });
  const tdeeInvalid = validateCalculatorInputs('tdee', { age: 0, heightCm: -10, weightKg: NaN });
  assert(!tdeeInvalid.isValid, 'TDEE Validation', 'Invalid 0/neg/NaN Input', `Rejected: ${tdeeInvalid.errorMessage}`, { age: 0 });

  // 2. MACROS
  const macroNorm = calculateMacros(2500, 'maintenance', 80, 4);
  assert(macroNorm.proteinGrams > 0 && macroNorm.fatGrams > 0, 'Macros', 'Normal Input', `P: ${macroNorm.proteinGrams}g, F: ${macroNorm.fatGrams}g, C: ${macroNorm.carbGrams}g`, { cal: 2500 });
  const macroInv = validateCalculatorInputs('macros', { macroCalories: -500, weightKg: 80, macroMeals: 0 });
  assert(!macroInv.isValid, 'Macros Validation', 'Invalid negative cal & 0 meals', `Rejected: ${macroInv.errorMessage}`, { cal: -500 });

  // 3. NAVY BODY FAT
  const navyNorm = calculateNavyBodyFat('male', 180, 38, 85, 95, 80);
  assert(navyNorm.bodyFatPct > 5 && navyNorm.bodyFatPct < 40, 'Navy Body Fat', 'Normal Input Male', `BF%: ${navyNorm.bodyFatPct}%`, { waist: 85, neck: 38 });
  const navyIllogical = validateCalculatorInputs('navy_body_fat', { gender: 'male', heightCm: 180, neckCirc: 40, waistCirc: 38, hipCirc: 95 });
  assert(!navyIllogical.isValid, 'Navy Body Fat Validation', 'Illogical Male Waist <= Neck', `Rejected: ${navyIllogical.errorMessage}`, { waist: 38, neck: 40 });

  // 4. ONE REP MAX (1RM)
  const ormNorm = calculateOneRepMax(100, 5);
  assert(ormNorm.epley > 100 && ormNorm.brzycki > 100, 'One Rep Max', 'Normal Input', `Epley 1RM: ${ormNorm.epley} kg`, { weight: 100, reps: 5 });
  const ormInv = validateCalculatorInputs('one_rep_max', { liftWeight: 0, liftReps: 0 });
  assert(!ormInv.isValid, 'One Rep Max Validation', 'Invalid 0 weight & 0 reps', `Rejected: ${ormInv.errorMessage}`, { weight: 0, reps: 0 });

  // 5. HEART RATE ZONES
  const hrNorm = calculateTargetHeartRate(30, 60);
  assert(hrNorm.maxHRTanaka === 187 && hrNorm.zones.length === 5, 'Heart Rate Zones', 'Normal Input', `Max HR Tanaka: ${hrNorm.maxHRTanaka}`, { age: 30, rest: 60 });
  const hrInv = validateCalculatorInputs('heart_rate_zones', { age: 120, restingHeartRate: 190 });
  assert(!hrInv.isValid, 'Heart Rate Zones Validation', 'Resting HR > Max HR or age 120', `Rejected: ${hrInv.errorMessage}`, { rest: 190 });

  // 6. RUNNING PACE
  const paceNorm = calculateRunningPace(10, 0, 50, 0);
  assert(paceNorm.pacePerKm === '5:00 /km' && paceNorm.speedKmh === 12, 'Running Pace', 'Normal 10k in 50m', `Pace: ${paceNorm.pacePerKm}, Speed: ${paceNorm.speedKmh} km/h`, { dist: 10, m: 50 });
  const paceInv = validateCalculatorInputs('running_pace', { runDistance: 0, runHours: 0, runMinutes: 0, runSeconds: 2 });
  assert(!paceInv.isValid, 'Running Pace Validation', 'Distance 0 and <5s duration', `Rejected: ${paceInv.errorMessage}`, { dist: 0 });

  // 7. INTERMITTENT FASTING
  const fastNorm = calculateIntermittentFasting('16_8', '20:00');
  assert(fastNorm.fastingHours === 16 && fastNorm.eatingHours === 8, 'Intermittent Fasting', 'Normal 16:8 Protocol', `Fast: ${fastNorm.fastingHours}h, Eat: ${fastNorm.eatingHours}h`, { protocol: '16_8', start: '20:00' });
  const fastInv = validateCalculatorInputs('intermittent_fasting', { fastStartTime: 'invalid_time' });
  assert(!fastInv.isValid, 'Intermittent Fasting Validation', 'Malformed Time String', `Rejected: ${fastInv.errorMessage}`, { start: 'invalid_time' });

  // 8. HYDRATION INTAKE
  const hydraNorm = calculateHydration(75, 60, 'moderate', 'temperate');
  assert(hydraNorm.totalLiters > 2.5, 'Hydration', 'Normal 75kg 60m workout', `Total Daily: ${hydraNorm.totalLiters} L`, { weight: 75, workout: 60 });
  const hydraInv = validateCalculatorInputs('hydration', { weightKg: 10, workoutDuration: -30 });
  assert(!hydraInv.isValid, 'Hydration Validation', 'Underweight 10kg & negative workout', `Rejected: ${hydraInv.errorMessage}`, { weight: 10 });

  // 9. CREATINE
  const creaNorm = calculateCreatine(80, 'fitness');
  assert(creaNorm.maintenanceDailyGrams >= 3, 'Creatine', 'Normal 80kg Maintenance', `Daily: ${creaNorm.maintenanceDailyGrams}g`, { weight: 80 });
  const creaInv = validateCalculatorInputs('creatine', { weightKg: 0 });
  assert(!creaInv.isValid, 'Creatine Validation', 'Zero weight', `Rejected: ${creaInv.errorMessage}`, { weight: 0 });

  // 10. LEAN BODY MASS / FFMI
  const ffmiNorm = calculateFFMI(80, 180, 15);
  assert(ffmiNorm.normalizedFfmi > 15 && ffmiNorm.normalizedFfmi < 28, 'FFMI', 'Normal 80kg 180cm 15% BF', `Normalized FFMI: ${ffmiNorm.normalizedFfmi}`, { w: 80, h: 180, bf: 15 });
  const ffmiInv = validateCalculatorInputs('ffmi', { weightKg: 80, heightCm: 180, bodyFatPct: 95 });
  assert(!ffmiInv.isValid, 'FFMI Validation', 'Body fat 95%', `Rejected: ${ffmiInv.errorMessage}`, { bf: 95 });

  // 11. IDEAL BODY WEIGHT
  const ibwNorm = calculateIdealBodyWeight('male', 180, 17);
  assert(ibwNorm.robinsonKg > 60 && ibwNorm.robinsonKg < 90, 'Ideal Body Weight', 'Normal 180cm Male', `Robinson: ${ibwNorm.robinsonKg} kg`, { h: 180 });
  const ibwInv = validateCalculatorInputs('ideal_weight', { heightCm: 50 });
  assert(!ibwInv.isValid, 'Ideal Body Weight Validation', 'Height 50 cm', `Rejected: ${ibwInv.errorMessage}`, { h: 50 });

  // 12. MAXIMUM MUSCULAR POTENTIAL
  const mmpNorm = calculateMuscularPotential(180, 18, 22);
  assert(mmpNorm.caseyButtMaxWeightAt10PctKg > 70 && mmpNorm.caseyButtMaxWeightAt10PctKg < 110, 'Muscular Potential', 'Normal Casey Butt', `Max BW at 10% BF: ${mmpNorm.caseyButtMaxWeightAt10PctKg} kg`, { h: 180, w: 18, a: 22 });
  const mmpInv = validateCalculatorInputs('muscular_potential', { heightCm: 180, wristCirc: 5, ankleCirc: 10, targetBf: 2 });
  assert(!mmpInv.isValid, 'Muscular Potential Validation', 'Illogical wrist/ankle/BF', `Rejected: ${mmpInv.errorMessage}`, { wrist: 5 });

  // 13. WAIST TO HEIGHT RATIO (WHtR)
  const whtrNorm = calculateWHtR(80, 180);
  assert(whtrNorm.whtr === 0.44 && whtrNorm.riskLevel === 'Low', 'WHtR', 'Normal 80cm waist / 180cm height', `Ratio: ${whtrNorm.whtr}`, { waist: 80, h: 180 });
  const whtrInv = validateCalculatorInputs('whtr', { heightCm: 0, waistCirc: 80 });
  assert(!whtrInv.isValid, 'WHtR Validation', 'Height 0 cm', `Rejected: ${whtrInv.errorMessage}`, { h: 0 });

  // 14. CALORIES BURNED
  const burnNorm = calculateCaloriesBurned(8.0, 45, 75);
  assert(burnNorm.totalCalories > 300 && burnNorm.totalCalories < 600, 'Calories Burned', 'Normal 8.0 MET 75kg 45m', `Burned: ${burnNorm.totalCalories} kcal`, { met: 8, w: 75, d: 45 });
  const burnInv = validateCalculatorInputs('calories_burned', { weightKg: 75, exerciseDurationMin: 0 });
  assert(!burnInv.isValid, 'Calories Burned Validation', 'Duration 0 min', `Rejected: ${burnInv.errorMessage}`, { d: 0 });

  // 15. SLEEP CYCLES
  const sleepNorm = calculateSleepCycles('wake_at', '07:00');
  assert(sleepNorm.recommendedTimes.length > 0, 'Sleep Cycles', 'Normal Wake at 07:00', `Optimal bedtime: ${sleepNorm.recommendedTimes[0].formattedTime}`, { wake: '07:00' });
  const sleepInv = validateCalculatorInputs('sleep_cycles', { sleepTime: '25:99' });
  assert(!sleepInv.isValid, 'Sleep Cycles Validation', 'Invalid clock 25:99', `Rejected: ${sleepInv.errorMessage}`, { time: '25:99' });

  // 16. BMR COMPARATIVE
  const bmrNorm = calculateBMRComparative('male', 28, 178, 78, 14);
  assert(bmrNorm.mifflinStJeor > 1500 && bmrNorm.katchMcArdle > 1500, 'BMR Comparative', 'Normal 28y 78kg 178cm', `Mifflin: ${bmrNorm.mifflinStJeor}, Katch: ${bmrNorm.katchMcArdle}`, { age: 28 });
  const bmrInv = validateCalculatorInputs('bmr_comparative', { age: -5, heightCm: 178, weightKg: 78 });
  assert(!bmrInv.isValid, 'BMR Comparative Validation', 'Negative age', `Rejected: ${bmrInv.errorMessage}`, { age: -5 });

  // 17. PROTEIN TIMING & DISTRIBUTION
  const protNorm = calculateProteinDistribution(80, 'hypertrophy', 4);
  assert(protNorm.totalDailyGrams === 176 && protNorm.meals.length === 4, 'Protein Timing', 'Normal 80kg 4 meals', `Total: ${protNorm.totalDailyGrams}g, Meals: ${protNorm.meals.length}`, { w: 80, m: 4 });
  const protInv = validateCalculatorInputs('protein_timing', { weightKg: 80, proteinMeals: 0 });
  assert(!protInv.isValid, 'Protein Timing Validation', 'Zero meals', `Rejected: ${protInv.errorMessage}`, { m: 0 });

  // 18. BODY RECOMPOSITION
  const recompNorm = calculateBodyRecomposition(80, 2400, 'beginner', 'slight_deficit');
  assert(recompNorm.targetDailyCalories === 2040 && recompNorm.dailyProteinGrams === 184, 'Body Recomposition', 'Normal 80kg 2400 TDEE -15%', `Target: ${recompNorm.targetDailyCalories}, Protein: ${recompNorm.dailyProteinGrams}g`, { tdee: 2400 });
  const recompInv = validateCalculatorInputs('body_recomposition', { weightKg: -80, recompTdee: 200 });
  assert(!recompInv.isValid, 'Body Recomposition Validation', 'Negative weight & 200 TDEE', `Rejected: ${recompInv.errorMessage}`, { w: -80, tdee: 200 });

  // 19. HRR ZONES (Karvonen)
  const hrrNorm = calculateHRR(30, 55);
  assert(hrrNorm.hrr === 132 && hrrNorm.zones.length === 5, 'HRR Zones', 'Normal 30y resting 55 BPM', `HRR: ${hrrNorm.hrr} BPM`, { age: 30, rest: 55 });
  const hrrInv = validateCalculatorInputs('hrr_zones', { age: 30, restingHeartRate: 200 });
  assert(!hrrInv.isValid, 'HRR Zones Validation', 'Resting HR 200 > Max HR 187', `Rejected: ${hrrInv.errorMessage}`, { rest: 200 });

  console.log('\n----------------------------------------------------------------');
  console.log('AUTOMATED VERIFICATION SUMMARY:');
  console.log('----------------------------------------------------------------');
  const passCount = testLogs.filter((t) => t.status === 'PASS').length;
  const failCount = testLogs.filter((t) => t.status === 'FAIL').length;
  console.log(`TOTAL AUDIT CHECKS: ${testLogs.length}`);
  console.log(`PASSED: ${passCount}`);
  console.log(`FAILED: ${failCount}`);

  testLogs.forEach((t, i) => {
    console.log(`[${t.status}] #${i + 1} | Tool: ${t.toolName.padEnd(28)} | Test: ${t.testCase.padEnd(30)} | ${t.detail}`);
  });

  return { passCount, failCount, total: testLogs.length, logs: testLogs };
}

// Auto-run if executed directly via tsx
if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('calculatorEngines.test.ts')) {
  runFullTestSuite();
}
