import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet, Modal, FlatList,
  KeyboardAvoidingView, ScrollView, Platform, Alert, useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../store/expenses-context';
import { CATEGORIES } from '../constants/categories';
import { getTheme } from '../constants/theme';

const todayString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function dateToString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function validate(values) {
  const errors = {};
  if (!values.description.trim() || values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }
  const amount = Number(values.amount);
  if (!values.amount || !Number.isFinite(amount) || amount <= 0) {
    errors.amount = 'Informe um valor maior que zero.';
  }
  if (!values.date || values.date > todayString()) {
    errors.date = 'A data não pode ser futura.';
  }
  if (!values.category) {
    errors.category = 'Escolha uma categoria.';
  }
  return errors;
}

export default function GerenciarDespesa({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const colors = getTheme(useColorScheme());
  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);
  const existingExpense = useMemo(
    () => expenses.find((expense) => String(expense.id) === String(expenseId)),
    [expenses, expenseId]
  );

  const [form, setForm] = useState({
    description: '', amount: '', date: todayString(), category: '',
  });
  const [errors, setErrors] = useState({});
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (existingExpense) {
      setForm({
        description: existingExpense.description ?? '',
        amount: String(existingExpense.amount ?? ''),
        date: existingExpense.date ?? todayString(),
        category: existingExpense.category ?? '',
      });
    }
  }, [existingExpense]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
      headerRight: isEditing ? () => (
        <Pressable onPress={confirmDelete} style={{ padding: 8 }} accessibilityLabel="Excluir despesa">
          <Ionicons name="trash-outline" size={23} color={colors.danger} />
        </Pressable>
      ) : undefined,
    });
  }, [navigation, isEditing, colors.danger, existingExpense]);

  function handleChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleAmountChange(value) {
    if (/^\d*\.?\d{0,2}$/.test(value)) handleChange('amount', value);
  }

  function handleSave() {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const expense = {
      id: isEditing ? existingExpense?.id ?? expenseId : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) updateExpense(expense);
    else addExpense(expense);
    navigation.goBack();
  }

  function confirmDelete() {
    Alert.alert('Excluir despesa?', 'Deseja realmente excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  function fieldStyle(field) {
    return [
      styles.input,
      { backgroundColor: colors.input, borderColor: errors[field] ? colors.danger : colors.border, color: colors.text },
    ];
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={[styles.intro, { color: colors.muted }]}>
          {isEditing ? 'Atualize os dados da despesa.' : 'Preencha os dados para registrar uma despesa.'}
        </Text>

        <Text style={[styles.label, { color: colors.text }]}>Descrição</Text>
        <TextInput
          value={form.description}
          onChangeText={(value) => handleChange('description', value)}
          placeholder="Ex.: Almoço"
          placeholderTextColor={colors.muted}
          style={fieldStyle('description')}
          maxLength={100}
          returnKeyType="next"
        />
        {errors.description && <Text style={[styles.error, { color: colors.danger }]}>{errors.description}</Text>}

        <Text style={[styles.label, { color: colors.text }]}>Valor (R$)</Text>
        <TextInput
          value={form.amount}
          onChangeText={handleAmountChange}
          placeholder="0.00"
          placeholderTextColor={colors.muted}
          style={fieldStyle('amount')}
          keyboardType="decimal-pad"
          returnKeyType="done"
        />
        {errors.amount && <Text style={[styles.error, { color: colors.danger }]}>{errors.amount}</Text>}

        <Text style={[styles.label, { color: colors.text }]}>Data</Text>
        <Pressable onPress={() => setShowDatePicker(true)} style={[fieldStyle('date'), styles.dateButton]}>
          <Text style={{ color: colors.text }}>
            {form.date ? new Date(`${form.date}T12:00:00`).toLocaleDateString('pt-BR') : 'Escolher data'}
          </Text>
          <Ionicons name="calendar-outline" size={20} color={colors.muted} />
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={form.date ? new Date(`${form.date}T12:00:00`) : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              if (Platform.OS !== 'ios') setShowDatePicker(false);
              if (selectedDate) handleChange('date', dateToString(selectedDate));
            }}
          />
        )}
        {Platform.OS === 'ios' && showDatePicker && (
          <Pressable onPress={() => setShowDatePicker(false)} style={[styles.smallButton, { backgroundColor: colors.chip }]}>
            <Text style={{ color: colors.primary, fontWeight: '700' }}>Confirmar data</Text>
          </Pressable>
        )}
        {errors.date && <Text style={[styles.error, { color: colors.danger }]}>{errors.date}</Text>}

        <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
        <Pressable
          onPress={() => setCategoryModalVisible(true)}
          style={[fieldStyle('category'), styles.dateButton]}
        >
          <Text style={{ color: form.category ? colors.text : colors.muted }}>
            {form.category || 'Selecione uma categoria'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={colors.muted} />
        </Pressable>
        {errors.category && <Text style={[styles.error, { color: colors.danger }]}>{errors.category}</Text>}

        <Pressable onPress={handleSave} style={[styles.saveButton, { backgroundColor: colors.primary }]}>
          <Text style={styles.saveText}>{isEditing ? 'Salvar alterações' : 'Salvar despesa'}</Text>
        </Pressable>
      </ScrollView>

      <Modal
        visible={categoryModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
          <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Escolha a categoria</Text>
              <Pressable onPress={() => setCategoryModalVisible(false)} accessibilityLabel="Fechar categorias">
                <Ionicons name="close" size={25} color={colors.text} />
              </Pressable>
            </View>
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    handleChange('category', item);
                    setCategoryModalVisible(false);
                  }}
                  style={[styles.categoryOption, { borderBottomColor: colors.border }]}
                >
                  <Text style={{ color: colors.text, fontSize: 16 }}>{item}</Text>
                  {form.category === item && <Ionicons name="checkmark" size={22} color={colors.primary} />}
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { padding: 18, paddingBottom: 40 },
  intro: { fontSize: 14, marginBottom: 20, lineHeight: 20 },
  label: { fontWeight: '700', marginBottom: 7, marginTop: 13 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 13, paddingVertical: 12, fontSize: 16, minHeight: 48 },
  dateButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  error: { fontSize: 12, marginTop: 5 },
  saveButton: { marginTop: 28, padding: 15, borderRadius: 12, alignItems: 'center' },
  saveText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  modalCard: { maxHeight: '70%', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 18 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: '700' },
  categoryOption: { minHeight: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: StyleSheet.hairlineWidth },
  smallButton: { alignSelf: 'flex-end', padding: 10, borderRadius: 8, marginTop: 8 },
});
