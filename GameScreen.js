import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';

export default function GameScreen({ route, navigation }) {
  const { local, visitante } = route.params;
  const [scores, setScores] = useState({});

  const addPts = (name, p) => setScores(prev => ({ ...prev, [name]: (prev[name] || 0) + p }));

  const totalL = local.players.reduce((s, p) => s + (scores[p] || 0), 0);
  const totalV = visitante.players.reduce((s, p) => s + (scores[p] || 0), 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>LIVE SCORE</Text>
        <View style={styles.header}>
          <View style={styles.tBox}>
            <View style={styles.whiteCirc}><Image source={{ uri: local.logo }} style={styles.l} /></View>
            <Text style={styles.sText}>{totalL}</Text>
          </View>
          <Text style={styles.vs}>VS</Text>
          <View style={styles.tBox}>
            <View style={styles.whiteCirc}><Image source={{ uri: visitante.logo }} style={styles.l} /></View>
            <Text style={styles.sText}>{totalV}</Text>
          </View>
        </View>

        <View style={styles.lists}>
          {[local, visitante].map((t, idx) => (
            <View key={idx} style={styles.col}>
              <Text style={styles.tName}>{t.name.toUpperCase()}</Text>
              {t.players.map((p, i) => (
                <View key={i} style={styles.pRow}>
                  <Text style={styles.pN}>{p.split(' ').pop()}</Text>
                  <Text style={styles.pP}>{scores[p] || 0} PTS</Text>
                  <View style={styles.btns}>
                    <TouchableOpacity style={styles.b} onPress={() => addPts(p, 2)}><Text style={styles.bT}>+2</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.b, styles.b3]} onPress={() => addPts(p, 3)}><Text style={styles.bT}>+3</Text></TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.fBtn} onPress={() => navigation.navigate('Winner', {
          local, visitante, scoreLocal: totalL, scoreVisitante: totalV,
          stats: [...local.players.map(p => ({name: p, score: scores[p] || 0, team: local.name})),
                  ...visitante.players.map(p => ({name: p, score: scores[p] || 0, team: visitante.name}))]
        })}>
          <Text style={styles.fBtnT}>FINISH GAME</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  content: { alignItems: 'center', paddingVertical: 20 },
  title: { color: '#fff', fontSize: 24, fontWeight: '900', fontStyle: 'italic', marginBottom: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  tBox: { alignItems: 'center', marginHorizontal: 20 },
  whiteCirc: { backgroundColor: '#FFF', width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FFD700' },
  l: { width: 55, height: 55, resizeMode: 'contain' },
  sText: { color: '#fff', fontSize: 45, fontWeight: '900', marginTop: 10 },
  vs: { color: '#ff4444', fontSize: 22, fontWeight: '900' },
  lists: { flexDirection: 'row', width: '95%', justifyContent: 'space-between' },
  col: { width: '48%' },
  tName: { color: '#FFD700', textAlign: 'center', fontWeight: '900', marginBottom: 10 },
  pRow: { backgroundColor: '#111', padding: 8, marginBottom: 5, borderLeftWidth: 3, borderLeftColor: '#ff4444' },
  pN: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  pP: { color: '#00f2ff', fontSize: 11 },
  btns: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  b: { backgroundColor: '#333', padding: 5, width: '45%', alignItems: 'center' },
  b3: { borderColor: '#FFD700', borderWidth: 1 },
  bT: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  fBtn: { backgroundColor: '#FFD700', padding: 15, width: '85%', marginTop: 20, alignItems: 'center' },
  fBtnT: { color: '#000', fontWeight: '900', fontSize: 18 }
});