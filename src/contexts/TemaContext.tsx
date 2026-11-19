import React, { createContext, useState, ReactNode } from "react";

export type Tema = "claro" | "escuro";

interface CoresTema {
  fundo: string;
  texto: string;
}

export interface TemaContextData {
  tema: Tema;
  cores: CoresTema;
  alternarTema: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const cores: Record<Tema, CoresTema> = {
  claro: { fundo: "#F5F5F5", texto: "#14325A" },
  escuro: { fundo: "#121212", texto: "#FFFFFF" },
};

export const TemaContext = createContext<TemaContextData>(
  {} as TemaContextData
);

// Contexto separado do AuthContext: o tema muda pouco, por isso cabe bem aqui
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [tema, setTema] = useState<Tema>("claro");

  function alternarTema(): void {
    setTema((temaAtual) => (temaAtual === "claro" ? "escuro" : "claro"));
  }

  return (
    <TemaContext.Provider value={{ tema, cores: cores[tema], alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
}
