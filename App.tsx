import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from "expo-sqlite";

// Formato de uma linha da tabela tarefas
interface Tarefa {
  id: number;
  descricao: string;
  concluida: number; // SQLite nao tem booleano: 0 = pendente, 1 = concluida
}

// Formato do objeto guardado no AsyncStorage
interface Usuario {
  nome: string;
  logado: boolean;
}

const CHAVE_USUARIO = "@AppTarefas:Usuario";

// Funcao de inicializacao das tabelas no disco
const iniciarBanco = async (db: SQLiteDatabase): Promise<void> => {
  await db.execAsync("PRAGMA journal_mode = WAL;");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      concluida INTEGER DEFAULT 0
    );
  `);
  console.log("Base de Dados inicializada!");
};

export default function App() {
  return (
    // Engloba a aplicacao garantindo o acesso global
    <SQLiteProvider databaseName="app-database.db" onInit={iniciarBanco}>
      <EcraPrincipal />
    </SQLiteProvider>
  );
}

function EcraPrincipal() {
  // Acesso a instancia do banco de dados relacional
  const db = useSQLiteContext();

  const [usuario, setUsuario] = useState<Usuario>({
    nome: "Visitante",
    logado: true,
  });
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState<string>("");

  // Efeito para carregar dados assim que o ecra abrir
  useEffect(() => {
    carregarPreferencias();
    carregarTarefas();
  }, []);

  // Leitura Assincrona Chave-Valor
  const carregarPreferencias = async (): Promise<void> => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem(CHAVE_USUARIO);
      if (usuarioSalvo) setUsuario(JSON.parse(usuarioSalvo) as Usuario);
    } catch (erro) {
      console.error("Falha ao ler preferencias", erro);
    }
  };

  // Gravacao Assincrona Chave-Valor
  const salvarNome = async (): Promise<void> => {
    const novoUsuario: Usuario = { nome: "Estudante INF204", logado: true };
    try {
      await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(novoUsuario));
      setUsuario(novoUsuario);
    } catch (erro) {
      console.error("Falha ao salvar preferencias", erro);
    }
  };

  // Leitura SQL (SELECT) tipada com a interface Tarefa
  const carregarTarefas = async (): Promise<void> => {
    try {
      const resultados = await db.getAllAsync<Tarefa>(
        "SELECT * FROM tarefas ORDER BY id DESC;"
      );
      setTarefas(resultados);
    } catch (erro) {
      console.error("Falha ao ler dados", erro);
    }
  };

  // Insercao SQL com Bindings de Seguranca (INSERT)
  const adicionarTarefa = async (): Promise<void> => {
    if (novaTarefa.trim() === "") return;

    try {
      await db.runAsync(
        "INSERT INTO tarefas (descricao, concluida) VALUES (?, ?);",
        [novaTarefa, 0]
      );
      setNovaTarefa("");
      carregarTarefas(); // Atualiza a lista visualmente
    } catch (erro) {
      console.error("Erro no insert", erro);
    }
  };

  // Atualizacao SQL (UPDATE)
  const alternarStatus = async (
    id: number,
    statusAtual: number
  ): Promise<void> => {
    const novoStatus = statusAtual === 1 ? 0 : 1;
    try {
      await db.runAsync("UPDATE tarefas SET concluida = ? WHERE id = ?;", [
        novoStatus,
        id,
      ]);
      carregarTarefas();
    } catch (erro) {
      console.error("Erro no update", erro);
    }
  };

  // Exclusao SQL (DELETE)
  const excluirTarefa = async (id: number): Promise<void> => {
    try {
      await db.runAsync("DELETE FROM tarefas WHERE id = ?;", [id]);
      carregarTarefas();
    } catch (erro) {
      console.error("Erro no delete", erro);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>Olá, {usuario.nome}!</Text>
          <Text style={styles.status}>
            {usuario.logado ? "Sessão ativa" : "Sessão encerrada"}
          </Text>
        </View>
        <TouchableOpacity style={styles.botaoAcao} onPress={salvarNome}>
          <Text style={styles.textoBotao}>Mudar Nome</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <TouchableOpacity style={styles.botaoAdd} onPress={adicionarTarefa}>
          <Text style={styles.textoBotao}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <TouchableOpacity
              style={styles.areaTarefa}
              onPress={() => alternarStatus(item.id, item.concluida)}
            >
              <Text
                style={[
                  styles.textoTarefa,
                  item.concluida === 1 && styles.textoConcluido,
                ]}
              >
                {item.descricao}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirTarefa(item.id)}
            >
              <Text style={styles.textoBotao}>X</Text>
            </TouchableOpacity>
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
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: { fontSize: 24, fontWeight: "bold", color: "#14325A" },
  status: { fontSize: 13, color: "#666" },
  botaoAcao: { backgroundColor: "#808080", padding: 10, borderRadius: 8 },
  inputContainer: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFF",
  },
  botaoAdd: {
    backgroundColor: "#0064A0",
    padding: 15,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
  },
  textoBotao: { color: "#FFF", fontWeight: "bold" },
  cartao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  areaTarefa: { flex: 1 },
  textoTarefa: { fontSize: 18, color: "#333" },
  textoConcluido: { textDecorationLine: "line-through", color: "#999" },
  botaoExcluir: {
    backgroundColor: "#D32F2F",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
