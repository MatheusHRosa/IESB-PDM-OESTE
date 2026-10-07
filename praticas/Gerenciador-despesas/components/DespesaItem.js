import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function getDataFormatada(data) {
  const dataObj = new Date(data);

  return dataObj.toLocaleDateString('pt-BR');
}

export default function DespesaItem({ despesa }) {
  return (
    <View style={styles.container}>
      <View style={styles.informacoes}>
        <View style={styles.linhaSuperior}>
          <Text style={styles.data}>
            {getDataFormatada(despesa.data)}
          </Text>

          <View style={styles.categoria}>
            <Text style={styles.categoriaTexto}>
              {despesa.categoria}
            </Text>
          </View>
        </View>

        <Text style={styles.descricao}>
          {despesa.descricao}
        </Text>
      </View>

      <Text style={styles.valor}>
        R$ {Number(despesa.valor).toFixed(2).replace('.', ',')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  informacoes: {
    flex: 1,
  },

  linhaSuperior: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  data: {
    fontSize: 13,
    color: '#666',
    marginRight: 8,
  },

  categoria: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  categoriaTexto: {
    fontSize: 12,
    color: '#555',
    fontWeight: 'bold',
  },

  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  valor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});