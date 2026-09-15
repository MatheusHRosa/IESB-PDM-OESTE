import React from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function CompromissoList({
  itens,
  onDelete,
  onToggle,
  tituloLista,
  listaVazia,
}) {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Pressable
        style={styles.areaTexto}
        onPress={() => onToggle(item.id)}
        android_ripple={{ color: '#dddddd' }}
      >
        <Text
          style={[
            styles.textoItem,
            item.concluido && styles.textoConcluido,
          ]}
        >
          {item.texto}
        </Text>

        <Text style={styles.data}>
          Criado em: {item.criadoEm}
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.botaoExcluir,
          pressed && styles.botaoPressionado,
        ]}
        onPress={() => onDelete(item.id)}
        android_ripple={{ color: '#cccccc' }}
      >
        <Text style={styles.textoExcluir}>X</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>
            {listaVazia}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },

  areaTexto: {
    flex: 1,
  },

  textoItem: {
    fontSize: 16,
  },

  textoConcluido: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },

  data: {
    fontSize: 11,
    marginTop: 5,
  },

  botaoExcluir: {
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
    marginLeft: 10,
  },

  textoExcluir: {
    fontWeight: 'bold',
  },

  botaoPressionado: {
    opacity: 0.5,
  },

  listaVazia: {
    textAlign: 'center',
    marginTop: 30,
  },
});