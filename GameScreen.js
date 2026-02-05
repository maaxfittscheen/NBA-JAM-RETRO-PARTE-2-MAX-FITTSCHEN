import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';

export default function GameScreen({ route, navigation }) {
  const { local, visitante } = route.params;

  // Estado para puntos individuales
  const [playerScores, setPlayerScores] = useState({});

  const sumarPuntos = (playerName, puntos) => {
    setPlayerScores(prev => ({
      ...prev,
      [playerName]: (prev[playerName] || 0) + puntos
    }));
  };

  const totalLocal = local.players.reduce((sum, p) => sum + (playerScores[p] || 0), 0);
  const totalVisitante = visitante.players.reduce((sum, p) => sum + (playerScores[p] || 0), 0);

  const finalizarPartido = () => {
    const allPlayers = [
      ...local.players.map(p => ({ name: p, score: playerScores[p] || 0, team: local.name })),
      ...visitante.players.map(p => ({ name: p, score: playerScores[p] || 0, team: visitante.name }))
    ];

    navigation.navigate('Winner', {
      local,
      visitante,
      scoreLocal: totalLocal,
      scoreVisitante: totalVisitante,
      stats: allPlayers
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.matchTitle}>LIVE GAME</Text>
        
        <View style={styles.scoreRow}>
          <View style={styles.teamContainer}>
            <Image source={{ uri: local.logo }} style={styles.matchLogo} />
            <Text style={styles.scoreText}>{totalLocal}</Text>
          </View>
          <Text style={styles.vs}>VS</Text>
          <View style={styles.teamContainer}>
            <Image source={{ uri: visitante.logo }} style={styles.matchLogo} />
            <Text style={styles.scoreText}>{totalVisitante}</Text>
          </View>
        </View>

        <View style={styles.rostersWrapper}>
          {/* LOCAL */}
          <View style={styles.rosterColumn}>
            <Text style={styles.teamNameLabel}>{local.name}</Text>
            {local.players.map((p, i) => (
              <View key={i} style={styles.playerRow}>
                <Text style={styles.pName}>{p.split(' ').pop()}</Text>
                <Text style={styles.pPts}>{playerScores[p] || 0} PTS</Text>
                <View style={styles.btnGroup}>
                  <TouchableOpacity style={styles.btn} onPress={() => sumarPuntos(p, 2)}><Text style={styles.btnT}>+2</Text></TouchableOpacity>
                  <TouchableOpacity style={[styles.btn, styles.btn3]} onPress={() => sumarPuntos(p, 3)}><Text style={styles.btnT}>+3</Text></TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* VISITANTE */}
          <View style={styles.rosterColumn}>
            <Text style={styles.teamNameLabel}>{visitante.name}</Text>
            {visitante.players.map((p, i) => (
              <View key={i} style={styles.playerRow}>
                <Text style={styles.pName}>{p.split(' ').pop()}</Text>
                <Text style={styles.pPts}>{playerScores[p] || 0} PTS</Text>
                <View style={styles.btnGroup}>
                  <TouchableOpacity style={styles.btn} onPress={() => sumarPuntos(p, 2)}><Text style={styles.btnT}>+2</Text></TouchableOpacity>
                  <TouchableOpacity style={[styles.btn, styles.btn3]} onPress={() => sumarPuntos(p, 3)}><Text style={styles.btnT}>+3</Text></TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.finishBtn} onPress={finalizarPartido}>
          <Text style={styles.finishBtnText}>FINISH GAME</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  container: { flex: 1 },
  contentContainer: { alignItems: 'center', paddingVertical: 20 },
  matchTitle: { color: '#fff', fontSize: 28, fontWeight: '900', marginBottom: 20, fontStyle: 'italic' },
  scoreRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  teamContainer: { alignItems: 'center', marginHorizontal: 20 },
  matchLogo: { width: 70, height: 70, resizeMode: 'contain' },
  scoreText: { color: '#fff', fontSize: 50, fontWeight: '900', textShadowColor: '#00f2ff', textShadowRadius: 10 },
  vs: { color: '#ff4444', fontSize: 24, fontWeight: '900' },
  rostersWrapper: { flexDirection: 'row', width: '95%', justifyContent: 'space-between' },
  rosterColumn: { width: '48%' },
  teamNameLabel: { color: '#FFD700', fontWeight: '900', textAlign: 'center', marginBottom: 10, fontSize: 14 },
  playerRow: { backgroundColor: '#1a1a1a', padding: 8, marginBottom: 5, borderLeftWidth: 3, borderLeftColor: '#ff4444' },
  pName: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  pPts: { color: '#00f2ff', fontSize: 10, marginBottom: 5 },
  btnGroup: { flexDirection: 'row', justifyContent: 'space-between' },
  btn: { backgroundColor: '#333', padding: 5, width: '45%', alignItems: 'center' },
  btn3: { borderColor: '#FFD700', borderWidth: 1 },
  btnT: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  finishBtn: { backgroundColor: '#FFD700', padding: 15, width: '85%', marginTop: 20, alignItems: 'center' },
  finishBtnText: { color: '#000', fontWeight: '900', fontSize: 18 }
});