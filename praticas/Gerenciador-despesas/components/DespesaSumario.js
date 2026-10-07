import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ despesas }) {
  const somaDespesas = despesas.reduce(
    (acumulador, item) => acumulador + item.valor,
    0
  );

  const ultrapassouLimite = somaDespesas > 200;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Total de Despesas
      </Text>

      <Text
        style={[
          styles.valor,
          ultrapassouLimite && styles.valorAlto,
        ]}
      >
        R$ {somaDespesas.toFixed(2).replace('.', ',')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    alignItems: 'center',
  },

  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  valor: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  valorAlto: {
    color: 'red',
  },
});