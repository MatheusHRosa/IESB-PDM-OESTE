import React from 'react';
import { View, StyleSheet } from 'react-native';

import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

export default function DespesaSaida({ despesas }) {
  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} />

      <DespesaLista despesas={despesas} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});