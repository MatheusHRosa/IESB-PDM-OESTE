import React from 'react';
import { FlatList, View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';

export default function DespesaLista({
  expenses, onSelect, colors, ListHeaderComponent, onAdd,
  emptyMessage = 'Nenhuma despesa encontrada.',
}) {
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 2 : 1;

  return (
    <FlatList
      key={numColumns}
      data={expenses}
      keyExtractor={(item) => String(item.id)}
      numColumns={numColumns}
      columnWrapperStyle={numColumns === 2 ? styles.row : undefined}
      contentContainerStyle={styles.content}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <View style={[styles.empty, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="receipt-outline" size={42} color={colors.muted} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>{emptyMessage}</Text>
          <Text style={[styles.emptyText, { color: colors.muted }]}>
            Toque no botão + para adicionar uma despesa.
          </Text>
          {onAdd ? (
            <Pressable onPress={onAdd} style={[styles.emptyButton, { backgroundColor: colors.primary }]}>
              <Text style={styles.emptyButtonText}>Adicionar despesa</Text>
            </Pressable>
          ) : null}
        </View>
      }
      renderItem={({ item }) => (
        <View style={numColumns === 2 ? styles.columnItem : undefined}>
          <DespesaItem expense={item} onPress={() => onSelect(item)} colors={colors} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 30, flexGrow: 1 },
  row: { gap: 12 },
  columnItem: { flex: 1 },
  empty: { borderWidth: 1, borderRadius: 16, padding: 24, alignItems: 'center', marginTop: 12 },
  emptyTitle: { fontSize: 17, fontWeight: '700', marginTop: 12, textAlign: 'center' },
  emptyText: { fontSize: 13, marginTop: 7, textAlign: 'center', lineHeight: 19 },
  emptyButton: { paddingHorizontal: 16, paddingVertical: 11, borderRadius: 10, marginTop: 16 },
  emptyButtonText: { color: '#FFFFFF', fontWeight: '700' },
});
