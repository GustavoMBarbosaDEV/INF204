import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParamList, TabParamList } from "../routes/types";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Incio">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tela Inicial</Text>
      <Button
        title="Ver Perfil do Usuario"
        onPress={() =>
          navigation.navigate("Detalhes", { nomeUsuario: "Turma INF204" })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});