import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function UrnaEletronica() {
  const [votosA, setVotosA] = useState<number>(0);
  const [votosB, setVotosB] = useState<number>(0);
  const [votosC, setVotosC] = useState<number>(0);
  const [nomeMesario, setNomeMesario] = useState<string>("");

  const totalVotos: number = votosA + votosB + votosC;

  const calcularPorcentagem = (votos: number): string => {
    if (totalVotos === 0) return "0.0";
    return ((votos / totalVotos) * 100).toFixed(1);
  };

  const zerarUrna = (): void => {
    setVotosA(0);
    setVotosB(0);
    setVotosC(0);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputMesario}
        placeholder="Digite o nome do mesário..."
        value={nomeMesario}
        onChangeText={(texto: string) => setNomeMesario(texto)}
      />
      <Text style={styles.textoMesario}>
        Mesário atual: {nomeMesario || "Não informado"}
      </Text>

      <Text style={styles.titulo}>Painel de Votação</Text>

      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>
          Candidato A: {votosA} votos ({calcularPorcentagem(votosA)}%)
        </Text>
        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosA((prev: number) => prev + 1)}
        >
          <Text style={styles.textoBotao}>Votar em A</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>
          Candidato B: {votosB} votos ({calcularPorcentagem(votosB)}%)
        </Text>
        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosB((prev: number) => prev + 1)}
        >
          <Text style={styles.textoBotao}>Votar em B</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>
          Candidato C: {votosC} votos ({calcularPorcentagem(votosC)}%)
        </Text>
        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosC((prev: number) => prev + 1)}
        >
          <Text style={styles.textoBotao}>Votar em C</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rodape}>
        <Text style={styles.totalTexto}>Total de Votos: {totalVotos}</Text>
        <TouchableOpacity style={styles.botaoZerar} onPress={zerarUrna}>
          <Text style={styles.textoBotao}>Zerar Urna</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#14325A",
  },
  inputMesario: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFF",
    marginBottom: 8,
  },
  textoMesario: {
    fontSize: 14,
    color: "#505050",
    marginBottom: 20,
  },
  candidatoContainer: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    elevation: 2,
  },
  nomeCandidato: { fontSize: 18, marginBottom: 10 },
  botaoVotar: {
    backgroundColor: "#0064A0",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  textoBotao: { color: "#FFF", fontWeight: "bold" },
  rodape: {
    marginTop: 30,
    alignItems: "center",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#CCC",
    paddingTop: 20,
  },
  totalTexto: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  botaoZerar: { backgroundColor: "#808080", padding: 15, borderRadius: 5 },
});