import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import JogoDaVelha from "./JogoDaVelha";

interface CartaoPerfilProps {
  nomeInicial: string;
  profissao: string;
  imagem: ImageSourcePropType;
}

function CartaoPerfil({ nomeInicial, profissao, imagem }: CartaoPerfilProps) {
  const [nome, setNome] = useState<string>(nomeInicial);
  const [seguindo, setSeguindo] = useState<boolean>(false);

  return (
    <View style={styles.cartao}>
      <Image source={imagem} style={styles.avatar} />
      <Text style={styles.nomeUsuario}>{nome}</Text>
      <Text style={styles.profissao}>{profissao}</Text>

      <TouchableOpacity
        style={[styles.botao, seguindo && styles.botaoDesativado]}
        activeOpacity={0.7}
        onPress={() => setSeguindo(!seguindo)}
      >
        <Text style={styles.textoBotao}>
          {seguindo ? "Já Seguindo" : "Seguir"}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Alterar nome..."
        value={nome}
        onChangeText={(texto: string) => setNome(texto)}
      />
    </View>
  );
}

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CartaoPerfil
        nomeInicial="Gustavo"
        profissao="Estudante de ADS"
        imagem={require("./assets/foto-perfil.png")}
      />

      <CartaoPerfil
        nomeInicial="FalleN"
        profissao="Jogador de CS2"
        imagem={require("./assets/fallen_1.jpg")}
      />

      <CartaoPerfil
        nomeInicial="Sacy"
        profissao="Jogador de Valorant"
        imagem={require("./assets/sacy.jpg")}
      />

      <JogoDaVelha />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  cartao: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "80%",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  nomeUsuario: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#14325A",
  },
  profissao: {
    fontSize: 16,
    color: "#505050",
    marginBottom: 20,
  },
  botao: {
    backgroundColor: "#0064A0",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  botaoDesativado: {
    backgroundColor: "#A0A0A0",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    textAlign: "center",
  },
});