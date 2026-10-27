import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency } from './DespesaSaida';

export default function DespesaSumario({ count, total, colors }) {
  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View>
        <Text style={[styles.label, { color: colors.muted }]}>Despesas exibidas</Text>
        <Text style={[styles.value, { color: colors.text }]}>{count}</Text>
      </View>
      <View style={styles.totalBox}>
        <Text style={[styles.label, { color: colors.muted }]}>Total</Text>
        <Text style={[styles.total, { color: colors.primary }]}>{formatCurrency(total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16, borderRadius: 14, borderWidth: 1, marginBottom: 12,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  label: { fontSize: 12, marginBottom: 4 },
  value: { fontSize: 20, fontWeight: '700' },
  totalBox: { alignItems: 'flex-end' },
  total: { fontSize: 19, fontWeight: '700' },
});
