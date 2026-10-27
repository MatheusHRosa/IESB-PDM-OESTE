import React, { useMemo, useLayoutEffect } from 'react';
import { View, Pressable, StyleSheet, useColorScheme, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../store/expenses-context';
import { getTheme } from '../constants/theme';
import DespesaLista from '../components/despesa/DespesaLista';
import DespesaSumario from '../components/despesa/DespesaSumario';

export default function DespesasRecentes({ navigation }) {
  const { expenses, isLoaded } = useExpenses();
  const colors = getTheme(useColorScheme());

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('GerenciarDespesa')} style={{ padding: 8 }}>
          <Ionicons name="add-circle" size={29} color={colors.primary} />
        </Pressable>
      ),
    });
  }, [navigation, colors.primary]);

  const recentExpenses = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - 6);
    start.setHours(0, 0, 0, 0);
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    return expenses.filter((expense) => {
      const date = new Date(`${expense.date}T12:00:00`);
      return date >= start && date <= end;
    });
  }, [expenses]);

  const total = recentExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DespesaLista
        expenses={recentExpenses}
        onSelect={(expense) => navigation.navigate('GerenciarDespesa', { expenseId: expense.id })}
        colors={colors}
        onAdd={() => navigation.navigate('GerenciarDespesa')}
        emptyMessage="Nenhuma despesa nos últimos 7 dias."
        ListHeaderComponent={
          <View>
            <Text style={[styles.info, { color: colors.muted }]}>Despesas dos últimos 7 dias</Text>
            <DespesaSumario count={recentExpenses.length} total={total} colors={colors} />
            {!isLoaded && <Text style={{ color: colors.muted }}>Carregando despesas salvas...</Text>}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  info: { fontSize: 14, marginBottom: 12 },
});
