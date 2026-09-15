/**
 * Centralized Input Validation Engine for ZenFit Tools
 *
 * Enforces strict scientific and physiological guardrails across all 19 calculators.
 * Prevents zero, negative numbers, NaN, Infinity, and anatomically illogical values
 * before executing any computation.
 */

export interface ValidationState {
  gender?: 'male' | 'female';
  age?: number;
  weight?: number;
  weightKg?: number;
  height?: number;
  heightCm?: number;
  unitSystem?: 'metric' | 'imperial';
  bodyFatPct?: number;
  activityMultiplier?: number;
  macroCalories?: number;
  macroGoal?: string;
  macroMeals?: number;
  neckCirc?: number;
  waistCirc?: number;
  hipCirc?: number;
  liftWeight?: number;
  liftReps?: number;
  restingHeartRate?: number;
  runDistance?: number;
  runHours?: number;
  runMinutes?: number;
  runSeconds?: number;
  fastProtocol?: string;
  fastStartTime?: string;
  workoutDuration?: number;
  exerciseDurationMin?: number;
  wristCirc?: number;
  ankleCirc?: number;
  targetBf?: number;
  proteinMeals?: number;
  recompTdee?: number;
  sleepTime?: string;
  [key: string]: any;
}

export interface ValidationResult {
  isValid: boolean;
  errorTitle?: string;
  errorMessage?: string;
  fieldErrors: Record<string, string>;
}

export function validateCalculatorInputs(
  calcId: string,
  state: ValidationState
): ValidationResult {
  const fieldErrors: Record<string, string> = {};

  const isInvalidNum = (val: any) =>
    val === undefined || val === null || val === '' || isNaN(Number(val)) || !Number.isFinite(Number(val));

  const isValidClockTime = (timeStr: any) => {
    if (!timeStr || typeof timeStr !== 'string') return false;
    const parts = timeStr.split(':');
    if (parts.length !== 2) return false;
    const h = Number(parts[0]);
    const m = Number(parts[1]);
    return Number.isInteger(h) && Number.isInteger(m) && h >= 0 && h < 24 && m >= 0 && m < 60;
  };

  // 1. TDEE
  if (calcId === 'tdee') {
    if (isInvalidNum(state.age) || Number(state.age) < 15 || Number(state.age) > 100) {
      fieldErrors.age = 'Age must be between 15 and 100 years.';
    }
    if (isInvalidNum(state.heightCm) || Number(state.heightCm) < 100 || Number(state.heightCm) > 250) {
      fieldErrors.height = 'Height must be between 100 cm and 250 cm (39 - 98 in).';
    }
    if (isInvalidNum(state.weightKg) || Number(state.weightKg) < 30 || Number(state.weightKg) > 300) {
      fieldErrors.weight = 'Weight must be between 30 kg and 300 kg (66 - 660 lbs).';
    }
    if (state.bodyFatPct !== undefined && !isInvalidNum(state.bodyFatPct)) {
      if (Number(state.bodyFatPct) < 3 || Number(state.bodyFatPct) > 60) {
        fieldErrors.bodyFatPct = 'Body fat percentage must be between 3% and 60%.';
      }
    }
  }

  // 2. MACROS
  else if (calcId === 'macros') {
    if (isInvalidNum(state.macroCalories) || Number(state.macroCalories) < 800 || Number(state.macroCalories) > 10000) {
      fieldErrors.macroCalories = 'Daily calories must be between 800 and 10,000 kcal.';
    }
    if (isInvalidNum(state.weightKg) || Number(state.weightKg) < 30 || Number(state.weightKg) > 300) {
      fieldErrors.weight = 'Weight must be between 30 kg and 300 kg.';
    }
    if (isInvalidNum(state.macroMeals) || Number(state.macroMeals) <= 0 || Number(state.macroMeals) > 10) {
      fieldErrors.macroMeals = 'Daily meals count must be between 1 and 10 meals/day (cannot be 0).';
    }
  }

  // 3. US NAVY BODY FAT
  else if (calcId === 'navy_body_fat') {
    if (isInvalidNum(state.heightCm) || Number(state.heightCm) < 100 || Number(state.heightCm) > 250) {
      fieldErrors.height = 'Height must be between 100 cm and 250 cm.';
    }
    if (isInvalidNum(state.neckCirc) || Number(state.neckCirc) < 20 || Number(state.neckCirc) > 80) {
      fieldErrors.neckCirc = 'Neck circumference must be between 20 cm and 80 cm.';
    }
    if (isInvalidNum(state.waistCirc) || Number(state.waistCirc) < 40 || Number(state.waistCirc) > 220) {
      fieldErrors.waistCirc = 'Waist circumference must be between 40 cm and 220 cm.';
    }
    if (state.gender === 'female') {
      if (isInvalidNum(state.hipCirc) || Number(state.hipCirc) < 40 || Number(state.hipCirc) > 240) {
        fieldErrors.hipCirc = 'Hip circumference must be between 40 cm and 240 cm.';
      }
      if (!fieldErrors.waistCirc && !fieldErrors.hipCirc && !fieldErrors.neckCirc) {
        if (Number(state.waistCirc) + Number(state.hipCirc) <= Number(state.neckCirc) + 2) {
          fieldErrors.waistCirc = 'Combined waist and hip circumference must exceed neck circumference.';
        }
      }
    } else {
      if (!fieldErrors.waistCirc && !fieldErrors.neckCirc) {
        if (Number(state.waistCirc) <= Number(state.neckCirc) + 1) {
          fieldErrors.waistCirc = 'Waist circumference must be greater than neck circumference.';
        }
      }
    }
  }

  // 4. ONE REP MAX (1RM)
  else if (calcId === 'one_rep_max') {
    if (isInvalidNum(state.liftWeight) || Number(state.liftWeight) <= 0 || Number(state.liftWeight) > 700) {
      fieldErrors.liftWeight = 'Weight lifted must be greater than 0 and up to 700 kg/lbs.';
    }
    if (isInvalidNum(state.liftReps) || Number(state.liftReps) < 1 || Number(state.liftReps) > 15) {
      fieldErrors.liftReps = 'Repetitions must be an integer between 1 and 15 reps.';
    }
  }

  // 5. HEART RATE ZONES
  else if (calcId === 'heart_rate_zones') {
    if (isInvalidNum(state.age) || Number(state.age) < 15 || Number(state.age) > 100) {
      fieldErrors.age = 'Age must be between 15 and 100 years.';
    }
    const maxHr = Math.round(208 - 0.7 * (Number(state.age) || 28));
    if (isInvalidNum(state.restingHeartRate) || Number(state.restingHeartRate) < 35 || Number(state.restingHeartRate) > 120) {
      fieldErrors.restingHeartRate = 'Resting heart rate must be between 35 and 120 BPM.';
    } else if (Number(state.restingHeartRate) >= maxHr) {
      fieldErrors.restingHeartRate = `Resting heart rate must be lower than maximum predicted heart rate (${maxHr} BPM).`;
    }
  }

  // 6. RUNNING PACE & RACE PREDICTOR
  else if (calcId === 'running_pace') {
    if (isInvalidNum(state.runDistance) || Number(state.runDistance) <= 0 || Number(state.runDistance) > 300) {
      fieldErrors.runDistance = 'Running distance must be greater than 0 km/mi (up to 300).';
    }
    const totalSec = (Number(state.runHours) || 0) * 3600 + (Number(state.runMinutes) || 0) * 60 + (Number(state.runSeconds) || 0);
    if (totalSec < 5) {
      fieldErrors.runTime = 'Total running duration must be at least 5 seconds.';
    }
  }

  // 7. INTERMITTENT FASTING
  else if (calcId === 'intermittent_fasting') {
    if (!isValidClockTime(state.fastStartTime)) {
      fieldErrors.fastStartTime = 'Valid start time in HH:MM format (00:00 - 23:59) is required.';
    }
  }

  // 8. HYDRATION INTAKE
  else if (calcId === 'hydration') {
    if (isInvalidNum(state.weightKg) || Number(state.weightKg) < 30 || Number(state.weightKg) > 300) {
      fieldErrors.weight = 'Weight must be between 30 kg and 300 kg.';
    }
    if (isInvalidNum(state.workoutDuration) || Number(state.workoutDuration) < 0 || Number(state.workoutDuration) > 480) {
      fieldErrors.workoutDuration = 'Workout duration must be between 0 and 480 minutes.';
    }
  }

  // 9. CREATINE DOSAGE
  else if (calcId === 'creatine') {
    if (isInvalidNum(state.weightKg) || Number(state.weightKg) < 30 || Number(state.weightKg) > 300) {
      fieldErrors.weight = 'Weight must be between 30 kg and 300 kg.';
    }
  }

  // 10. LEAN BODY MASS / FFMI
  else if (calcId === 'ffmi') {
    if (isInvalidNum(state.weightKg) || Number(state.weightKg) < 30 || Number(state.weightKg) > 300) {
      fieldErrors.weight = 'Weight must be between 30 kg and 300 kg.';
    }
    if (isInvalidNum(state.heightCm) || Number(state.heightCm) < 100 || Number(state.heightCm) > 250) {
      fieldErrors.height = 'Height must be between 100 cm and 250 cm.';
    }
    if (isInvalidNum(state.bodyFatPct) || Number(state.bodyFatPct) < 3 || Number(state.bodyFatPct) > 60) {
      fieldErrors.bodyFatPct = 'Body fat percentage must be between 3% and 60%.';
    }
  }

  // 11. IDEAL BODY WEIGHT
  else if (calcId === 'ideal_weight') {
    if (isInvalidNum(state.heightCm) || Number(state.heightCm) < 120 || Number(state.heightCm) > 250) {
      fieldErrors.height = 'Height must be between 120 cm and 250 cm.';
    }
    if (state.wristCirc !== undefined && !isInvalidNum(state.wristCirc)) {
      if (Number(state.wristCirc) < 10 || Number(state.wristCirc) > 30) {
        fieldErrors.wristCirc = 'Wrist circumference must be between 10 cm and 30 cm.';
      }
    }
  }

  // 12. MAXIMUM MUSCULAR POTENTIAL (Casey Butt)
  else if (calcId === 'muscular_potential') {
    if (isInvalidNum(state.heightCm) || Number(state.heightCm) < 120 || Number(state.heightCm) > 250) {
      fieldErrors.height = 'Height must be between 120 cm and 250 cm.';
    }
    if (isInvalidNum(state.wristCirc) || Number(state.wristCirc) < 12 || Number(state.wristCirc) > 26) {
      fieldErrors.wristCirc = 'Wrist circumference must be between 12 cm and 26 cm.';
    }
    if (isInvalidNum(state.ankleCirc) || Number(state.ankleCirc) < 15 || Number(state.ankleCirc) > 35) {
      fieldErrors.ankleCirc = 'Ankle circumference must be between 15 cm and 35 cm.';
    }
    if (isInvalidNum(state.targetBf) || Number(state.targetBf) < 4 || Number(state.targetBf) > 30) {
      fieldErrors.targetBf = 'Target body fat must be between 4% and 30%.';
    }
  }

  // 13. WAIST-TO-HEIGHT RATIO (WHtR)
  else if (calcId === 'whtr') {
    if (isInvalidNum(state.heightCm) || Number(state.heightCm) < 100 || Number(state.heightCm) > 250) {
      fieldErrors.height = 'Height must be between 100 cm and 250 cm.';
    }
    if (isInvalidNum(state.waistCirc) || Number(state.waistCirc) < 40 || Number(state.waistCirc) > 220) {
      fieldErrors.waistCirc = 'Waist circumference must be between 40 cm and 220 cm.';
    }
  }

  // 14. CALORIES BURNED PER EXERCISE
  else if (calcId === 'calories_burned') {
    if (isInvalidNum(state.weightKg) || Number(state.weightKg) < 30 || Number(state.weightKg) > 300) {
      fieldErrors.weight = 'Weight must be between 30 kg and 300 kg.';
    }
    if (isInvalidNum(state.exerciseDurationMin) || Number(state.exerciseDurationMin) <= 0 || Number(state.exerciseDurationMin) > 600) {
      fieldErrors.exerciseDurationMin = 'Exercise duration must be between 1 and 600 minutes.';
    }
  }

  // 15. SLEEP CYCLES
  else if (calcId === 'sleep_cycles') {
    if (!isValidClockTime(state.sleepTime)) {
      fieldErrors.sleepTime = 'A valid time string in HH:MM format (00:00 - 23:59) is required.';
    }
  }

  // 16. BMR COMPARATIVE
  else if (calcId === 'bmr_comparative') {
    if (isInvalidNum(state.age) || Number(state.age) < 15 || Number(state.age) > 100) {
      fieldErrors.age = 'Age must be between 15 and 100 years.';
    }
    if (isInvalidNum(state.heightCm) || Number(state.heightCm) < 100 || Number(state.heightCm) > 250) {
      fieldErrors.height = 'Height must be between 100 cm and 250 cm.';
    }
    if (isInvalidNum(state.weightKg) || Number(state.weightKg) < 30 || Number(state.weightKg) > 300) {
      fieldErrors.weight = 'Weight must be between 30 kg and 300 kg.';
    }
    if (state.bodyFatPct !== undefined && !isInvalidNum(state.bodyFatPct)) {
      if (Number(state.bodyFatPct) < 3 || Number(state.bodyFatPct) > 60) {
        fieldErrors.bodyFatPct = 'Body fat percentage must be between 3% and 60%.';
      }
    }
  }

  // 17. PROTEIN TIMING & DISTRIBUTION
  else if (calcId === 'protein_timing') {
    if (isInvalidNum(state.weightKg) || Number(state.weightKg) < 30 || Number(state.weightKg) > 300) {
      fieldErrors.weight = 'Weight must be between 30 kg and 300 kg.';
    }
    if (isInvalidNum(state.proteinMeals) || Number(state.proteinMeals) <= 0 || Number(state.proteinMeals) > 8) {
      fieldErrors.proteinMeals = 'Meals distribution must be between 1 and 8 bolus meals/day (cannot be 0).';
    }
  }

  // 18. BODY RECOMPOSITION
  else if (calcId === 'body_recomposition') {
    if (isInvalidNum(state.weightKg) || Number(state.weightKg) < 30 || Number(state.weightKg) > 300) {
      fieldErrors.weight = 'Weight must be between 30 kg and 300 kg.';
    }
    if (state.recompTdee !== undefined && (isInvalidNum(state.recompTdee) || Number(state.recompTdee) < 800 || Number(state.recompTdee) > 8000)) {
      fieldErrors.recompTdee = 'Baseline maintenance TDEE must be between 800 and 8,000 kcal/day.';
    }
  }

  // 19. HRR ZONES (Karvonen)
  else if (calcId === 'hrr_zones') {
    if (isInvalidNum(state.age) || Number(state.age) < 15 || Number(state.age) > 100) {
      fieldErrors.age = 'Age must be between 15 and 100 years.';
    }
    const maxHr = Math.round(208 - 0.7 * (Number(state.age) || 28));
    if (isInvalidNum(state.restingHeartRate) || Number(state.restingHeartRate) < 35 || Number(state.restingHeartRate) > 120) {
      fieldErrors.restingHeartRate = 'Resting heart rate must be between 35 and 120 BPM.';
    } else if (Number(state.restingHeartRate) >= maxHr) {
      fieldErrors.restingHeartRate = `Resting heart rate (${state.restingHeartRate} BPM) must be lower than maximum predicted heart rate (${maxHr} BPM).`;
    }
  }

  const errorKeys = Object.keys(fieldErrors);
  const isValid = errorKeys.length === 0;

  return {
    isValid,
    errorTitle: isValid ? undefined : 'Invalid Input Detected',
    errorMessage: isValid ? undefined : fieldErrors[errorKeys[0]],
    fieldErrors,
  };
}
