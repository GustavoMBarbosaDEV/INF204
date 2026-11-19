import React, { createContext, useState } from "react";

const cores = {
  claro: { fundo: "#F5F5F5", texto: "#14325A" },
  escuro: { fundo: "#121212", texto: "#FFFFFF" },
};

export const TemaContext = createContext({});

// Contexto separado do AuthContext: o tema muda pouco, por isso cabe bem aqui
export function ThemeProvider({ children }) {
  const [tema, setTema] = useState("claro");

  function alternarTema() {
    setTema((temaAtual) => (temaAtual === "claro" ? "escuro" : "claro"));
  }

  return (
    <TemaContext.Provider value={{ tema, cores: cores[tema], alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
}
