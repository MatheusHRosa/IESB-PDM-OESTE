import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import DespesaSaida from '../components/DespesaSaida';

export default function DespesasRecentes({ navigation, despesas }) {
  const despesasRecentes = despesas
    .slice()
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 3);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Últimas despesas
      </Text>

      <DespesaSaida despesas={despesasRecentes} />

      <Pressable
        style={styles.botao}
        onPress={() => navigation.navigate('TodasDespesas')}
      >
        <Text style={styles.botaoTexto}>
          Ver todas as despesas
        </Text>
      </Pressable>

      <Pressable
        style={styles.botao}
        onPress={() => navigation.navigate('GerenciarDespesa')}
      >
        <Text style={styles.botaoTexto}>
          + Adicionar despesa
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  botao: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});