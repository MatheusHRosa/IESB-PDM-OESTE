import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CATEGORIAS = [
  'Alimentação',
  'Transporte',
  'Lazer',
  'Contas',
];

export default function GerenciarDespesa({
  navigation,
  route,
  adicionarDespesa,
  editarDespesa,
}) {
  const despesaEditada = route.params?.despesa;

  const [descricao, setDescricao] = useState(
    despesaEditada?.descricao || ''
  );

  const [valor, setValor] = useState(
    despesaEditada?.valor
      ? despesaEditada.valor.toFixed(2).replace('.', ',')
      : ''
  );

  const [data, setData] = useState(
    despesaEditada?.data
      ? new Date(despesaEditada.data)
      : new Date()
  );

  const [categoria, setCategoria] = useState(
    despesaEditada?.categoria || ''
  );

  const [mostrarData, setMostrarData] = useState(false);

  function alterarValor(texto) {
    const valorFormatado = texto.replace(',', '.');

    if (/^\d*\.?\d{0,2}$/.test(valorFormatado)) {
      setValor(texto);
    }
  }

  function salvarDespesa() {
    if (!descricao.trim()) {
      Alert.alert('Atenção', 'Digite uma descrição.');
      return;
    }

    if (!valor.trim()) {
      Alert.alert('Atenção', 'Digite o valor da despesa.');
      return;
    }

    if (!categoria) {
      Alert.alert('Atenção', 'Selecione uma categoria.');
      return;
    }

    const valorNumerico = Number(valor.replace(',', '.'));

    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Atenção', 'Digite um valor válido.');
      return;
    }

    const despesa = {
      descricao: descricao.trim(),
      valor: valorNumerico,
      data,
      categoria,
    };

    if (despesaEditada) {
      editarDespesa(despesaEditada.id, despesa);
    } else {
      adicionarDespesa(despesa);
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Supermercado"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Valor</Text>

      <TextInput
        style={styles.input}
        placeholder="0,00"
        value={valor}
        onChangeText={alterarValor}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Data</Text>

      <Pressable
        style={styles.dateButton}
        onPress={() => setMostrarData(true)}
      >
        <Text style={styles.dateButtonText}>
          {data.toLocaleDateString('pt-BR')}
        </Text>
      </Pressable>

      {mostrarData && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={(event, dataSelecionada) => {
            setMostrarData(false);

            if (dataSelecionada) {
              setData(dataSelecionada);
            }
          }}
        />
      )}

      <Text style={styles.label}>Categoria</Text>

      <View style={styles.categorias}>
        {CATEGORIAS.map((item) => (
          <Pressable
            key={item}
            style={[
              styles.categoriaButton,
              categoria === item && styles.categoriaSelecionada,
            ]}
            onPress={() => setCategoria(item)}
          >
            <Text
              style={[
                styles.categoriaText,
                categoria === item && styles.categoriaTextSelecionada,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={styles.salvarButton}
        onPress={salvarDespesa}
      >
        <Text style={styles.salvarText}>Salvar Despesa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },

  dateButtonText: {
    fontSize: 16,
  },

  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  categoriaButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 20,
  },

  categoriaSelecionada: {
    backgroundColor: '#333',
    borderColor: '#333',
  },

  categoriaText: {
    fontSize: 14,
  },

  categoriaTextSelecionada: {
    color: '#fff',
    fontWeight: 'bold',
  },

  salvarButton: {
    marginTop: 25,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  salvarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});