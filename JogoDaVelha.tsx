import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Jogador = "X" | "O";
type Celula = Jogador | null;

export default function JogoDaVelha() {
  const [tabuleiro, setTabuleiro] = useState<Celula[]>(Array(9).fill(null));
  const [jogadorAtual, setJogadorAtual] = useState<Jogador>("X");

  const jogar = (indice: number): void => {
    if (tabuleiro[indice]) return;

    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[indice] = jogadorAtual;
    setTabuleiro(novoTabuleiro);
    setJogadorAtual(jogadorAtual === "X" ? "O" : "X");
  };

  const reiniciar = (): void => {
    setTabuleiro(Array(9).fill(null));
    setJogadorAtual("X");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Velha</Text>
      <Text style={styles.vez}>Vez de: {jogadorAtual}</Text>

      <View style={styles.tabuleiro}>
        {tabuleiro.map((valor, indice) => (
          <TouchableOpacity
            key={indice}
            style={styles.celula}
            activeOpacity={0.6}
            onPress={() => jogar(indice)}
          >
            <Text style={styles.textoCelula}>{valor}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciar}>
        <Text style={styles.textoBotaoReiniciar}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const TAMANHO_CELULA = 90;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#14325A",
    marginBottom: 5,
  },
  vez: {
    fontSize: 16,
    color: "#505050",
    marginBottom: 15,
  },
  tabuleiro: {
    width: TAMANHO_CELULA * 3,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  celula: {
    width: TAMANHO_CELULA,
    height: TAMANHO_CELULA,
    borderWidth: 1,
    borderColor: "#CCC",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  textoCelula: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#14325A",
  },
  botaoReiniciar: {
    backgroundColor: "#0064A0",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  textoBotaoReiniciar: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});