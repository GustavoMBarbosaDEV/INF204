import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ItemTarefa({ descricao, concluida }) {
  return (
    <View style={styles.card}>
      <Text style={styles.textoTarefa}>
        {concluida ? "[OK] " : "[PENDENTE] "}
        {descricao}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textoTarefa: {
    fontSize: 16,
    color: "#333",
  },
});