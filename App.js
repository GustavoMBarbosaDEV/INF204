import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default function App() {
  const [contagem, setContagem] = useState(0);

  const incrementar = () => {
    setContagem(contagem + 1);
  };

  const decrementar = () => {
    // Impede que o contador fique negativo
    if (contagem > 0) {
      setContagem(contagem - 1);
    }
  };

  const zerar = () => {
    setContagem(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contagem Atual:</Text>
      <Text style={styles.numero}>{contagem}</Text>

      <View style={styles.linhaBotoes}>
        <TouchableOpacity
          style={[styles.botao, styles.botaoDecrementar]}
          activeOpacity={0.7}
          onPress={decrementar}
        >
          <Text style={styles.textoBotao}>-1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, styles.botaoIncrementar]}
          activeOpacity={0.7}
          onPress={incrementar}
        >
          <Text style={styles.textoBotao}>+1</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.botao, styles.botaoZerar]}
        activeOpacity={0.7}
        onPress={zerar}
      >
        <Text style={styles.textoBotao}>Zerar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  titulo: {
    fontSize: 20,
    color: "#333333",
  },
  numero: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 20,
  },
  linhaBotoes: {
    flexDirection: "row",
    marginBottom: 15,
  },
  botao: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  botaoIncrementar: {
    backgroundColor: "#4caf50",
  },
  botaoDecrementar: {
    backgroundColor: "#e53935",
  },
  botaoZerar: {
    backgroundColor: "#757575",
    paddingHorizontal: 30,
  },
  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
});