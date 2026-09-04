import React, { useState, useId } from 'react';
import {
  CalculatorMeta,
  UnitSystem,
  FAQItem,
} from '../types';
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
} from '../utils/calculatorEngines';
import { AdSenseSlot } from './AdSenseSlot';
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Scale,
  Flame,
  Activity,
  Heart,
  Droplet,
  Clock,
  Zap,
} from 'lucide-react';

interface CalculatorWorkspaceProps {
  calc: CalculatorMeta;
  unitSystem: UnitSystem;
  onToggleUnit: () => void;
  onOpenContact: () => void;
}

export const CalculatorWorkspace: React.FC<CalculatorWorkspaceProps> = ({
  calc,
  unitSystem,
  onToggleUnit,
  onOpenContact,
}) => {
  // Shared common states
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  // Weight stored internally in display units (kg if metric, lbs if imperial)
  const [weight, setWeight] = useState<number>(unitSystem === 'metric' ? 78 : 172);
  // Height stored in display units (cm if metric, inches if imperial)
  const [height, setHeight] = useState<number>(unitSystem === 'metric' ? 178 : 70);
  const [bodyFatPct, setBodyFatPct] = useState<number>(15);

  // TDEE specific
  const [activityMultiplier, setActivityMultiplier] = useState<number>(1.55);

  // Macros specific
  const [macroCalories, setMacroCalories] = useState<number>(2400);
  const [macroGoal, setMacroGoal] = useState<'fat_loss' | 'maintenance' | 'muscle_gain' | 'keto' | 'endurance'>('fat_loss');
  const [macroMeals, setMacroMeals] = useState<number>(4);

  // Navy Body Fat specific
  const [neckCirc, setNeckCirc] = useState<number>(unitSystem === 'metric' ? 39 : 15.5);
  const [waistCirc, setWaistCirc] = useState<number>(unitSystem === 'metric' ? 84 : 33);
  const [hipCirc, setHipCirc] = useState<number>(unitSystem === 'metric' ? 98 : 38.5);

  // 1RM specific
  const [liftWeight, setLiftWeight] = useState<number>(unitSystem === 'metric' ? 100 : 225);
  const [liftReps, setLiftReps] = useState<number>(5);

  // Target HR & HRR specific
  const [restingHeartRate, setRestingHeartRate] = useState<number>(62);

  // Running Pace specific
  const [runDistance, setRunDistance] = useState<number>(unitSystem === 'metric' ? 10 : 6.2);
  const [runHours, setRunHours] = useState<number>(0);
  const [runMinutes, setRunMinutes] = useState<number>(48);
  const [runSeconds, setRunSeconds] = useState<number>(30);

  // Fasting specific
  const [fastProtocol, setFastProtocol] = useState<'16_8' | '18_6' | '20_4' | '24_0' | '12_12'>('16_8');
  const [fastStartTime, setFastStartTime] = useState<string>('20:00');

  // Hydration specific
  const [workoutDuration, setWorkoutDuration] = useState<number>(60);
  const [sweatIntensity, setSweatIntensity] = useState<'light' | 'moderate' | 'heavy'>('moderate');
  const [climate, setClimate] = useState<'temperate' | 'hot_humid' | 'dry_arid' | 'cold_altitude'>('temperate');

  // Creatine specific
  const [creatineIntensity, setCreatineIntensity] = useState<'fitness' | 'bodybuilding_powerlifting'>('fitness');

  // Ideal weight & Muscular Potential specific
  const [wristCirc, setWristCirc] = useState<number>(unitSystem === 'metric' ? 17.5 : 7.0);
  const [ankleCirc, setAnkleCirc] = useState<number>(unitSystem === 'metric' ? 22.5 : 8.8);

  // Exercise Calorie specific
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>('heavy_lifting');
  const [exerciseDurationMin, setExerciseDurationMin] = useState<number>(45);

  // Sleep Cycle specific
  const [sleepMode, setSleepMode] = useState<'wake_at' | 'sleep_now'>('wake_at');
  const [sleepTime, setSleepTime] = useState<string>('07:00');

  // Protein timing specific
  const [proteinGoal, setProteinGoal] = useState<'hypertrophy' | 'fat_loss' | 'maintenance' | 'endurance'>('hypertrophy');
  const [proteinMeals, setProteinMeals] = useState<number>(4);

  // Recomp specific
  const [recompPreference, setRecompPreference] = useState<'slight_deficit' | 'pure_maintenance' | 'slight_surplus'>('pure_maintenance');
  const [recompExperience, setRecompExperience] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  // UI state
  const [copied, setCopied] = useState<boolean>(false);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Normalize weight to kg and height to cm for internal calculations
  const weightKg = unitSystem === 'metric' ? weight : weight * 0.453592;
  const heightCm = unitSystem === 'metric' ? height : height * 2.54;
  const neckCm = unitSystem === 'metric' ? neckCirc : neckCirc * 2.54;
  const waistCm = unitSystem === 'metric' ? waistCirc : waistCirc * 2.54;
  const hipCm = unitSystem === 'metric' ? hipCirc : hipCirc * 2.54;
  const wristCm = unitSystem === 'metric' ? wristCirc : wristCirc * 2.54;
  const ankleCm = unitSystem === 'metric' ? ankleCirc : ankleCirc * 2.54;
  const liftKg = unitSystem === 'metric' ? liftWeight : liftWeight * 0.453592;
  const runDistKm = unitSystem === 'metric' ? runDistance : runDistance * 1.60934;

  const toggleFaq = (idx: number) => {
    setExpandedFaqIndex(expandedFaqIndex === idx ? null : idx);
  };

  const handleCopyResults = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Structured Data Schema for Google AdSense & SEO compliance
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: calc.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div id="calculator-workspace" className="w-full bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Dynamic SEO JSON-LD injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Workspace Breadcrumbs & Top Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="uppercase tracking-wider">ZenFit Tools</span>
            <span>/</span>
            <span className="capitalize text-amber-600 font-bold">{calc.category.replace('_', ' ')}</span>
            <span>/</span>
            <span className="text-slate-800">{calc.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300/60">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              {calc.badge}
            </span>
            <button
              onClick={onToggleUnit}
              className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-300 rounded-full text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
            >
              <Scale className="w-3.5 h-3.5 text-amber-600" />
              <span>{unitSystem === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lb/in)'}</span>
            </button>
          </div>
        </div>

        {/* Calculator Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            {calc.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed mb-4">
            {calc.shortDescription}
          </p>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-mono">
            <FileCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Formula: {calc.formulaSummary}</span>
          </div>
        </div>

        {/* Main Computation Grid: Inputs on Left, Real-Time Results on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Inputs Column */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Input Parameters
              </h3>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {unitSystem === 'metric' ? 'Metric' : 'Imperial'}
              </span>
            </div>

            <div className="space-y-4">
              {/* Gender selector for applicable calculators */}
              {['tdee', 'navy_body_fat', 'ideal_weight', 'bmr_comparative'].includes(calc.id) && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Biological Sex
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                        gender === 'male'
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                        gender === 'female'
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>
              )}

              {/* Age input */}
              {['tdee', 'heart_rate_zones', 'bmr_comparative', 'hrr_zones'].includes(calc.id) && (
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <span>Age</span>
                    <span className="text-amber-600 font-mono">{age} yrs</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={85}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              )}

              {/* Weight Input */}
              {['tdee', 'macros', 'navy_body_fat', 'hydration', 'creatine', 'ffmi', 'calories_burned', 'bmr_comparative', 'protein_timing', 'body_recomposition'].includes(calc.id) && (
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <span>Body Weight</span>
                    <span className="text-amber-600 font-mono">
                      {weight} {unitSystem === 'metric' ? 'kg' : 'lbs'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step={0.5}
                      value={weight}
                      onChange={(e) => setWeight(Math.max(30, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    <span className="text-xs font-bold text-slate-500 uppercase min-w-[36px]">
                      {unitSystem === 'metric' ? 'kg' : 'lbs'}
                    </span>
                  </div>
                </div>
              )}

              {/* Height Input */}
              {['tdee', 'navy_body_fat', 'ffmi', 'ideal_weight', 'muscular_potential', 'whtr', 'bmr_comparative'].includes(calc.id) && (
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <span>Height</span>
                    <span className="text-amber-600 font-mono">
                      {height} {unitSystem === 'metric' ? 'cm' : 'in'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step={1}
                      value={height}
                      onChange={(e) => setHeight(Math.max(100, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    <span className="text-xs font-bold text-slate-500 uppercase min-w-[36px]">
                      {unitSystem === 'metric' ? 'cm' : 'in'}
                    </span>
                  </div>
                </div>
              )}

              {/* Body Fat Percentage Input */}
              {['tdee', 'ffmi', 'bmr_comparative', 'body_recomposition'].includes(calc.id) && (
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <span>Body Fat Percentage (Optional / Estimate)</span>
                    <span className="text-amber-600 font-mono">{bodyFatPct}%</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={45}
                    step={0.5}
                    value={bodyFatPct}
                    onChange={(e) => setBodyFatPct(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              )}

              {/* TDEE Activity Multiplier */}
              {calc.id === 'tdee' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Physical Activity Level
                  </label>
                  <select
                    value={activityMultiplier}
                    onChange={(e) => setActivityMultiplier(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value={1.2}>Sedentary (Desk job, little to no exercise)</option>
                    <option value={1.375}>Lightly Active (Light exercise 1-3 days/week)</option>
                    <option value={1.55}>Moderately Active (Moderate exercise 3-5 days/week)</option>
                    <option value={1.725}>Very Active (Hard exercise 6-7 days/week)</option>
                    <option value={1.9}>Extra Active (Twice-daily training, physical labor)</option>
                  </select>
                </div>
              )}

              {/* Macros Specific */}
              {calc.id === 'macros' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Target Daily Calories
                    </label>
                    <input
                      type="number"
                      step={50}
                      value={macroCalories}
                      onChange={(e) => setMacroCalories(Math.max(1000, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Macronutrient Protocol Goal
                    </label>
                    <select
                      value={macroGoal}
                      onChange={(e) => setMacroGoal(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="fat_loss">Fat Loss / Caloric Deficit (High Protein)</option>
                      <option value="maintenance">Maintenance & Longevity (Balanced 30/30/40)</option>
                      <option value="muscle_gain">Hypertrophy / Lean Bulking (Carb Rich)</option>
                      <option value="keto">Ketogenic (70% Fat, 25% Protein, 5% Carb)</option>
                      <option value="endurance">Endurance Athlete (55% Carb Energy)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Daily Meals Split
                    </label>
                    <select
                      value={macroMeals}
                      onChange={(e) => setMacroMeals(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value={3}>3 Meals / Day</option>
                      <option value={4}>4 Meals / Day (Recommended)</option>
                      <option value={5}>5 Meals / Day</option>
                      <option value={6}>6 Small Feeds / Day</option>
                    </select>
                  </div>
                </>
              )}

              {/* Navy Body Fat circumferences */}
              {calc.id === 'navy_body_fat' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Neck Circumference ({unitSystem === 'metric' ? 'cm' : 'in'})
                    </label>
                    <input
                      type="number"
                      step={0.2}
                      value={neckCirc}
                      onChange={(e) => setNeckCirc(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Waist Circumference ({unitSystem === 'metric' ? 'cm' : 'in'})
                    </label>
                    <input
                      type="number"
                      step={0.5}
                      value={waistCirc}
                      onChange={(e) => setWaistCirc(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  {gender === 'female' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Hip Circumference ({unitSystem === 'metric' ? 'cm' : 'in'})
                      </label>
                      <input
                        type="number"
                        step={0.5}
                        value={hipCirc}
                        onChange={(e) => setHipCirc(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  )}
                </>
              )}

              {/* 1RM specific */}
              {calc.id === 'one_rep_max' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Weight Lifted ({unitSystem === 'metric' ? 'kg' : 'lbs'})
                    </label>
                    <input
                      type="number"
                      step={2.5}
                      value={liftWeight}
                      onChange={(e) => setLiftWeight(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      <span>Reps Completed (1 - 15)</span>
                      <span className="text-amber-600 font-mono">{liftReps} reps</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={15}
                      value={liftReps}
                      onChange={(e) => setLiftReps(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </>
              )}

              {/* Target Heart Rate & HRR resting pulse */}
              {['heart_rate_zones', 'hrr_zones'].includes(calc.id) && (
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <span>Resting Heart Rate (Measured in Morning)</span>
                    <span className="text-amber-600 font-mono">{restingHeartRate} BPM</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={100}
                    value={restingHeartRate}
                    onChange={(e) => setRestingHeartRate(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              )}

              {/* Running Pace inputs */}
              {calc.id === 'running_pace' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Distance ({unitSystem === 'metric' ? 'Kilometers' : 'Miles'})
                    </label>
                    <input
                      type="number"
                      step={0.1}
                      value={runDistance}
                      onChange={(e) => setRunDistance(Math.max(0.1, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Hours
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={24}
                        value={runHours}
                        onChange={(e) => setRunHours(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Minutes
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={59}
                        value={runMinutes}
                        onChange={(e) => setRunMinutes(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Seconds
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={59}
                        value={runSeconds}
                        onChange={(e) => setRunSeconds(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Fasting inputs */}
              {calc.id === 'intermittent_fasting' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Fasting Protocol
                    </label>
                    <select
                      value={fastProtocol}
                      onChange={(e) => setFastProtocol(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="16_8">16:8 LeanGains (16h Fast, 8h Eat)</option>
                      <option value="18_6">18:6 Accelerated Ketosis (18h Fast, 6h Eat)</option>
                      <option value="20_4">20:4 Warrior Diet (20h Fast, 4h Eat)</option>
                      <option value="24_0">24-Hour OMAD (One Meal A Day)</option>
                      <option value="12_12">12:12 Circadian Harmony (Gentle)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Fasting Start Time (Last Evening Meal)
                    </label>
                    <input
                      type="time"
                      value={fastStartTime}
                      onChange={(e) => setFastStartTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Hydration inputs */}
              {calc.id === 'hydration' && (
                <>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      <span>Daily Exercise Duration</span>
                      <span className="text-amber-600 font-mono">{workoutDuration} mins</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={180}
                      step={15}
                      value={workoutDuration}
                      onChange={(e) => setWorkoutDuration(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Sweat Rate Intensity
                    </label>
                    <select
                      value={sweatIntensity}
                      onChange={(e) => setSweatIntensity(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="light">Light Sweat (Low cardio / leisurely)</option>
                      <option value="moderate">Moderate Sweat (Typical strength/conditioning)</option>
                      <option value="heavy">Heavy Sweat (Soaked shirt, high humidity, HIIT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Environmental Climate
                    </label>
                    <select
                      value={climate}
                      onChange={(e) => setClimate(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="temperate">Temperate (Indoor AC / 18-22°C)</option>
                      <option value="hot_humid">Hot &amp; Humid (Summer outdoor / high sweat)</option>
                      <option value="dry_arid">Dry &amp; Arid (Desert climate, high insensibility)</option>
                      <option value="cold_altitude">Cold &amp; High Altitude (Winter endurance)</option>
                    </select>
                  </div>
                </>
              )}

              {/* Creatine inputs */}
              {calc.id === 'creatine' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Training Specialization
                  </label>
                  <select
                    value={creatineIntensity}
                    onChange={(e) => setCreatineIntensity(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="fitness">Recreational Fitness / General Athleticism</option>
                    <option value="bodybuilding_powerlifting">Competitive Bodybuilding / Powerlifting</option>
                  </select>
                </div>
              )}

              {/* Wrist & Ankle circumferences */}
              {['ideal_weight', 'muscular_potential'].includes(calc.id) && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Wrist Circumference ({unitSystem === 'metric' ? 'cm' : 'in'})
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={wristCirc}
                    onChange={(e) => setWristCirc(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              )}

              {calc.id === 'muscular_potential' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Ankle Circumference ({unitSystem === 'metric' ? 'cm' : 'in'})
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={ankleCirc}
                    onChange={(e) => setAnkleCirc(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              )}

              {/* WHtR waist input */}
              {calc.id === 'whtr' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Waist Circumference ({unitSystem === 'metric' ? 'cm' : 'in'})
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={waistCirc}
                    onChange={(e) => setWaistCirc(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              )}

              {/* Exercise calories inputs */}
              {calc.id === 'calories_burned' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Select Exercise / Activity
                    </label>
                    <select
                      value={selectedExerciseId}
                      onChange={(e) => setSelectedExerciseId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      {EXERCISE_MET_LIST.map((item) => (
                        <option key={item.id} value={item.id}>
                          [{item.category}] {item.name} ({item.met} MET)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      <span>Duration</span>
                      <span className="text-amber-600 font-mono">{exerciseDurationMin} mins</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={180}
                      step={5}
                      value={exerciseDurationMin}
                      onChange={(e) => setExerciseDurationMin(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </>
              )}

              {/* Sleep cycle inputs */}
              {calc.id === 'sleep_cycles' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Calculation Direction
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSleepMode('wake_at')}
                        className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all ${
                          sleepMode === 'wake_at'
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        I want to wake up at...
                      </button>
                      <button
                        type="button"
                        onClick={() => setSleepMode('sleep_now')}
                        className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all ${
                          sleepMode === 'sleep_now'
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        If I go to bed now...
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {sleepMode === 'wake_at' ? 'Target Wake-Up Time' : 'Current Bedtime'}
                    </label>
                    <input
                      type="time"
                      value={sleepTime}
                      onChange={(e) => setSleepTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Protein distribution inputs */}
              {calc.id === 'protein_timing' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Physiological Goal
                    </label>
                    <select
                      value={proteinGoal}
                      onChange={(e) => setProteinGoal(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="hypertrophy">Maximum Hypertrophy (2.2 g/kg)</option>
                      <option value="fat_loss">Aggressive Fat Loss / Protein Sparing (2.4 g/kg)</option>
                      <option value="maintenance">Maintenance &amp; Longevity (1.8 g/kg)</option>
                      <option value="endurance">Endurance Conditioning (1.6 g/kg)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Daily Meal Boluses
                    </label>
                    <select
                      value={proteinMeals}
                      onChange={(e) => setProteinMeals(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value={3}>3 Boluses (spaced ~5 hours)</option>
                      <option value={4}>4 Boluses (Optimal MPS distribution)</option>
                      <option value={5}>5 Boluses (Advanced athlete)</option>
                      <option value={6}>6 Boluses (Bodybuilder protocol)</option>
                    </select>
                  </div>
                </>
              )}

              {/* Recomp inputs */}
              {calc.id === 'body_recomposition' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Training Experience Status
                    </label>
                    <select
                      value={recompExperience}
                      onChange={(e) => setRecompExperience(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="beginner">Beginner (&lt;1 yr of progressive lifting / Newbie)</option>
                      <option value="intermediate">Intermediate (1-3 yrs consistent training)</option>
                      <option value="advanced">Advanced (&gt;4 yrs serious progressive overload)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Recomposition Priority Strategy
                    </label>
                    <select
                      value={recompPreference}
                      onChange={(e) => setRecompPreference(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="pure_maintenance">Iso-Caloric Recomp (0% Delta / Body Fat swaps to Muscle)</option>
                      <option value="slight_deficit">Hypertrophic Fat Loss (-15% Deficit / Faster Leaning)</option>
                      <option value="slight_surplus">Lean Muscle Growth (+8% Surplus / Lean Hypertrophy)</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Real-time Calculation Results Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-500" />
                  Instant Biometric Computation
                </h3>
                <button
                  id="copy-results-btn"
                  onClick={() => {
                    handleCopyResults(`ZenFit Tools - ${calc.title} Result Output`);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                </button>
              </div>

              {/* Dynamic Result Renderers */}
              {calc.id === 'tdee' && (() => {
                const res = calculateTDEE(gender, age, heightCm, weightKg, activityMultiplier, bodyFatPct);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        Total Daily Energy Expenditure (TDEE)
                      </span>
                      <div className="text-4xl sm:text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {res.tdee.toLocaleString()} <span className="text-xl font-normal text-slate-600">kcal/day</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Basal Metabolic Rate: <strong className="text-slate-900">{res.bmr.toLocaleString()} kcal</strong> ({res.bmrFormula})
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                        <span className="text-[10px] uppercase font-bold text-emerald-700 block">Cutting (-500)</span>
                        <span className="text-lg font-bold font-mono text-slate-900">{res.cutting}</span>
                        <span className="text-[10px] text-slate-400 block">kcal/day</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                        <span className="text-[10px] uppercase font-bold text-rose-700 block">Aggressive (-750)</span>
                        <span className="text-lg font-bold font-mono text-slate-900">{res.aggressiveCutting}</span>
                        <span className="text-[10px] text-slate-400 block">kcal/day</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                        <span className="text-[10px] uppercase font-bold text-blue-700 block">Maintenance</span>
                        <span className="text-lg font-bold font-mono text-slate-900">{res.maintenance}</span>
                        <span className="text-[10px] text-slate-400 block">kcal/day</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                        <span className="text-[10px] uppercase font-bold text-amber-700 block">Lean Bulk (+300)</span>
                        <span className="text-lg font-bold font-mono text-slate-900">{res.leanBulking}</span>
                        <span className="text-[10px] text-slate-400 block">kcal/day</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Daily Energy Burn Breakdown (TEF / NEAT / EAT)
                      </h4>
                      <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        <div>
                          <span className="text-slate-500 block">BMR</span>
                          <span className="font-bold text-slate-900">{res.breakdown.bmr} kcal</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">TEF (Food)</span>
                          <span className="font-bold text-slate-900">{res.breakdown.tef} kcal</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">NEAT (Steps)</span>
                          <span className="font-bold text-slate-900">{res.breakdown.neat} kcal</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">EAT (Gym)</span>
                          <span className="font-bold text-slate-900">{res.breakdown.eat} kcal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'macros' && (() => {
                const res = calculateMacros(macroCalories, macroGoal, weightKg, macroMeals);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        Target Caloric Allocation
                      </span>
                      <div className="text-4xl sm:text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {res.calories.toLocaleString()} <span className="text-xl font-normal text-slate-600">kcal</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                        <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">Protein</span>
                        <div className="text-2xl font-extrabold font-mono text-blue-950 my-1">
                          {res.proteinGrams}g
                        </div>
                        <span className="text-xs text-blue-700 block">{res.proteinPct}% ({res.proteinCalories} kcal)</span>
                      </div>
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Fats</span>
                        <div className="text-2xl font-extrabold font-mono text-amber-950 my-1">
                          {res.fatGrams}g
                        </div>
                        <span className="text-xs text-amber-700 block">{res.fatPct}% ({res.fatCalories} kcal)</span>
                      </div>
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Carbs</span>
                        <div className="text-2xl font-extrabold font-mono text-emerald-950 my-1">
                          {res.carbGrams}g
                        </div>
                        <span className="text-xs text-emerald-700 block">{res.carbPct}% ({res.carbCalories} kcal)</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Target Per Meal ({macroMeals} Meals / Day)
                      </h4>
                      <p className="text-xs text-slate-600 font-medium">
                        Each meal: <strong className="text-slate-900">{res.perMeal.protein}g Protein</strong> · <strong className="text-slate-900">{res.perMeal.carbs}g Carbs</strong> · <strong className="text-slate-900">{res.perMeal.fat}g Fat</strong> (~{res.perMeal.calories} kcal)
                      </p>
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'navy_body_fat' && (() => {
                const res = calculateNavyBodyFat(gender, heightCm, neckCm, waistCm, hipCm, weightKg);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        US Navy Estimated Body Fat
                      </span>
                      <div className="text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {res.bodyFatPct}%
                      </div>
                      <span className="inline-block px-3 py-1 bg-slate-900 text-white rounded-full text-xs font-semibold">
                        Category: {res.category}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Fat Mass</span>
                        <div className="text-2xl font-bold font-mono text-slate-900 my-1">
                          {unitSystem === 'metric' ? `${res.fatMassKg} kg` : `${Math.round(res.fatMassKg * 2.20462)} lbs`}
                        </div>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Lean Body Mass</span>
                        <div className="text-2xl font-bold font-mono text-slate-900 my-1">
                          {unitSystem === 'metric' ? `${res.leanMassKg} kg` : `${Math.round(res.leanMassKg * 2.20462)} lbs`}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'one_rep_max' && (() => {
                const res = calculateOneRepMax(liftWeight, liftReps);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        Estimated One-Rep Maximum (1RM)
                      </span>
                      <div className="text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {res.average1RM} <span className="text-xl font-normal text-slate-600">{unitSystem === 'metric' ? 'kg' : 'lbs'}</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Average of Brzycki ({res.brzycki}), Epley ({res.epley}), and Wathan ({res.wathan}) formulas
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                          <tr>
                            <th className="p-2.5 rounded-l-lg">% 1RM</th>
                            <th className="p-2.5">Load</th>
                            <th className="p-2.5">Target Reps</th>
                            <th className="p-2.5 rounded-r-lg">Physiological Stimulus</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {res.percentages.slice(0, 7).map((row) => (
                            <tr key={row.pct} className="hover:bg-slate-50">
                              <td className="p-2.5 font-bold font-mono text-amber-600">{row.pct}%</td>
                              <td className="p-2.5 font-mono text-slate-900">{row.weight} {unitSystem === 'metric' ? 'kg' : 'lbs'}</td>
                              <td className="p-2.5 font-mono text-slate-700">{row.targetReps}</td>
                              <td className="p-2.5 text-slate-500">{row.stimulus}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'heart_rate_zones' && (() => {
                const res = calculateTargetHeartRate(age, restingHeartRate);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        Tanaka Predicted Maximum Heart Rate
                      </span>
                      <div className="text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {res.recommendedMax} <span className="text-xl font-normal text-slate-600">BPM</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Calculated via Tanaka (208 - 0.7 × {age}) · Resting HR: {restingHeartRate} BPM
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {res.zones.map((z) => (
                        <div key={z.zone} className={`p-3 rounded-2xl border ${z.color} flex items-center justify-between`}>
                          <div>
                            <span className="text-xs font-bold block">
                              Zone {z.zone}: {z.name}
                            </span>
                            <span className="text-[11px] opacity-80 block">{z.purpose}</span>
                          </div>
                          <span className="font-mono font-bold text-sm tracking-wide shrink-0">
                            {z.range}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'running_pace' && (() => {
                const res = calculateRunningPace(runDistKm, runHours, runMinutes, runSeconds);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        Calculated Pace
                      </span>
                      <div className="text-4xl sm:text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {unitSystem === 'metric' ? res.pacePerKm : res.pacePerMile}
                      </div>
                      <p className="text-xs text-slate-600">
                        Speed: <strong>{unitSystem === 'metric' ? `${res.speedKmh} km/h` : `${res.speedMph} mph`}</strong> · Est. VO2 Max: <strong>{res.vo2MaxEst} ml/kg/min</strong>
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Pete Riegel Race Time Predictions
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {res.racePredictions.map((race) => (
                          <div key={race.distance} className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                            <span className="text-[11px] font-bold text-slate-500 block">{race.distance}</span>
                            <span className="text-base font-bold font-mono text-slate-900 block">{race.predictedTime}</span>
                            <span className="text-[10px] text-slate-400 font-mono block">{race.predictedPace}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'intermittent_fasting' && (() => {
                const res = calculateIntermittentFasting(fastProtocol, fastStartTime);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        {res.protocolName}
                      </span>
                      <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono my-2">
                        Fast: {res.fastingWindowStarts} → {res.fastingWindowEnds}
                      </div>
                      <p className="text-xs text-slate-600">
                        Eating Window ({res.eatingHours} hrs): <strong>{res.eatingWindowStarts}</strong> to <strong>{res.eatingWindowEnds}</strong>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Biological Fasting Stages
                      </h4>
                      {res.stages.slice(2, 6).map((st) => (
                        <div key={st.hoursRange} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">{st.name}</span>
                            <span className="text-[11px] text-slate-500">{st.marker}</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-amber-600 shrink-0">
                            {st.hoursRange}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'hydration' && (() => {
                const res = calculateHydration(weightKg, workoutDuration, sweatIntensity, climate);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        Total Daily Fluid Target
                      </span>
                      <div className="text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {unitSystem === 'metric' ? `${res.totalLiters} L` : `${res.totalFlOz} fl oz`}
                      </div>
                      <p className="text-xs text-slate-600">
                        Base: {res.baseLiters}L · Exercise Sweat Loss: +{res.exerciseAddonLiters}L · Climate: +{res.climateAddonLiters}L
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-[11px] font-bold text-slate-500 block uppercase">Hourly Intake</span>
                        <span className="text-lg font-bold font-mono text-slate-900">~{res.hourlyRecommendationMl} ml / hr</span>
                      </div>
                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-[11px] font-bold text-slate-500 block uppercase">Sodium Guideline</span>
                        <span className="text-xs font-bold text-amber-700">{res.sodiumGuidelineMg}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'creatine' && (() => {
                const res = calculateCreatine(weightKg, creatineIntensity);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        Daily Maintenance Dosage
                      </span>
                      <div className="text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {res.maintenanceDailyGrams} <span className="text-xl font-normal text-slate-600">grams/day</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Steady saturation reached within 28 days without gastrointestinal distress
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Rapid Loading Phase Protocol (Optional 6 Days)
                      </h4>
                      <p className="text-xs text-slate-600">
                        Take <strong>{res.loadingDailyGrams}g total per day</strong> split into <strong>{res.loadingDosesPerDay} doses of {res.loadingDosePerServing}g</strong> for 6 consecutive days, followed by {res.maintenanceDailyGrams}g maintenance.
                      </p>
                      <p className="text-xs text-amber-800 font-semibold pt-1">
                        Hydration surplus required: +{res.surplusWaterMl} ml water daily.
                      </p>
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'ffmi' && (() => {
                const res = calculateFFMI(weightKg, heightCm, bodyFatPct);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        Normalized Fat-Free Mass Index (FFMI)
                      </span>
                      <div className="text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {res.normalizedFfmi}
                      </div>
                      <span className="inline-block px-3 py-1 bg-slate-900 text-white rounded-full text-xs font-semibold">
                        {res.classification}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-[11px] font-bold text-slate-500 block uppercase">Lean Mass</span>
                        <span className="text-lg font-bold font-mono text-slate-900">
                          {unitSystem === 'metric' ? `${res.lbmKg} kg` : `${Math.round(res.lbmKg * 2.20462)} lbs`}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-[11px] font-bold text-slate-500 block uppercase">Raw FFMI</span>
                        <span className="text-lg font-bold font-mono text-slate-900">{res.ffmi}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 italic text-center">
                      {res.summary}
                    </p>
                  </div>
                );
              })()}

              {calc.id === 'ideal_weight' && (() => {
                const res = calculateIdealBodyWeight(gender, heightCm, wristCm);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        Adjusted Ideal Body Weight ({res.frameSize})
                      </span>
                      <div className="text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {unitSystem === 'metric' ? `${res.averageIdealKg} kg` : `${Math.round(res.averageIdealKg * 2.20462)} lbs`}
                      </div>
                      <p className="text-xs text-slate-600">
                        Ideal Range: <strong>{unitSystem === 'metric' ? `${res.adjustedRangeKg.min} - ${res.adjustedRangeKg.max} kg` : `${Math.round(res.adjustedRangeKg.min * 2.20462)} - ${Math.round(res.adjustedRangeKg.max * 2.20462)} lbs`}</strong>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-500 block">Devine (1974)</span>
                        <span className="font-bold font-mono text-slate-900">{unitSystem === 'metric' ? `${res.devineKg} kg` : `${Math.round(res.devineKg * 2.20462)} lbs`}</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-500 block">Robinson (1983)</span>
                        <span className="font-bold font-mono text-slate-900">{unitSystem === 'metric' ? `${res.robinsonKg} kg` : `${Math.round(res.robinsonKg * 2.20462)} lbs`}</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-500 block">Miller (1983)</span>
                        <span className="font-bold font-mono text-slate-900">{unitSystem === 'metric' ? `${res.millerKg} kg` : `${Math.round(res.millerKg * 2.20462)} lbs`}</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-500 block">Hamwi (1964)</span>
                        <span className="font-bold font-mono text-slate-900">{unitSystem === 'metric' ? `${res.hamwiKg} kg` : `${Math.round(res.hamwiKg * 2.20462)} lbs`}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'muscular_potential' && (() => {
                const res = calculateMuscularPotential(heightCm, wristCm, ankleCm);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        Berkhan Leangains Model (at 5-6% Body Fat)
                      </span>
                      <div className="text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {unitSystem === 'metric' ? `${res.berkhanMaxKg} kg` : `${Math.round(res.berkhanMaxKg * 2.20462)} lbs`}
                      </div>
                      <p className="text-xs text-slate-600">
                        Casey Butt Maximum Lean Mass: <strong>{unitSystem === 'metric' ? `${res.caseyButtMaxLbmKg} kg` : `${Math.round(res.caseyButtMaxLbmKg * 2.20462)} lbs`}</strong> (~{unitSystem === 'metric' ? `${res.caseyButtMaxWeightAt10PctKg} kg` : `${Math.round(res.caseyButtMaxWeightAt10PctKg * 2.20462)} lbs`} at 10% fat)
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Casey Butt Maximum Drug-Free Circumference Potentials
                      </h4>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                          <span className="text-slate-500 block">Chest</span>
                          <span className="font-bold font-mono text-slate-900">{unitSystem === 'metric' ? `${res.maxMeasurementsCm.chest} cm` : `${Math.round(res.maxMeasurementsCm.chest / 2.54 * 10) / 10} in`}</span>
                        </div>
                        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                          <span className="text-slate-500 block">Biceps</span>
                          <span className="font-bold font-mono text-slate-900">{unitSystem === 'metric' ? `${res.maxMeasurementsCm.biceps} cm` : `${Math.round(res.maxMeasurementsCm.biceps / 2.54 * 10) / 10} in`}</span>
                        </div>
                        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                          <span className="text-slate-500 block">Thighs</span>
                          <span className="font-bold font-mono text-slate-900">{unitSystem === 'metric' ? `${res.maxMeasurementsCm.thigh} cm` : `${Math.round(res.maxMeasurementsCm.thigh / 2.54 * 10) / 10} in`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'whtr' && (() => {
                const res = calculateWHtR(waistCm, heightCm);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        Waist-to-Height Ratio (WHtR)
                      </span>
                      <div className="text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {res.whtr}
                      </div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        res.riskLevel === 'Low' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {res.classification}
                      </span>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
                      <p className="text-slate-700">
                        {res.clinicalInsight}
                      </p>
                      <p className="text-slate-500">
                        Recommended healthy waist boundary for your height: <strong>{unitSystem === 'metric' ? `${res.targetWaistCm.min} - ${res.targetWaistCm.max} cm` : `${Math.round(res.targetWaistCm.min / 2.54)} - ${Math.round(res.targetWaistCm.max / 2.54)} inches`}</strong>.
                      </p>
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'calories_burned' && (() => {
                const item = EXERCISE_MET_LIST.find((e) => e.id === selectedExerciseId) || EXERCISE_MET_LIST[0];
                const res = calculateCaloriesBurned(item.met, exerciseDurationMin, weightKg);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        Calculated Exercise Calorie Burn
                      </span>
                      <div className="text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {res.totalCalories.toLocaleString()} <span className="text-xl font-normal text-slate-600">kcal</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Rate of burn: <strong>{res.calPerMinute} kcal / minute</strong> ({item.met} METs)
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600">
                      <strong>Exercise Compendium Note:</strong> This exercise expends {item.met} times the energy of sitting quietly at rest. Calorie estimates are derived from Ainsworth et al. 2011 physical activity compendium.
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'sleep_cycles' && (() => {
                const res = calculateSleepCycles(sleepMode, sleepTime);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        {sleepMode === 'wake_at' ? 'Recommended Bedtimes' : 'Optimal Wake-Up Times'}
                      </span>
                      <p className="text-xs text-slate-500 mt-1">
                        Based on 90-minute ultradian cycles + 14-minute average sleep latency
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {res.recommendedTimes.map((t) => (
                        <div
                          key={t.cycles}
                          className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                            t.isOptimal
                              ? 'bg-amber-50/80 border-amber-400 text-slate-950 shadow-xs ring-1 ring-amber-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <div>
                            <span className="text-sm font-bold font-mono">{t.formattedTime}</span>
                            <span className="text-[11px] text-slate-500 block">{t.description}</span>
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shrink-0">
                            {t.cycles} Cycles
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'bmr_comparative' && (() => {
                const res = calculateBMRComparative(gender, age, heightCm, weightKg, bodyFatPct);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        Multi-Formula Comparative Mean BMR
                      </span>
                      <div className="text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {res.meanBMR} <span className="text-xl font-normal text-slate-600">kcal/day</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Max formula variance: {res.deltaMaxMin} kcal
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center text-xs">
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-500 block">Mifflin-St Jeor</span>
                        <span className="font-bold font-mono text-base text-slate-900">{res.mifflinStJeor} kcal</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-500 block">Revised Harris-Benedict</span>
                        <span className="font-bold font-mono text-base text-slate-900">{res.harrisBenedict} kcal</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-500 block">Schofield (WHO)</span>
                        <span className="font-bold font-mono text-base text-slate-900">{res.schofieldWHO} kcal</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-500 block">Katch-McArdle (LBM)</span>
                        <span className="font-bold font-mono text-base text-slate-900">{res.katchMcArdle ?? 'N/A'} kcal</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'protein_timing' && (() => {
                const res = calculateProteinDistribution(weightKg, proteinGoal, proteinMeals);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        Total Daily Protein Target
                      </span>
                      <div className="text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {res.totalDailyGrams} <span className="text-xl font-normal text-slate-600">grams</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Intake density: <strong>{res.gramsPerKg} g/kg</strong> of bodyweight
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Scheduled Anabolic Meal Timing
                      </h4>
                      {res.meals.map((m) => (
                        <div key={m.mealNumber} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">{m.title}</span>
                            <span className="text-[11px] text-slate-500">{m.timingWindow}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold font-mono text-amber-600 block">{m.proteinGrams}g</span>
                            <span className="text-[10px] text-slate-400 font-mono">~{m.leucineEstimateGrams}g Leucine</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'body_recomposition' && (() => {
                const tdeeVal = calculateTDEE(gender, age, heightCm, weightKg, activityMultiplier).tdee;
                const res = calculateBodyRecomposition(weightKg, tdeeVal, recompExperience, recompPreference);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        Target Daily Recomposition Calories
                      </span>
                      <div className="text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {res.targetDailyCalories.toLocaleString()} <span className="text-xl font-normal text-slate-600">kcal</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Strategy: <strong>{res.strategyName}</strong> · Daily Protein Anchor: <strong>{res.dailyProteinGrams}g</strong>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                        <span className="text-xs font-bold text-emerald-800 uppercase block">12-Wk Est. Fat Loss</span>
                        <span className="text-2xl font-bold font-mono text-emerald-950 my-1">
                          -{unitSystem === 'metric' ? `${res.projectedFatLossKg} kg` : `${Math.round(res.projectedFatLossKg * 2.20462)} lbs`}
                        </span>
                      </div>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                        <span className="text-xs font-bold text-blue-800 uppercase block">12-Wk Est. Lean Muscle</span>
                        <span className="text-2xl font-bold font-mono text-blue-950 my-1">
                          +{unitSystem === 'metric' ? `${res.projectedLeanGainKg} kg` : `${Math.round(res.projectedLeanGainKg * 2.20462)} lbs`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {calc.id === 'hrr_zones' && (() => {
                const res = calculateHRR(age, restingHeartRate);
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                        Operational Heart Rate Reserve (HRR)
                      </span>
                      <div className="text-5xl font-extrabold text-slate-950 font-mono my-2">
                        {res.hrr} <span className="text-xl font-normal text-slate-600">BPM</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Max HR: {res.maxHR} BPM · Resting HR: {res.restingHR} BPM
                      </p>
                    </div>

                    <div className="space-y-2">
                      {res.zones.map((z) => (
                        <div key={z.zone} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">{z.zone}</span>
                            <span className="text-[11px] text-slate-500">{z.hrrPctRange}</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-amber-600 shrink-0">
                            {z.range}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-6">
              <span>Verified 100% Client-Side Computation</span>
              <button
                onClick={onOpenContact}
                className="text-amber-600 hover:text-amber-700 font-semibold"
              >
                Inquire about this tool
              </button>
            </div>
          </div>
        </div>

        {/* MID-CONTENT ADVERTISEMENT BANNER (Strict AdSense safe-zone compliance) */}
        <div className="my-10">
          <AdSenseSlot position="mid_content" />
        </div>

        {/* EXHAUSTIVE EDITORIAL CONTENT SECTION (Prevent Thin Content & AdSense 2026 Compliant) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-10">
          {/* Section 1: How This Calculator Works & Mathematical Formula */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
                <BookOpen className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                How This Calculator Works &amp; Mathematical Formula
              </h3>
            </div>
            <div
              className="text-sm text-slate-700 leading-relaxed space-y-3"
              dangerouslySetInnerHTML={{ __html: calc.detailedFormulaHtml }}
            />
          </div>

          {/* Section 2: Standard Physiological Guidelines & Scientific References */}
          <div className="border-t border-slate-100 pt-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
                <FileCheck className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Standard Physiological Guidelines &amp; Scientific References
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">
                  Clinical Society Guidelines
                </h4>
                <ul className="list-disc pl-4 space-y-2">
                  {calc.scientificGuidelines.map((guide, idx) => (
                    <li key={idx} className="leading-relaxed">{guide}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">
                  Peer-Reviewed Citations
                </h4>
                <ul className="list-disc pl-4 space-y-2 font-mono text-[11px]">
                  {calc.scientificReferences.map((ref, idx) => (
                    <li key={idx} className="leading-relaxed">{ref}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Important Planning Assumptions & Safety Disclosures */}
          <div className="border-t border-slate-100 pt-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Important Planning Assumptions &amp; Safety Disclosures
              </h3>
            </div>
            <div className="p-5 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-2 text-xs text-amber-950">
              {calc.safetyDisclosures.map((disclosure, idx) => (
                <p key={idx} className="leading-relaxed flex items-start gap-2">
                  <span className="font-bold shrink-0">•</span>
                  <span>{disclosure}</span>
                </p>
              ))}
            </div>
          </div>

          {/* Section 4: Frequently Asked Questions (FAQ) with Schema.org JSON-LD support */}
          <div className="border-t border-slate-100 pt-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
                <HelpCircle className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Frequently Asked Questions ({calc.faqs.length} Technical Inquiries)
              </h3>
            </div>

            <div className="space-y-3">
              {calc.faqs.map((faq, idx) => {
                const isExpanded = expandedFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left px-5 py-4 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-amber-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-5 py-4 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
