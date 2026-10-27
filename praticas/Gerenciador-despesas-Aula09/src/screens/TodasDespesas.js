import React, { useMemo, useLayoutEffect, useState } from 'react';
import {
  View, TextInput, Text, Pressable, StyleSheet, Alert, useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../store/expenses-context';
import { getTheme } from '../constants/theme';
import { CATEGORIES } from '../constants/categories';
import useDebounce from '../hooks/useDebounce';
import DespesaLista from '../components/despesa/DespesaLista';
import DespesaSumario from '../components/despesa/DespesaSumario';

export default function TodasDespesas({ navigation }) {
  const { expenses, deleteExpense, setExpenses, isLoaded } = useExpenses();
  const colors = getTheme(useColorScheme());
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const debouncedSearch = useDebounce(search, 300);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('GerenciarDespesa')} style={{ padding: 8 }}>
          <Ionicons name="add-circle" size={29} color={colors.primary} />
        </Pressable>
      ),
    });
  }, [navigation, colors.primary]);

  const filteredExpenses = useMemo(() => {
    const term = debouncedSearch.trim().toLocaleLowerCase('pt-BR');
    return expenses.filter((expense) => {
      const matchesText = expense.description.toLocaleLowerCase('pt-BR').includes(term);
      const matchesCategory = selectedCategory === 'Todas' || expense.category === selectedCategory;
      return matchesText && matchesCategory;
    });
  }, [expenses, debouncedSearch, selectedCategory]);

  const total = useMemo(
    () => filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0),
    [filteredExpenses]
  );

  function openExpense(expense) {
    navigation.navigate('GerenciarDespesa', { expenseId: expense.id });
  }

  function confirmDeleteAll() {
    Alert.alert('Limpar todas as despesas?', 'Essa ação não pode ser desfeita.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Limpar tudo', style: 'destructive', onPress: () => setExpenses([]) },
    ]);
  }

  const header = (
    <View>
      <View style={[styles.searchBox, { backgroundColor: colors.input, borderColor: colors.border }]}>
        <Ionicons name="search" size={19} color={colors.muted} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por descrição..."
          placeholderTextColor={colors.muted}
          style={[styles.searchInput, { color: colors.text }]}
          accessibilityLabel="Buscar despesas por descrição"
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')} accessibilityLabel="Limpar busca">
            <Ionicons name="close-circle" size={19} color={colors.muted} />
          </Pressable>
        )}
      </View>
      <Text style={[styles.sectionLabel, { color: colors.text }]}>Filtrar por categoria</Text>
      <View style={styles.chips}>
        {['Todas', ...CATEGORIES].map((category) => {
          const active = selectedCategory === category;
          return (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.chip,
                { backgroundColor: active ? colors.chip : colors.card, borderColor: active ? colors.primary : colors.border },
              ]}
            >
              <Text style={{ color: active ? colors.primary : colors.text, fontSize: 12, fontWeight: active ? '700' : '400' }}>
                {category}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <DespesaSumario count={filteredExpenses.length} total={total} colors={colors} />
      <Pressable onPress={confirmDeleteAll} style={[styles.clearButton, { borderColor: colors.danger }]}>
        <Ionicons name="trash-outline" size={17} color={colors.danger} />
        <Text style={{ color: colors.danger, fontWeight: '600' }}>Limpar todas as despesas</Text>
      </Pressable>
      {!isLoaded && <Text style={{ color: colors.muted }}>Carregando despesas salvas...</Text>}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DespesaLista
        expenses={filteredExpenses}
        onSelect={openExpense}
        colors={colors}
        ListHeaderComponent={header}
        onAdd={() => navigation.navigate('GerenciarDespesa')}
        emptyMessage={expenses.length === 0 ? 'Você ainda não tem despesas.' : 'Nenhum resultado encontrado.'}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Adicionar despesa"
        onPress={() => navigation.navigate('GerenciarDespesa')}
        style={[styles.fab, { backgroundColor: colors.primary }]}
      >
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBox: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  searchInput: { flex: 1, paddingVertical: 12, paddingHorizontal: 9, fontSize: 15 },
  sectionLabel: { fontWeight: '700', marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 16 },
  chip: { paddingVertical: 7, paddingHorizontal: 11, borderRadius: 20, borderWidth: 1 },
  clearButton: { flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', padding: 11, borderRadius: 10, borderWidth: 1, marginBottom: 14 },
  fab: { position: 'absolute', right: 20, bottom: 22, width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center', elevation: 5 },
});
