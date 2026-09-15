import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

import {
  tituloApp,
  placeholderCompromisso,
  botaoAdicionar,
  tituloLista,
  listaVazia,
} from './labels';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // CARREGAR os dados quando o aplicativo iniciar
  useEffect(() => {
    const carregarCompromissos = async () => {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);

        if (dados !== null) {
          setCompromissos(JSON.parse(dados));
        }
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível carregar os compromissos salvos.'
        );
      } finally {
        setCarregado(true);
      }
    };

    carregarCompromissos();
  }, []);

  // SALVAR sempre que a lista for alterada
  useEffect(() => {
    if (!carregado) {
      return;
    }

    const salvarCompromissos = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(compromissos)
        );
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível salvar os compromissos.'
        );
      }
    };

    salvarCompromissos();
  }, [compromissos, carregado]);

  const adicionarCompromisso = () => {
    const textoLimpo = texto.trim();

    if (textoLimpo === '') {
      Alert.alert(
        'Atenção',
        'Digite um compromisso antes de adicionar.'
      );
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadoEm: new Date().toLocaleString('pt-BR'),
      concluido: false,
    };

    setCompromissos((listaAtual) => [
      ...listaAtual,
      novoCompromisso,
    ]);

    setTexto('');
  };

  const excluirCompromisso = (id) => {
    setCompromissos((listaAtual) =>
      listaAtual.filter((item) => item.id !== id)
    );
  };

  const alternarConclusao = (id) => {
    setCompromissos((listaAtual) =>
      listaAtual.map((item) =>
        item.id === id
          ? {
              ...item,
              concluido: !item.concluido,
            }
          : item
      )
    );
  };

  const pendentes = compromissos.filter(
    (item) => !item.concluido
  ).length;

  const labels = {
    placeholderCompromisso,
    botaoAdicionar,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
          />

          <View style={styles.headerTexto}>
            <Text style={styles.titulo}>
              {tituloApp}
            </Text>

            <Text style={styles.contador}>
              {pendentes} pendente(s)
            </Text>
          </View>
        </View>

        {/* FORMULÁRIO */}
        <CompromissoInput
          value={texto}
          onChangeText={setTexto}
          onAdd={adicionarCompromisso}
          labels={labels}
        />

        {/* LISTA */}
        <CompromissoList
          itens={compromissos}
          onDelete={excluirCompromisso}
          onToggle={alternarConclusao}
          tituloLista={tituloLista}
          listaVazia={listaVazia}
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  logo: {
    width: 55,
    height: 55,
    marginRight: 12,
    resizeMode: 'contain',
  },

  headerTexto: {
    flex: 1,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  contador: {
    marginTop: 4,
    fontSize: 14,
  },
});