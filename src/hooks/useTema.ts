import { useContext } from "react";
import { TemaContext, TemaContextData } from "../contexts/TemaContext";

export function useTema(): TemaContextData {
  const context = useContext(TemaContext);

  if (!context) {
    throw new Error("useTema deve ser usado dentro de um ThemeProvider");
  }

  return context;
}
