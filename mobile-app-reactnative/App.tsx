import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Streaming de Música</Text>
        <Text style={styles.message}>
          Estrutura inicial do aplicativo. Login, catálogo e player serão implementados pela equipe.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#f8f8fb'},
  container: {flex: 1, justifyContent: 'center', padding: 24},
  title: {fontSize: 24, fontWeight: '700', color: '#172033', marginBottom: 12},
  message: {fontSize: 16, lineHeight: 24, color: '#454b5a'},
});
