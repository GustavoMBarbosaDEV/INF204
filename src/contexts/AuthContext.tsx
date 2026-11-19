import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_USUARIO = "@INF204:usuario";

// Dados do usuario que a "API" devolve no login
export interface Usuario {
  id: string;
  nome: string;
  email: string;
}

// Tudo o que o contexto disponibiliza para os consumidores
export interface AuthContextData {
  logado: boolean;
  usuario: Usuario | null;
  carregando: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// 1. Criacao do objeto de Contexto
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

// 2. O componente Provider que ira envelopar a aplicacao
export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null); // null = Visitante
  const [carregando, setCarregando] = useState<boolean>(true);

  // Ao abrir o app, verifica se existe uma sessao salva no disco
  useEffect(() => {
    async function carregarSessao(): Promise<void> {
      try {
        const usuarioSalvo = await AsyncStorage.getItem(CHAVE_USUARIO);
        if (usuarioSalvo) {
          setUsuario(JSON.parse(usuarioSalvo) as Usuario);
        }
      } catch (erro) {
        console.error("Erro ao recuperar a sessao", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarSessao();
  }, []);

  // Simulacao de um Login
  async function signIn(email: string, senha: string): Promise<void> {
    // Aqui aconteceria uma chamada de API (axios.post)
    const respostaAPI: Usuario = { id: "123", nome: "Turma INF204", email };
    setUsuario(respostaAPI);
    await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(respostaAPI));
  }

  // Simulacao de um Logout
  async function signOut(): Promise<void> {
    setUsuario(null);
    await AsyncStorage.removeItem(CHAVE_USUARIO);
  }

  return (
    // Injetamos as propriedades e metodos no "canal" global
    // A conversao booleana (!!usuario) indica se ha alguem logado
    <AuthContext.Provider
      value={{ logado: !!usuario, usuario, carregando, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
