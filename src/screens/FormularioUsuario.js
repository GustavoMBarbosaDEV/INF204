import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import api from "../services/api";

// Alert.alert não aparece na web, então usamos window.alert nesse caso
function avisar(titulo, mensagem) {
  if (Platform.OS === "web") {
    window.alert(`${titulo}\n\n${mensagem}`);
  } else {
    Alert.alert(titulo, mensagem);
  }
}

export default function FormularioUsuario({ onVoltar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviar = async () => {
    if (!nome.trim() || !email.trim()) {
      avisar("Atenção", "Preencha o nome e o e-mail.");
      return;
    }

    setEnviando(true);
    try {
      // O segundo parâmetro do post() é o corpo (payload) em JSON
      const resposta = await api.post("/users", { name: nome, email: email });
      avisar("Sucesso", `Usuário criado! ID retornado: ${resposta.data.id}`);
      setNome("");
      setEmail("");
    } catch (erro) {
      avisar("Erro", `Não foi possível criar o usuário: ${erro.message}`);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Novo Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[styles.botao, enviando && styles.botaoDesativado]}
        onPress={enviar}
        disabled={enviando}
      >
        {enviando ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.textoBotao}>Enviar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoVoltar} onPress={onVoltar}>
        <Text style={styles.textoVoltar}>Voltar para a lista</Text>
      </TouchableOpacity>
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
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#14325A" },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  botao: {
    backgroundColor: "#0064A0",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  botaoDesativado: { backgroundColor: "#8FB4CC" },
  textoBotao: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  botaoVoltar: { padding: 14, alignItems: "center", marginTop: 8 },
  textoVoltar: { color: "#0064A0", fontWeight: "bold" },
});