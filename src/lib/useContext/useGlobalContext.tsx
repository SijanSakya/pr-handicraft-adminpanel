'use client';
import { PropsWithChildren, createContext, useContext } from 'react';

interface GlobalContextProps {}

const GlobalContextProvider = createContext<GlobalContextProps>(undefined!);

export function GlobalContext({ children }: Readonly<PropsWithChildren>) {
  const contextValue: GlobalContextProps = {};

  return <GlobalContextProvider.Provider value={contextValue}>{children}</GlobalContextProvider.Provider>;
}

export function useGlobalContext(): GlobalContextProps {
  const context = useContext(GlobalContextProvider);

  if (typeof context === 'undefined') {
    throw new Error('useGlobalContext should be used within the GlobalContextProvider provider!');
  }
  return context;
}
