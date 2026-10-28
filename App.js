import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import api from "./src/services/api";
import FormularioUsuario from "./src/screens/FormularioUsuario";

export default function App() {
  const [tela, setTela] = useState("lista");
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState(null);

  // A função que faz o pedido fica fora do useEffect para ser reaproveitada no refresh
  const buscarDados = async () => {
    try {
      setErro(null);
      // Os dados devolvidos ficam na propriedade "data" do Axios
      const resposta = await api.get("/users");
      setUsuarios(resposta.data);
    } catch (e) {
      console.error("Erro ao buscar dados:", e.message);
      setErro("Não foi possível carregar os usuários.");
    } finally {
      // Oculta o indicador de carregamento, independentemente de erro ou sucesso
      setLoading(false);
    }
  };

  // Array vazio [] garante execução única, após a montagem da tela
  useEffect(() => {
    buscarDados();
  }, []);

  // Desafio: Pull-to-Refresh
  const aoAtualizar = async () => {
    setAtualizando(true);
    await buscarDados();
    setAtualizando(false);
  };

  if (tela === "formulario") {
    return <FormularioUsuario onVoltar={() => setTela("lista")} />;
  }

  // Feedback visual enquanto o estado é "pending"
  if (loading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando usuários...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Lista de Usuários</Text>
        <TouchableOpacity
          style={styles.botaoNovo}
          onPress={() => setTela("formulario")}
        >
          <Text style={styles.textoBotao}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        refreshing={atualizando}
        onRefresh={aoAtualizar}
        ListEmptyComponent={
          <Text style={styles.textoErro}>{erro || "Nenhum usuário encontrado."}</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <Text style={styles.nome}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  centro: { flex: 1, justifyContent: "center", alignItems: "center" },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: { fontSize: 24, fontWeight: "bold", color: "#14325A" },
  botaoNovo: { backgroundColor: "#0064A0", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  textoBotao: { color: "#FFF", fontWeight: "bold" },
  cartao: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  nome: { fontSize: 18, fontWeight: "bold" },
  email: { color: "#666", marginTop: 5 },
  textoErro: { textAlign: "center", color: "#D32F2F", marginTop: 30 },
});