import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import ItemTarefa from "./ItemTarefa";

export default function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, descricao: "Estudar ES6+", concluida: true },
    { id: 2, descricao: "Configurar ambiente Expo", concluida: true },
    { id: 3, descricao: "Entender o funcionamento do JSX", concluida: false },
    { id: 4, descricao: "Finalizar Roteiro de Pratica 02", concluida: false },
  ]);

  const tarefasPendentes = tarefas.filter((tarefa) => !tarefa.concluida);

  const adicionarTarefa = () => {
    const novaTarefa = {
      id: tarefas.length + 1,
      descricao: `Nova tarefa ${tarefas.length + 1}`,
      concluida: false,
    };
    setTarefas([...tarefas, novaTarefa]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Tarefas</Text>
      {tarefas.map((tarefa) => (
        <ItemTarefa
          key={tarefa.id}
          descricao={tarefa.descricao}
          concluida={tarefa.concluida}
        />
      ))}

      <Button title="Adicionar Tarefa" onPress={adicionarTarefa} />

      <Text style={styles.titulo}>Pendentes</Text>
      {tarefasPendentes.map((tarefa) => (
        <ItemTarefa
          key={tarefa.id}
          descricao={tarefa.descricao}
          concluida={tarefa.concluida}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#20325a",
  },
});