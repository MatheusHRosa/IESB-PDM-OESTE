import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { formatCurrency } from './DespesaSaida';

export default function DespesaItem({ expense, onPress, colors }) {
  const dateLabel = new Date(`${expense.date}T12:00:00`).toLocaleDateString('pt-BR');
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.78 : 1,
          ...Platform.select({
            ios: { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
            android: { elevation: 3 },
            default: {},
          }),
        },
      ]}
    >
      <View style={styles.left}>
        <Text style={[styles.description, { color: colors.text }]} numberOfLines={1}>
          {expense.description}
        </Text>
        <Text style={[styles.meta, { color: colors.muted }]}>{expense.category} · {dateLabel}</Text>
      </View>
      <Text style={[styles.amount, { color: colors.primary }]}>{formatCurrency(expense.amount)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12, borderWidth: 1, padding: 14, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  left: { flex: 1, paddingRight: 10 },
  description: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  meta: { fontSize: 12 },
  amount: { fontSize: 15, fontWeight: '700' },
});
