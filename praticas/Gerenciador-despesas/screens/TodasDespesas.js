import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import DespesaSaida from '../components/DespesaSaida';

const CATEGORIAS = [
  'Todas',
  'Alimentação',
  'Transporte',
  'Lazer',
  'Contas',
];

export default function TodasDespesas({ navigation, despesas }) {
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState('Todas');

  function filtrarDespesas() {
    if (categoriaSelecionada === 'Todas') {
      return despesas;
    }

    return despesas.filter(
      (despesa) => despesa.categoria === categoriaSelecionada
    );
  }

  const despesasFiltradas = filtrarDespesas();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Filtrar por categoria
      </Text>

      <View style={styles.filtros}>
        {CATEGORIAS.map((categoria) => (
          <Pressable
            key={categoria}
            style={[
              styles.filtro,
              categoriaSelecionada === categoria &&
                styles.filtroSelecionado,
            ]}
            onPress={() => setCategoriaSelecionada(categoria)}
          >
            <Text
              style={[
                styles.filtroTexto,
                categoriaSelecionada === categoria &&
                  styles.filtroTextoSelecionado,
              ]}
            >
              {categoria}
            </Text>
          </Pressable>
        ))}
      </View>

      <DespesaSaida despesas={despesasFiltradas} />

      <Pressable
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('GerenciarDespesa')}
      >
        <Text style={styles.botaoTexto}>
          + Adicionar Despesa
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },

  filtro: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 20,
  },

  filtroSelecionado: {
    backgroundColor: '#333',
    borderColor: '#333',
  },

  filtroTexto: {
    fontSize: 13,
  },

  filtroTextoSelecionado: {
    color: '#fff',
    fontWeight: 'bold',
  },

  botaoAdicionar: {
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