import React from 'react';
export const InitialState = {
  level: 0,
  score: 0
};
export const StoreContext = React.createContext(InitialState);