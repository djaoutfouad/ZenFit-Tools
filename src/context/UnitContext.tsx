import React, { createContext, useContext, useState, useEffect } from 'react';
import { UnitSystem } from '../types';

interface UnitContextType {
  unitSystem: UnitSystem;
  setUnitSystem: (system: UnitSystem) => void;
  toggleUnitSystem: () => void;
}

const UnitContext = createContext<UnitContextType>({
  unitSystem: 'metric',
  setUnitSystem: () => {},
  toggleUnitSystem: () => {},
});

export const UnitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unitSystem, setUnitSystemState] = useState<UnitSystem>('metric');

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('zenfit_unit_system');
        if (saved === 'imperial' || saved === 'metric') {
          setUnitSystemState(saved);
        }
      }
    } catch {
      // Ignore storage errors in restricted iframes
    }
  }, []);

  const setUnitSystem = (system: UnitSystem) => {
    setUnitSystemState(system);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('zenfit_unit_system', system);
      }
    } catch {
      // Ignore
    }
  };

  const toggleUnitSystem = () => {
    const next: UnitSystem = unitSystem === 'metric' ? 'imperial' : 'metric';
    setUnitSystem(next);
  };

  return (
    <UnitContext.Provider value={{ unitSystem, setUnitSystem, toggleUnitSystem }}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = () => useContext(UnitContext);
