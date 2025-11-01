import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen({ navigation }) {
  return (
    <View style={s.container}>
      <Text style={s.h1}>Недвижимость — Главная</Text>
      <View style={{ flexDirection:'row', gap:10 }}>
        <Pressable style={s.btn} onPress={() => navigation.navigate('Каталог')}>
          <Text style={s.btnText}>🔍 В каталог</Text>
        </Pressable>
        <Pressable style={s.btn} onPress={() => navigation.navigate('Избранное')}>
          <Text style={s.btnText}>⭐ Избранное</Text>
        </Pressable>
      </View>
    </View>
  );
}

function CatalogScreen() {
  return (
    <View style={s.container}>
      <Text style={s.h1}>Каталог</Text>
      <Text style={s.p}>Здесь позже появится список объектов с фильтрами.</Text>
    </View>
  );
}

function FavoritesScreen() {
  return (
    <View style={s.container}>
      <Text style={s.h1}>Избранное</Text>
      <Text style={s.p}>Избранных объектов пока нет.</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0b0f19' },
          headerTintColor: '#fff',
          tabBarStyle: { backgroundColor: '#0b0f19' },
          tabBarActiveTintColor: '#60a5fa',
          tabBarInactiveTintColor: '#94a3b8',
        }}
      >
        <Tab.Screen name="Главная" component={HomeScreen} options={{ tabBarIcon: () => <Text>🏠</Text> }} />
        <Tab.Screen name="Каталог" component={CatalogScreen} options={{ tabBarIcon: () => <Text>📋</Text> }} />
        <Tab.Screen name="Избранное" component={FavoritesScreen} options={{ tabBarIcon: () => <Text>⭐</Text> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#0b0f19', padding:16, justifyContent:'center' },
  h1:{ color:'#fff', fontSize:22, fontWeight:'800', marginBottom:12 },
  p:{ color:'#cbd5e1' },
  btn:{ backgroundColor:'#1f2937', borderColor:'#374151', borderWidth:1, paddingVertical:10, paddingHorizontal:14, borderRadius:10 },
  btnText:{ color:'#fff', fontWeight:'700' },
});


