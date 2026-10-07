import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TodasDespesas from './screens/TodasDespesas';
import DespesasRecentes from './screens/DespesasRecentes';
import GerenciarDespesa from './screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();

export default function App() {
  const [despesas, setDespesas] = useState([
    {
      id: '1',
      descricao: 'Supermercado',
      valor: 120.50,
      data: new Date('2026-10-01'),
      categoria: 'Alimentação',
    },
    {
      id: '2',
      descricao: 'Passagem de ônibus',
      valor: 25.00,
      data: new Date('2026-10-02'),
      categoria: 'Transporte',
    },
    {
      id: '3',
      descricao: 'Cinema',
      valor: 40.00,
      data: new Date('2026-10-03'),
      categoria: 'Lazer',
    },
  ]);

  function adicionarDespesa(despesa) {
    setDespesas((despesasAtuais) => [
      ...despesasAtuais,
      {
        ...despesa,
        id: Date.now().toString(),
      },
    ]);
  }

  function editarDespesa(id, despesaAtualizada) {
    setDespesas((despesasAtuais) =>
      despesasAtuais.map((despesa) =>
        despesa.id === id
          ? { ...despesa, ...despesaAtualizada }
          : despesa
      )
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="DespesasRecentes"
          options={{ title: 'Despesas Recentes' }}
        >
          {(props) => (
            <DespesasRecentes
              {...props}
              despesas={despesas}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="TodasDespesas"
          options={{ title: 'Todas as Despesas' }}
        >
          {(props) => (
            <TodasDespesas
              {...props}
              despesas={despesas}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="GerenciarDespesa"
          options={{ title: 'Gerenciar Despesa' }}
        >
          {(props) => (
            <GerenciarDespesa
              {...props}
              despesas={despesas}
              adicionarDespesa={adicionarDespesa}
              editarDespesa={editarDespesa}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}