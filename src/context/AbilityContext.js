import React, { createContext, useState, useContext } from 'react';
import { Ability } from '@casl/ability';
import { createContextualCan } from '@casl/react';

export const AbilityContext = createContext({
  ability: new Ability(),
  updateAbility: () => {}
});

export const AbilityProvider = ({ children }) => {
  const [ability, setAbility] = useState(new Ability());

  const updateAbility = (rules) => {
    const newAbility = new Ability(rules);
    setAbility(newAbility);
  };

  return (
    <AbilityContext.Provider value={{ ability, updateAbility }}>
      {children}
    </AbilityContext.Provider>
  );
};

// Custom hook to use ability from context
export const useAbility = () => {
  const { ability } = useContext(AbilityContext);
  return ability;
};

// Export Can component for conditional rendering
export const Can = createContextualCan(AbilityContext.Consumer);
