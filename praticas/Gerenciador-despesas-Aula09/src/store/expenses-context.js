import React, {
  createContext, useCallback, useContext, useEffect, useReducer, useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpensesContext = createContext(null);
const STORAGE_KEY = '@expenses';

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return Array.isArray(action.payload) ? [...action.payload] : [];
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          dispatch({ type: 'SET', payload: Array.isArray(parsed) ? parsed : [] });
        }
      } catch (error) {
        console.warn('Não foi possível carregar as despesas salvas.', error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadExpenses();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.warn('Não foi possível salvar as despesas.', error);
      }
    }
    saveExpenses();
  }, [expenses, isLoaded]);

  const addExpense = useCallback((expense) => {
    dispatch({ type: 'ADD', payload: expense });
  }, []);

  const updateExpense = useCallback((expense) => {
    dispatch({ type: 'UPDATE', payload: expense });
  }, []);

  const deleteExpense = useCallback((id) => {
    dispatch({ type: 'DELETE', payload: id });
  }, []);

  const setExpenses = useCallback((items) => {
    dispatch({ type: 'SET', payload: items });
  }, []);

  const value = {
    expenses, addExpense, updateExpense, deleteExpense, setExpenses, isLoaded,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de ExpensesContextProvider.');
  }
  return context;
}
