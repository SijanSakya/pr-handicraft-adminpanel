'use client';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface GlobalContextProps {
  selectedServiceId: number | null;
  setSelectedServiceId: any;
}

const GlobalContextProvider = createContext<GlobalContextProps>(undefined!);

export function GlobalContext({ children }: Readonly<PropsWithChildren>) {
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

  const contextValue: GlobalContextProps = {
    selectedServiceId,
    setSelectedServiceId,
  };

  return <GlobalContextProvider.Provider value={contextValue}>{children}</GlobalContextProvider.Provider>;
}

export function useGlobalContext(): GlobalContextProps {
  const context = useContext(GlobalContextProvider);

  if (typeof context === 'undefined') {
    throw new Error('useGlobalContext should be used within the GlobalContextProvider provider!');
  }
  return context;
}
