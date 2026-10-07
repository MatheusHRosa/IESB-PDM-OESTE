import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';

import DespesaItem from './DespesaItem';

export default function DespesaLista({ despesas }) {
  if (despesas.length === 0) {
    return (
      <View style={styles.vazia}>
        <Text style={styles.textoVazio}>
          Nenhuma despesa encontrada.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <DespesaItem despesa={item} />
      )}
      contentContainerStyle={styles.lista}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingBottom: 20,
  },

  vazia: {
    padding: 20,
    alignItems: 'center',
  },

  textoVazio: {
    fontSize: 16,
    color: '#666',
  },
});