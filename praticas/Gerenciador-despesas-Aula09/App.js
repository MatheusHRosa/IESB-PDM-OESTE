import React from 'react';
import { Pressable, Text, useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { ExpensesContextProvider } from './src/store/expenses-context';
import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';
import { getTheme } from './src/constants/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Abas() {
  const scheme = useColorScheme();
  const colors = getTheme(scheme);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarIcon: ({ color, size }) => {
          const icon = route.name === 'Todas' ? 'list' : 'time';
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Todas" component={TodasDespesas} options={{ title: 'Todas as despesas' }} />
      <Tab.Screen name="Recentes" component={DespesasRecentes} options={{ title: 'Despesas recentes' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();
  const colors = getTheme(scheme);

  return (
    <ExpensesContextProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.card },
            headerTintColor: colors.text,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="Despesas" component={Abas} options={{ headerShown: false }} />
          <Stack.Screen
            name="GerenciarDespesa"
            component={GerenciarDespesa}
            options={({ navigation }) => ({
              title: 'Nova despesa',
              headerBackTitle: 'Voltar',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}
