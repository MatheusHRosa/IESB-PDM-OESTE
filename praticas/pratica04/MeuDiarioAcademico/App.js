import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

import {
  SafeAreaView  
} from 'react-native-safe-area-context';

import {
  APP_TITLE,
  INPUT_PLACEHOLDER,
  ADD_BUTTON,
  LIST_TITLE,
} from './labels';

const disciplinas = [
  'Desenvolvimento Mobile',
  'Banco de Dados',
  'Engenharia de Software',
];

export default function App() {
  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        {APP_TITLE}
      </Text>

      <View style={styles.inputRow}>

        <TextInput
          style={styles.input}
          placeholder={INPUT_PLACEHOLDER}
        />

        <View style={styles.buttonContainer}>
          <Button
            title={ADD_BUTTON}
            onPress={() => {}}
          />
        </View>

      </View>

      <Text style={styles.listTitle}>
        {LIST_TITLE}
      </Text>

      <View style={styles.list}>
        {disciplinas.map((disciplina, index) => (
          <View
            key={index}
            style={styles.item}
          >
            <Text style={styles.itemText}>
              {disciplina}
            </Text>
          </View>
        ))}
      </View>

    </View>

);
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#222',
  },

  inputRow: {
    flexDirection: 'row',

    // Centraliza input e botão verticalmente.
    alignItems: 'center',

    marginBottom: 30,
  },

  input: {
    // O input ocupa o espaço restante da linha.
    flex: 1,

    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,

    paddingHorizontal: 12,
    paddingVertical: 10,

    backgroundColor: '#fff',

    marginRight: 10,
  },

  buttonContainer: {
    // Demonstração de largura percentual.
    width: '25%',

    // Centraliza o botão dentro dos 25%.
    alignItems: 'center',
  },

  listTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },

  list: {
    // column mantém os itens na vertical.
    flexDirection: 'column',
  },

  item: {
    marginVertical: 5,
    padding: 15,

    backgroundColor: '#fff',

    borderRadius: 8,
  },

  itemText: {
    fontSize: 16,
    color: '#333',
  },

});
