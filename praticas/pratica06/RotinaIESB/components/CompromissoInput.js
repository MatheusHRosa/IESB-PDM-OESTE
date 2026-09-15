import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function CompromissoInput({
  value,
  onChangeText,
  onAdd,
  labels,
}) {
  return (
    <View style={styles.formulario}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={labels.placeholderCompromisso}
      />

      <Pressable
        style={({ pressed }) => [
          styles.botao,
          pressed && styles.botaoPressionado,
        ]}
        android_ripple={{ color: '#cccccc' }}
        onPress={onAdd}
      >
        <Text style={styles.textoBotao}>
          {labels.botaoAdicionar}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  formulario: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
  },

  botao: {
    width: '28%',
    backgroundColor: '#eeeeee',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  botaoPressionado: {
    opacity: 0.6,
  },

  textoBotao: {
    fontWeight: 'bold',
  },
});