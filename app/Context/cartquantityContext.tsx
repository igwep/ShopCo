"use client";
import { createContext, useState, ReactNode } from "react";

interface GlobalContextType { 
    user: string | null;
    setUser: (user:string | null ) => void
}


 export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);

    return (
        <GlobalContext.Provider value={{ user, setUser }}>
            {children}
        </GlobalContext.Provider>
    );
};
/* export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
}; */