import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/types";

type Props = NativeStackScreenProps<RootStackParamList, "Detalhes">;

export default function DetalhesUsuario({ route, navigation }: Props) {
  const { nomeUsuario } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes do Perfil</Text>
      <Text style={styles.texto}>Bem-vindo, {nomeUsuario}!</Text>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  texto: { fontSize: 18, color: "#555", marginBottom: 30 },
  botaoVoltar: {
    backgroundColor: "#0064A0",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  textoBotao: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});